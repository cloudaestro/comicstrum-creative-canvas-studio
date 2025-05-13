
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show success toast
    toast({
      title: "Payment successful!",
      description: "Thank you for your subscription.",
      variant: "default",
    });
    
    // Simulate checking payment status
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="container max-w-lg py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto my-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-2">
          <p>Thank you for subscribing. Your payment has been processed successfully.</p>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your subscription is now active. You can start using all premium features immediately.
            </p>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => navigate("/workspace")}
            className="gap-2"
          >
            Go to workspace
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
