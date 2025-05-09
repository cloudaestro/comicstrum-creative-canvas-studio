
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-comic-purple to-comic-pink">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Create Your Comic?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Join thousands of creators who are bringing their stories to life
            with ComicStrum's AI-powered comic creation platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-white text-comic-purple hover:bg-white/90 text-lg px-8 py-6 shadow-lg"
              asChild
            >
              <Link to="/workspace">Start Creating Now</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
