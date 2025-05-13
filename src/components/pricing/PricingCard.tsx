
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PricingFeature = {
  name: string;
  included: boolean;
};

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PricingFeature[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  isPopular?: boolean;
};

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  isLoading: boolean;
  onSelectPlan: () => void;
}

export default function PricingCard({ plan, isAnnual, isLoading, onSelectPlan }: PricingCardProps) {
  const price = isAnnual ? plan.price.annual : plan.price.monthly;
  const priceText = price === 0 ? "Free" : `$${price}`;
  const interval = isAnnual ? "/year" : "/month";

  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-200 hover:shadow-lg", 
      plan.isPopular ? "border-primary shadow-md scale-[1.02]" : ""
    )}>
      <CardHeader className="pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-muted-foreground">{plan.description}</p>
          </div>
          {plan.isPopular && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Popular
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <span className="text-4xl font-bold">{priceText}</span>
          {price > 0 && (
            <span className="text-muted-foreground ml-1">{interval}</span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature.included ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <XCircle className="h-5 w-5 text-muted-foreground" />
              )}
              <span className={cn(
                feature.included ? "" : "text-muted-foreground"
              )}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={plan.buttonVariant}
          className={cn(
            "w-full transition-all",
            plan.isPopular ? "bg-primary hover:bg-primary/90" : ""
          )}
          onClick={onSelectPlan}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
