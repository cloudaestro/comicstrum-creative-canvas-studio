
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md py-12">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="text-muted-foreground">
          Thank you for your subscription. Your account has been successfully upgraded.
        </p>
        <div className="flex flex-col gap-4 pt-4">
          <Button onClick={() => navigate("/workspace")}>
            Go to Workspace
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
