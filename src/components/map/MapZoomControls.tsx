
import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MapZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSliderChange: (value: number[]) => void;
}

export const MapZoomControls: React.FC<MapZoomControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onSliderChange,
}) => {
  // Convert slider value to appropriate zoom level (1-20)
  const sliderToZoom = (value: number) => {
    return Math.round(1 + (value / 100) * 19);
  };
  
  // Convert zoom level to slider value (0-100)
  const zoomToSlider = (zoom: number) => {
    return Math.round(((zoom - 1) / 19) * 100);
  };

  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
      <Button 
        variant="secondary" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" 
        onClick={onZoomOut}
      >
        <ZoomOut size={16} />
      </Button>
      <div className="w-24 h-8 px-3 flex items-center bg-background/70 backdrop-blur-sm border rounded-full shadow-md">
        <Slider 
          value={[zoomToSlider(zoom)]} 
          onValueChange={(val) => onSliderChange([sliderToZoom(val[0])])} 
          max={100} 
          step={1} 
          className="w-full" 
        />
      </div>
      <Button 
        variant="secondary" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" 
        onClick={onZoomIn}
      >
        <ZoomIn size={16} />
      </Button>
    </div>
  );
};
