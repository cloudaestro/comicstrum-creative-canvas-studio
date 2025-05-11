
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { generateComicPanel } from "@/services/falAI";
import { Loader2 } from "lucide-react";

interface PanelContent {
  title: string;
  script: string;
  dialog: string[];
  imagePrompt: string;
  imageUrl?: string;
}

const HistoricalComicGenerator: React.FC = () => {
  const [panels, setPanels] = useState<PanelContent[]>([]);
  const [currentPanel, setCurrentPanel] = useState<PanelContent>({
    title: "",
    script: "",
    dialog: ["", ""],
    imagePrompt: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const { toast } = useToast();

  const handlePanelContentChange = (
    field: keyof PanelContent,
    value: string | string[]
  ) => {
    setCurrentPanel({
      ...currentPanel,
      [field]: value,
    });
  };

  const handleDialogChange = (index: number, value: string) => {
    const updatedDialog = [...currentPanel.dialog];
    updatedDialog[index] = value;
    handlePanelContentChange("dialog", updatedDialog);
  };

  const addDialog = () => {
    if (currentPanel.dialog.length < 5) {
      handlePanelContentChange("dialog", [...currentPanel.dialog, ""]);
    }
  };

  const removeDialog = (index: number) => {
    if (currentPanel.dialog.length > 1) {
      const updatedDialog = [...currentPanel.dialog];
      updatedDialog.splice(index, 1);
      handlePanelContentChange("dialog", updatedDialog);
    }
  };

  const generateImage = async () => {
    if (!currentPanel.imagePrompt.trim()) {
      toast({
        title: "Image Prompt Required",
        description: "Please provide a detailed image prompt before generating.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Format the prompt with historical context
      const enhancedPrompt = `Historical Ottoman Empire scene. ${currentPanel.imagePrompt}. Detailed, historically accurate, comic book style.`;
      
      const result = await generateComicPanel({
        prompt: enhancedPrompt,
      });

      setCurrentPanel({
        ...currentPanel,
        imageUrl: result.imageUrl,
      });

      toast({
        title: "Image Generated Successfully",
        description: "Your historical comic panel has been created.",
      });
    } catch (error) {
      toast({
        title: "Image Generation Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const savePanel = () => {
    if (!currentPanel.title.trim() || !currentPanel.script.trim() || !currentPanel.imagePrompt.trim()) {
      toast({
        title: "Incomplete Panel",
        description: "Please fill in the title, script, and image prompt fields.",
        variant: "destructive",
      });
      return;
    }

    if (panels.length < 10) {
      setPanels([...panels, currentPanel]);
      setCurrentPanel({
        title: "",
        script: "",
        dialog: ["", ""],
        imagePrompt: "",
      });
      toast({
        title: "Panel Added",
        description: "Your historical comic panel has been added to the story.",
      });
      setActiveTab("content");
    } else {
      toast({
        title: "Panel Limit Reached",
        description: "You can have a maximum of 10 panels in a comic.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <h2 className="text-lg font-bold mb-3 text-comic-gray">Ottoman Empire Historical Comic Generator</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="panel">Panel Preview</TabsTrigger>
          <TabsTrigger value="story">Story Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-comic-gray mb-1">Panel Title</label>
              <Input 
                placeholder="e.g., The Conquest of Constantinople, 1453"
                value={currentPanel.title}
                onChange={(e) => handlePanelContentChange("title", e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-comic-gray mb-1">Script</label>
              <Textarea 
                placeholder="Brief scene-setting paragraph describing this historical moment..."
                value={currentPanel.script}
                onChange={(e) => handlePanelContentChange("script", e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-comic-gray">Dialog</label>
                <Button 
                  onClick={addDialog} 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPanel.dialog.length >= 5}
                >
                  Add Dialog
                </Button>
              </div>
              
              <div className="space-y-2">
                {currentPanel.dialog.map((dialog, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input 
                      placeholder={`CHARACTER NAME: "Quote" (15 words or less)`}
                      value={dialog}
                      onChange={(e) => handleDialogChange(index, e.target.value)}
                    />
                    {currentPanel.dialog.length > 1 && (
                      <Button 
                        onClick={() => removeDialog(index)} 
                        variant="outline" 
                        size="sm"
                        className="flex-shrink-0"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-comic-gray mb-1">Image Prompt</label>
              <Textarea 
                placeholder="Detailed visual description for AI image generation..."
                value={currentPanel.imagePrompt}
                onChange={(e) => handlePanelContentChange("imagePrompt", e.target.value)}
                rows={4}
              />
              <p className="text-xs text-comic-gray mt-1">
                Include setting, main figures, atmosphere, and any symbolic elements.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={generateImage} 
                disabled={isGenerating || !currentPanel.imagePrompt.trim()}
                className="w-1/2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : "Generate Image"}
              </Button>
              
              <Button 
                onClick={savePanel}
                variant="secondary"
                className="w-1/2"
                disabled={
                  !currentPanel.title.trim() || 
                  !currentPanel.script.trim() || 
                  !currentPanel.imagePrompt.trim()
                }
              >
                Save Panel
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="panel">
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <h3 className="font-bold text-lg">{currentPanel.title || "Untitled Panel"}</h3>
            
            <div>
              <h4 className="font-medium text-sm text-comic-gray">Script:</h4>
              <p className="bg-white p-2 rounded border">
                {currentPanel.script || "No script yet..."}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-comic-gray">Dialog:</h4>
              <div className="bg-white p-2 rounded border">
                {currentPanel.dialog.filter(d => d.trim()).length > 0 ? (
                  <ul className="list-disc pl-5">
                    {currentPanel.dialog.map((dialog, idx) => (
                      dialog.trim() ? <li key={idx}>{dialog}</li> : null
                    ))}
                  </ul>
                ) : (
                  <p className="text-comic-gray italic">No dialog yet...</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-comic-gray">Generated Image:</h4>
              <div className="bg-white border rounded overflow-hidden w-full aspect-square">
                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin mb-2 text-comic-purple" />
                    <p className="text-sm text-comic-gray">Generating historical scene...</p>
                  </div>
                ) : currentPanel.imageUrl ? (
                  <img 
                    src={currentPanel.imageUrl} 
                    alt={currentPanel.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-comic-gray">No image generated yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="story">
          <div className="space-y-4">
            <h3 className="font-bold">Story Overview</h3>
            
            {panels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {panels.map((panel, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border">
                    <h4 className="font-bold text-sm mb-2">
                      Panel {idx + 1}: {panel.title}
                    </h4>
                    
                    {panel.imageUrl ? (
                      <div className="aspect-square mb-2 overflow-hidden rounded border">
                        <img 
                          src={panel.imageUrl} 
                          alt={panel.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <Skeleton className="w-full aspect-square mb-2 rounded" />
                    )}
                    
                    <p className="text-xs line-clamp-3 text-comic-gray mb-1">{panel.script}</p>
                    
                    {panel.dialog.filter(d => d.trim()).length > 0 && (
                      <p className="text-xs text-comic-purple">
                        {panel.dialog.filter(d => d.trim()).length} dialog lines
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-comic-gray">No panels created yet. Start by filling in the content tab.</p>
              </div>
            )}
            
            {panels.length > 0 && (
              <div className="flex justify-end">
                <Button>Export Comic</Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoricalComicGenerator;
