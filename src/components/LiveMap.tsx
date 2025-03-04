
import React, { useState, useEffect } from 'react';
import { Compass, Maximize2, ZoomIn, ZoomOut, X, Target, MapPin, Navigation } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type UnitMarker = {
  id: string;
  type: 'friendly' | 'hostile' | 'unknown';
  lat: number;
  lng: number;
  name: string;
  status: 'active' | 'idle' | 'moving' | 'alert';
};

type ObjectivePoint = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  type: 'primary' | 'secondary' | 'extraction';
};

const generateRandomUnits = (count: number): UnitMarker[] => {
  const types: Array<UnitMarker['type']> = ['friendly', 'hostile', 'unknown'];
  const statuses: Array<UnitMarker['status']> = ['active', 'idle', 'moving', 'alert'];
  
  return Array.from({ length: count }).map((_, index) => ({
    id: `unit-${index}`,
    type: types[Math.floor(Math.random() * types.length)],
    lat: 30 + Math.random() * 10,
    lng: -5 + Math.random() * 10,
    name: `Unit ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export function LiveMap() {
  const [zoom, setZoom] = useState(70);
  const [units, setUnits] = useState<UnitMarker[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<UnitMarker | null>(null);
  const [rotating, setRotating] = useState(false);
  const [objectivePoints, setObjectivePoints] = useState<ObjectivePoint[]>([]);
  const [isAddingObjective, setIsAddingObjective] = useState(false);
  const [newObjectiveType, setNewObjectiveType] = useState<ObjectivePoint['type']>('primary');
  const { toast } = useToast();
  
  useEffect(() => {
    setUnits(generateRandomUnits(12));
    
    const interval = setInterval(() => {
      setUnits(prev => 
        prev.map(unit => ({
          ...unit,
          lat: unit.lat + (Math.random() - 0.5) * 0.05,
          lng: unit.lng + (Math.random() - 0.5) * 0.05,
          status: Math.random() > 0.9 
            ? (['active', 'idle', 'moving', 'alert'] as const)[Math.floor(Math.random() * 4)] 
            : unit.status
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 100));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 10));
  
  const handleAddObjective = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingObjective) return;
    
    // Calculate position based on click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Convert to lat/lng (simplified)
    const width = rect.width;
    const height = rect.height;
    const lat = 35 - ((y / height) * 10);
    const lng = -10 + ((x / width) * 20);
    
    const newObjective: ObjectivePoint = {
      id: `objective-${Date.now()}`,
      lat,
      lng,
      name: `Objective ${objectivePoints.length + 1}`,
      type: newObjectiveType
    };
    
    setObjectivePoints(prev => [...prev, newObjective]);
    setIsAddingObjective(false);
    
    toast({
      title: "Objective Added",
      description: `${newObjective.name} has been placed on the map`,
      duration: 3000,
    });
  };
  
  const handleGoToMyLocation = () => {
    // In a real app, this would use the browser's geolocation API
    toast({
      title: "Location Found",
      description: "Map centered on your current position",
      duration: 3000,
    });
  };
  
  return (
    <div className="relative overflow-hidden w-full h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] rounded-xl border bg-card subtle-ring">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576769267415-9242c9cd42dd?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-70"
        style={{ transform: `scale(${1 + (zoom - 50) / 100})` }}
        onClick={handleAddObjective}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/30"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "w-[60%] h-[60%] border-2 border-primary/20 rounded-full relative",
          "before:content-[''] before:absolute before:inset-0 before:border-2 before:border-dashed before:border-primary/10 before:rounded-full",
          rotating && "before:animate-rotate-radar"
        )}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping-slow"></div>
          </div>
          
          {units.map(unit => (
            <button
              key={unit.id}
              className={cn(
                "absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer",
                "hover:scale-150 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                unit.type === 'friendly' && "bg-secondary",
                unit.type === 'hostile' && "bg-destructive",
                unit.type === 'unknown' && "bg-accent-foreground",
                unit.status === 'alert' && "animate-pulse-subtle"
              )}
              style={{
                top: `${(unit.lat - 30) * 5 + 50}%`,
                left: `${(unit.lng + 5) * 5 + 50}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUnit(unit);
              }}
            />
          ))}
          
          {objectivePoints.map(objective => (
            <div
              key={objective.id}
              className={cn(
                "absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                objective.type === 'primary' && "text-yellow-500",
                objective.type === 'secondary' && "text-blue-500",
                objective.type === 'extraction' && "text-green-500"
              )}
              style={{
                top: `${(objective.lat - 30) * 5 + 50}%`,
                left: `${(objective.lng + 5) * 5 + 50}%`,
              }}
            >
              <Target className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" onClick={() => setRotating(!rotating)}>
          <Compass size={16} className={rotating ? "animate-rotate-radar" : ""} />
        </Button>
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md">
          <Maximize2 size={16} />
        </Button>
      </div>
      
      {/* Right Side Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" onClick={handleZoomOut}>
          <ZoomOut size={16} />
        </Button>
        <div className="w-24 h-8 px-3 flex items-center bg-background/70 backdrop-blur-sm border rounded-full shadow-md">
          <Slider value={[zoom]} onValueChange={(val) => setZoom(val[0])} max={100} step={1} className="w-full" />
        </div>
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" onClick={handleZoomIn}>
          <ZoomIn size={16} />
        </Button>
      </div>
      
      {/* Additional Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button 
          variant={isAddingObjective ? "default" : "secondary"} 
          size="icon" 
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md"
          onClick={() => setIsAddingObjective(!isAddingObjective)}
        >
          <Target size={16} className={isAddingObjective ? "text-primary-foreground" : ""} />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md"
          onClick={handleGoToMyLocation}
        >
          <Navigation size={16} />
        </Button>
      </div>
      
      {/* Objective Type Selection */}
      {isAddingObjective && (
        <div className="absolute top-4 right-14 z-10">
          <div className="flex flex-col gap-2 p-2 bg-background/70 backdrop-blur-sm border rounded-md shadow-md">
            <Button
              variant={newObjectiveType === 'primary' ? "default" : "ghost"}
              size="sm"
              className="justify-start"
              onClick={() => setNewObjectiveType('primary')}
            >
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              Primary
            </Button>
            <Button
              variant={newObjectiveType === 'secondary' ? "default" : "ghost"}
              size="sm"
              className="justify-start"
              onClick={() => setNewObjectiveType('secondary')}
            >
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              Secondary
            </Button>
            <Button
              variant={newObjectiveType === 'extraction' ? "default" : "ghost"}
              size="sm"
              className="justify-start"
              onClick={() => setNewObjectiveType('extraction')}
            >
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Extraction
            </Button>
          </div>
        </div>
      )}
      
      {/* Unit Info */}
      {selectedUnit && (
        <div className="absolute bottom-4 left-4 z-10 max-w-xs animate-slide-in glass-panel rounded-lg p-3 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-sm">{selectedUnit.name}</h4>
              <div className="flex items-center mt-1 space-x-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs",
                  selectedUnit.type === 'friendly' && "bg-secondary/20 text-secondary-foreground",
                  selectedUnit.type === 'hostile' && "bg-destructive/20 text-destructive-foreground",
                  selectedUnit.type === 'unknown' && "bg-accent-foreground/20 text-accent-foreground"
                )}>
                  {selectedUnit.type}
                </span>
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs",
                  selectedUnit.status === 'active' && "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
                  selectedUnit.status === 'idle' && "bg-blue-500/20 text-blue-700 dark:text-blue-400",
                  selectedUnit.status === 'moving' && "bg-amber-500/20 text-amber-700 dark:text-amber-400",
                  selectedUnit.status === 'alert' && "bg-red-500/20 text-red-700 dark:text-red-400"
                )}>
                  {selectedUnit.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Position: {selectedUnit.lat.toFixed(4)}, {selectedUnit.lng.toFixed(4)}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1" onClick={() => setSelectedUnit(null)}>
              <X size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
