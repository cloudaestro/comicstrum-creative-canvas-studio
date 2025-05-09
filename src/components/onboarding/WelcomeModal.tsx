
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "../ui/AnimatedLogo";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to ComicStrum!",
      description:
        "The AI-powered comic creation platform that brings your stories to life. Let's walk through how to get started.",
      image: (
        <div className="flex justify-center py-6">
          <AnimatedLogo className="w-24 h-24" />
        </div>
      ),
    },
    {
      title: "Step 1: Create with AI",
      description:
        "Enter text prompts in the AI panel to generate comic scenes. Be as descriptive as you want about characters, settings, and actions.",
      image: (
        <div className="rounded-lg overflow-hidden bg-gray-100 p-4 mb-4">
          <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-white">
            <p className="text-center text-gray-500">
              AI Prompt Interface Preview
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Manage Panels",
      description:
        "Arrange your comics using our intuitive panel management system. Drag, resize, and organize to create the perfect layout.",
      image: (
        <div className="rounded-lg overflow-hidden bg-gray-100 p-4 mb-4">
          <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-white">
            <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
              <div className="bg-comic-lightGray rounded"></div>
              <div className="bg-comic-lightGray rounded"></div>
              <div className="bg-comic-lightGray rounded col-span-2"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Style Your Comic",
      description:
        "Choose from Manga, Western, or Children's book styles to match your story's aesthetic. Each style has unique layouts and visual elements.",
      image: (
        <div className="rounded-lg overflow-hidden bg-gray-100 p-4 mb-4 flex justify-center">
          <div className="flex space-x-4">
            <div className="h-36 w-24 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <span className="text-xs font-medium">Manga</span>
            </div>
            <div className="h-36 w-24 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <span className="text-xs font-medium">Western</span>
            </div>
            <div className="h-36 w-24 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <span className="text-xs font-medium">Children's</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const currentContent = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {currentContent.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {currentContent.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">{currentContent.image}</div>

        {/* Step Indicator */}
        <div className="flex justify-center space-x-2 py-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? "bg-comic-purple" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <DialogFooter className="flex sm:flex-row justify-between items-center">
          <div>
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSkip}>
                Skip Tour
              </Button>
            )}
          </div>
          <Button 
            onClick={handleNextStep}
            className="bg-comic-purple hover:bg-opacity-90"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
