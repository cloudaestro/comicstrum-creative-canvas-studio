
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2022-11-15",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create authenticated Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Verify auth token and get user
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("Invalid authorization");
    }

    // Get request data
    const { priceId, mode = "subscription" } = await req.json();
    
    // Map price IDs to actual Stripe price IDs
    // In a real implementation, these would be stored in a database
    const priceMap: Record<string, string> = {
      "pro_monthly": "price_1OKnXXXXXXXXXXXXXXXXXXXX", // Replace with actual Stripe price IDs
      "pro_annual": "price_1OKnYYYYYYYYYYYYYYYYYYYY",   // Replace with actual Stripe price IDs
      "enterprise_monthly": "price_1OKnZZZZZZZZZZZZZZZZZZZZ", // Replace with actual Stripe price IDs
      "enterprise_annual": "price_1OKnaAAAAAAAAAAAAAAAAA",    // Replace with actual Stripe price IDs
    };
    
    // Get the actual Stripe price ID
    const stripePriceId = priceMap[priceId];
    if (!stripePriceId) {
      throw new Error("Invalid price ID");
    }

    // Check if user already has a Stripe customer ID
    let { data: customers } = await supabase
      .from("stripe_customers")
      .select("customer_id")
      .eq("user_id", user.id)
      .limit(1);
    
    let customerId: string | undefined = customers?.[0]?.customer_id;
    
    // If no customer record exists, create one in Stripe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_id: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Save the new customer ID in Supabase
      await supabase
        .from("stripe_customers")
        .insert({
          user_id: user.id,
          customer_id: customerId,
        });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
    });

    // Return the session URL
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
