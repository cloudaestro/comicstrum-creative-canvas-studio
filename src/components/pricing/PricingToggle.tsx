
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface PricingToggleProps {
  isAnnual: boolean;
  setIsAnnual: (value: boolean) => void;
  annualDiscount?: string;
}

export default function PricingToggle({ isAnnual, setIsAnnual, annualDiscount }: PricingToggleProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center gap-4">
        <span className={`text-sm font-medium ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}>
          Monthly
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-primary"
        />
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isAnnual ? "text-primary" : "text-muted-foreground"}`}>
            Annual
          </span>
          {annualDiscount && isAnnual && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              {annualDiscount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
