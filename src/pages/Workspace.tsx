
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComicWorkspace from "@/components/workspace/ComicWorkspace";
import Advertisement from "@/components/ads/Advertisement";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const Workspace: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-comic-purple" />
            <p className="mt-2 text-gray-600">Loading workspace...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Show not logged in message
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertDescription>
              You need to be logged in to access the workspace. Please sign in or create an account.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-4 px-4">
          <div className="mb-6">
            <Advertisement />
          </div>
          <ComicWorkspace />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Workspace;
