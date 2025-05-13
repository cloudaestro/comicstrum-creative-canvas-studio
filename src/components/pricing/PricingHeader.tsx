
import React from "react";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export default function PricingHeader({ title, subtitle }: PricingHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
