
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComicPanel {
  id: string;
  image: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface ComicPreviewProps {
  panels: ComicPanel[];
  onRemovePanel: (id: string) => void;
}

const ComicPreview: React.FC<ComicPreviewProps> = ({
  panels,
  onRemovePanel,
}) => {
  if (panels.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-5 h-full flex flex-col items-center justify-center">
        <div className="text-center py-16 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-comic-gray/30 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <h3 className="text-xl font-bold text-comic-gray mb-2">
            No Panels Yet
          </h3>
          <p className="text-comic-gray mb-6">
            Generate comic panels using the AI prompt on the left.
            Your created panels will appear here.
          </p>
          <div className="flex justify-center">
            <Button className="comic-button-secondary">
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 min-h-[500px]">
      <h2 className="text-lg font-bold mb-3 text-comic-gray">Comic Preview</h2>
      <div className="relative border-2 border-dashed border-comic-lightGray rounded-lg p-4 min-h-[400px] bg-gray-50">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="absolute comic-panel"
            style={{
              left: `${panel.position.x}%`,
              top: `${panel.position.y}%`,
              width: `${panel.size.width}%`,
              height: `${panel.size.height}%`,
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={panel.image}
                alt="Comic panel"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors"
                onClick={() => onRemovePanel(panel.id)}
              >
                <X className="h-4 w-4 text-comic-gray" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicPreview;
