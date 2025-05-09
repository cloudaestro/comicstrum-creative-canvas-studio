
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Create Stunning{" "}
              <span className="text-comic-purple">Comics</span> With{" "}
              <span className="text-comic-pink">AI</span>
            </h1>
            <p className="text-lg md:text-xl text-comic-gray mb-8 max-w-lg mx-auto md:mx-0">
              Turn your ideas into professional comics with our AI-powered
              creation platform. No artistic skills required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                className="bg-comic-purple hover:bg-opacity-90 text-lg px-8 py-6"
                asChild
              >
                <Link to="/workspace">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-comic-purple text-comic-purple hover:bg-comic-purple/10 text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 relative">
            <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="comic-panel p-1">
                <div className="aspect-[4/3] w-full max-w-lg mx-auto bg-comic-lightGray rounded overflow-hidden relative">
                  {/* Comic Preview Image */}
                  <img
                    src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&q=80&w=1770"
                    alt="Comic preview"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Comic Panels Overlay */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 opacity-10">
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                  </div>
                  
                  {/* Speech Bubble */}
                  <div className="absolute top-4 right-8 bg-white p-3 rounded-lg transform -rotate-3 shadow-md">
                    <p className="font-heading text-sm">Created with ComicStrum!</p>
                    <div className="absolute bottom-0 right-4 w-4 h-4 bg-white transform rotate-45 translate-y-2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-comic-blue rounded-full opacity-20 animate-float"></div>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-comic-pink rounded-full opacity-20 animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
