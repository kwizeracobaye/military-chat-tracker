
import React from 'react';
import { Target, Navigation } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ObjectivePoint } from '@/types/map';

interface MapActionControlsProps {
  isAddingObjective: boolean;
  toggleAddingObjective: () => void;
  onGoToMyLocation: () => void;
}

export const MapActionControls: React.FC<MapActionControlsProps> = ({
  isAddingObjective,
  toggleAddingObjective,
  onGoToMyLocation,
}) => {
  return (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      <Button 
        variant={isAddingObjective ? "default" : "secondary"} 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md"
        onClick={toggleAddingObjective}
      >
        <Target size={16} className={isAddingObjective ? "text-primary-foreground" : ""} />
      </Button>
      <Button 
        variant="secondary" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md"
        onClick={onGoToMyLocation}
      >
        <Navigation size={16} />
      </Button>
    </div>
  );
};
