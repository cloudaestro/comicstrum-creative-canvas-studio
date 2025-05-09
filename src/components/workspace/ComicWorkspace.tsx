
import React, { useState, useEffect } from "react";
import AIPromptPanel from "./AIPromptPanel";
import ComicPreview from "./ComicPreview";
import PanelManager from "./PanelManager";
import WelcomeModal from "../onboarding/WelcomeModal";
import { useToast } from "@/components/ui/use-toast";

interface ComicPanel {
  id: string;
  image: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const ComicWorkspace: React.FC = () => {
  const [panels, setPanels] = useState<ComicPanel[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const { toast } = useToast();

  const sampleImages = [
    "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29taWN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29taWN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29taWN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNhcnRvb258ZW58MHx8MHx8fDA%3D",
  ];

  // Check for saved panels in local storage
  useEffect(() => {
    const savedPanels = localStorage.getItem("comicPanels");
    const welcomeSeen = localStorage.getItem("welcomeSeen");
    
    if (savedPanels) {
      try {
        setPanels(JSON.parse(savedPanels));
      } catch (e) {
        console.error("Error loading saved panels:", e);
      }
    }
    
    if (welcomeSeen === "true") {
      setShowWelcome(false);
    }
  }, []);

  // Save panels to local storage when they change
  useEffect(() => {
    if (panels.length > 0) {
      localStorage.setItem("comicPanels", JSON.stringify(panels));
    }
  }, [panels]);

  const handleGenerate = (prompt: string) => {
    // In a real app, this would call an AI service
    // For now, we'll use sample images
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    
    const newPanel: ComicPanel = {
      id: `panel-${Date.now()}`,
      image: randomImage,
      position: {
        x: Math.random() * 50, // Random position within the first half of the container
        y: Math.random() * 50,
      },
      size: {
        width: 30 + Math.random() * 20, // Random size between 30% and 50%
        height: 30 + Math.random() * 20,
      },
    };
    
    setPanels([...panels, newPanel]);
    
    toast({
      title: "Panel Created",
      description: `Created panel based on your prompt: "${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}"`,
    });
  };

  const handleRemovePanel = (id: string) => {
    setPanels(panels.filter((panel) => panel.id !== id));
    
    toast({
      title: "Panel Removed",
      description: "The panel has been removed from your comic.",
    });
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("welcomeSeen", "true");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Comic Creator Workspace</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AIPromptPanel onGenerate={handleGenerate} />
          <PanelManager />
        </div>
        
        <div className="lg:col-span-2">
          <ComicPreview panels={panels} onRemovePanel={handleRemovePanel} />
        </div>
      </div>
      
      <WelcomeModal isOpen={showWelcome} onClose={handleCloseWelcome} />
    </div>
  );
};

export default ComicWorkspace;
