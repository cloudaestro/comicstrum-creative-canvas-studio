
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ComicStrum</h1>
            <p className="text-lg text-comic-gray max-w-2xl mx-auto mb-8">
              An AI-powered platform revolutionizing how comics are created, making professional comic creation accessible to everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-comic-gray mb-4">
                  ComicStrum was founded with a simple yet powerful mission: to democratize comic creation. We believe that everyone has stories to tell, and we're providing the tools to tell them visually.
                </p>
                <p className="text-comic-gray mb-6">
                  By combining cutting-edge AI technology with intuitive design tools, we're making it possible for creators of all skill levels to bring their visions to life without needing years of artistic training.
                </p>
                <Button 
                  className="bg-comic-purple hover:bg-opacity-90"
                  asChild
                >
                  <Link to="/workspace">Start Creating</Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29taWN8ZW58MHx8MHx8fDA%3D" 
                    alt="Comic creation" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-comic-purple text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Describe Your Scene</h3>
                <p className="text-comic-gray">
                  Enter a text prompt describing what you want in your comic panel. Be as detailed or simple as you like.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-comic-blue text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Generation</h3>
                <p className="text-comic-gray">
                  Our AI analyzes your description and generates a comic panel matching your specifications, style preferences, and artistic direction.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-comic-pink text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Arrange Your Comic</h3>
                <p className="text-comic-gray">
                  Organize your generated panels into a complete comic. Adjust layouts, add text, and finalize your creation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-comic-purple text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already bringing their stories to life with ComicStrum.
            </p>
            <Button 
              className="bg-white text-comic-purple hover:bg-white/90"
              size="lg"
              asChild
            >
              <Link to="/workspace">Get Started for Free</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
