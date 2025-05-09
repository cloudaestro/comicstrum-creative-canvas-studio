
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PanelTemplate {
  id: string;
  name: string;
  description: string;
  layout: string;
}

const PanelManager: React.FC = () => {
  const templates: PanelTemplate[] = [
    {
      id: "3-panel",
      name: "3-Panel",
      description: "Classic three panel horizontal layout",
      layout: "grid-cols-3",
    },
    {
      id: "4-panel",
      name: "4-Panel",
      description: "2x2 grid layout",
      layout: "grid-cols-2 grid-rows-2",
    },
    {
      id: "manga",
      name: "Manga",
      description: "Vertical reading manga style",
      layout: "manga-layout",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <h2 className="text-lg font-bold mb-3 text-comic-gray">Panel Manager</h2>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          <p className="text-sm text-comic-gray mb-2">
            Choose a template to start with:
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border rounded-md p-3 hover:border-comic-purple hover:bg-purple-50 cursor-pointer transition-colors"
              >
                <div className="h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  {/* Template preview based on layout */}
                  {template.layout === "grid-cols-3" && (
                    <div className="w-full h-full grid grid-cols-3 gap-1 p-2">
                      <div className="bg-comic-lightGray rounded"></div>
                      <div className="bg-comic-lightGray rounded"></div>
                      <div className="bg-comic-lightGray rounded"></div>
                    </div>
                  )}
                  {template.layout === "grid-cols-2 grid-rows-2" && (
                    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-2">
                      <div className="bg-comic-lightGray rounded"></div>
                      <div className="bg-comic-lightGray rounded"></div>
                      <div className="bg-comic-lightGray rounded"></div>
                      <div className="bg-comic-lightGray rounded"></div>
                    </div>
                  )}
                  {template.layout === "manga-layout" && (
                    <div className="w-full h-full grid grid-cols-1 gap-1 p-2">
                      <div className="bg-comic-lightGray rounded h-1/2"></div>
                      <div className="bg-comic-lightGray rounded h-1/4"></div>
                      <div className="bg-comic-lightGray rounded h-1/4"></div>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm">{template.name}</h3>
                <p className="text-xs text-comic-gray mt-1">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="layouts" className="space-y-4">
          <p className="text-sm text-comic-gray mb-4">
            Adjust your comic layout:
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="comic-label">Comic Style</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Manga
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Western
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Children's
                </Button>
              </div>
            </div>
            
            <div>
              <label className="comic-label">Panel Arrangement</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Horizontal
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Vertical
                </Button>
              </div>
            </div>
            
            <div>
              <label className="comic-label">Panel Spacing</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Tight
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Medium
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Wide
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PanelManager;
