
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComicWorkspace from "@/components/workspace/ComicWorkspace";
import Advertisement from "@/components/ads/Advertisement";
import { useAuth } from "@/contexts/AuthContext";

const Workspace: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {user && (
          <div className="container mx-auto py-4 px-4">
            <div className="mb-6">
              <Advertisement />
            </div>
            <ComicWorkspace />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Workspace;
