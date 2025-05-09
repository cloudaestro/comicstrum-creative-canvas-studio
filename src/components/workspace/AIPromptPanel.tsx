
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface AIPromptPanelProps {
  onGenerate: (prompt: string) => void;
}

const AIPromptPanel: React.FC<AIPromptPanelProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const maxCharCount = 500;
  const { toast } = useToast();

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    if (newPrompt.length <= maxCharCount) {
      setPrompt(newPrompt);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a description for your comic panel.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate AI generation with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            onGenerate(prompt);
            toast({
              title: "Panel Generated!",
              description: "Your comic panel has been created successfully.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const charCount = prompt.length;
  const charCountPercentage = (charCount / maxCharCount) * 100;
  const isCharCountWarning = charCount > maxCharCount * 0.8;

  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <h2 className="text-lg font-bold mb-3 text-comic-gray">
        AI Comic Generator
      </h2>
      <p className="text-sm text-comic-gray mb-4">
        Describe your comic panel in detail. Include characters, actions,
        settings, and style.
      </p>

      <div className="mb-4 relative">
        <Textarea
          placeholder="Example: A young superhero with lightning powers faces off against a giant robot in a futuristic city. Manga style with dramatic lighting."
          value={prompt}
          onChange={handlePromptChange}
          rows={5}
          className="resize-none comic-input"
          disabled={isGenerating}
        />
        <div
          className={`text-xs mt-1 text-right ${
            isCharCountWarning ? "text-amber-500" : "text-comic-gray"
          }`}
        >
          {charCount}/{maxCharCount}
        </div>
      </div>

      {isGenerating && (
        <div className="mb-4 space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-comic-gray text-center">
            Generating your comic panel...
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="comic-button-primary"
        >
          {isGenerating ? "Generating..." : "Generate Panel"}
        </Button>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Manga Style
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Western Style
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Children's Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIPromptPanel;
