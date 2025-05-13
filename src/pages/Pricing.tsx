
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseClient } from "@/integrations/supabase/client";
import PricingCard from "@/components/pricing/PricingCard";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingToggle from "@/components/pricing/PricingToggle";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for personal projects",
    price: { monthly: 0, annual: 0 },
    features: [
      { name: "3 Comics per day", included: true },
      { name: "Basic art styles", included: true },
      { name: "Community support", included: true },
      { name: "Export as PNG", included: true },
      { name: "Priority support", included: false },
      { name: "Advanced art styles", included: false },
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    isPopular: false
  },
  {
    id: "pro",
    name: "Pro",
    description: "Everything you need for professional comics",
    price: { monthly: 19, annual: 190 },
    features: [
      { name: "Unlimited comics", included: true },
      { name: "Advanced art styles", included: true },
      { name: "Priority support", included: true },
      { name: "Export as SVG/PDF", included: true },
      { name: "Comic templates", included: true },
      { name: "Custom character creation", included: false },
    ],
    buttonText: "Subscribe Now",
    buttonVariant: "default" as const,
    isPopular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Advanced features for professional creators",
    price: { monthly: 49, annual: 490 },
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Custom character creation", included: true },
      { name: "Dedicated support", included: true },
      { name: "API access", included: true },
      { name: "White labeling", included: true },
      { name: "Custom integration", included: true },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "default" as const,
    isPopular: false
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const supabase = useSupabaseClient();

  const handleSubscription = async (planId: string) => {
    // Don't process payment for free tier
    if (planId === "free") {
      toast({
        title: "Free plan selected",
        description: "You can now create up to 3 comics per day!",
        variant: "default",
      });
      navigate("/workspace");
      return;
    }

    if (!user) {
      toast({
        title: "Login required",
        description: "Please login or create an account to subscribe",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setLoading(planId);

    try {
      // Enterprise plan leads to contact page
      if (planId === "enterprise") {
        navigate("/about");
        toast({
          title: "Contact request received",
          description: "Our team will reach out to you soon!",
          variant: "default",
        });
        setLoading(null);
        return;
      }

      // Call Stripe checkout edge function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: isAnnual ? `${planId}_annual` : `${planId}_monthly`,
          mode: "subscription",
        },
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  return (
    <div className="container max-w-7xl py-10 space-y-8">
      <PricingHeader
        title="Simple, transparent pricing"
        subtitle="Choose the perfect plan for your comic creation needs"
      />
      
      <PricingToggle 
        isAnnual={isAnnual} 
        setIsAnnual={setIsAnnual} 
        annualDiscount="Save up to 17%"
      />
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-8">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            isLoading={loading === plan.id}
            onSelectPlan={() => handleSubscription(plan.id)}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>All prices are in USD. By subscribing, you agree to our terms of service and privacy policy.</p>
      </div>
    </div>
  );
}
