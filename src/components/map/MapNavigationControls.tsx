
import React from 'react';
import { Compass, Maximize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const MapNavigationControls: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 z-10 space-y-2">
      <Button 
        variant="secondary" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md"
      >
        <Compass size={16} />
      </Button>
      <Button 
        variant="secondary" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md"
      >
        <Maximize2 size={16} />
      </Button>
    </div>
  );
};
