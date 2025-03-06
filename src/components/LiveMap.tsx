
import React, { useState, useEffect } from 'react';
import { Compass, Maximize2, ZoomIn, ZoomOut, X, Target, Navigation, Flag, Shield, Info, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type UnitMarker = {
  id: string;
  type: 'syndicate' | 'instructor' | 'unknown';
  lat: number;
  lng: number;
  name: string;
  status: 'active' | 'idle' | 'moving' | 'alert';
  members?: number;
  completedCheckpoints?: number;
  totalCheckpoints?: number;
};

type ObjectivePoint = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  type: 'primary' | 'secondary' | 'extraction';
  description?: string;
};

const generateRandomUnits = (count: number): UnitMarker[] => {
  const types: Array<UnitMarker['type']> = ['syndicate', 'instructor', 'unknown'];
  const statuses: Array<UnitMarker['status']> = ['active', 'idle', 'moving', 'alert'];
  
  return Array.from({ length: count }).map((_, index) => ({
    id: `unit-${index}`,
    type: types[Math.floor(Math.random() * types.length)],
    lat: 30 + Math.random() * 10,
    lng: -5 + Math.random() * 10,
    name: `Syndicate ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 5) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    members: Math.floor(Math.random() * 8) + 4,
    completedCheckpoints: Math.floor(Math.random() * 5),
    totalCheckpoints: 5,
  }));
};

const defaultObjectives: ObjectivePoint[] = [
  {
    id: 'obj-1',
    lat: 34.2,
    lng: -3.5,
    name: 'Checkpoint Alpha',
    type: 'primary',
    description: 'Main rally point for all syndicates'
  },
  {
    id: 'obj-2',
    lat: 32.8,
    lng: -2.1,
    name: 'Extraction Point',
    type: 'extraction',
    description: 'Emergency evacuation point'
  },
  {
    id: 'obj-3',
    lat: 35.5,
    lng: -7.3,
    name: 'Navigation Point Beta',
    type: 'secondary',
    description: 'Optional checkpoint for advanced navigation training'
  }
];

export function LiveMap() {
  const [zoom, setZoom] = useState(70);
  const [units, setUnits] = useState<UnitMarker[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<UnitMarker | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<ObjectivePoint | null>(null);
  const [rotating, setRotating] = useState(false);
  const [objectivePoints, setObjectivePoints] = useState<ObjectivePoint[]>(defaultObjectives);
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
            : unit.status,
          completedCheckpoints: unit.status === 'moving' && Math.random() > 0.9 && unit.completedCheckpoints && unit.completedCheckpoints < 5
            ? unit.completedCheckpoints + 1
            : unit.completedCheckpoints
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
      name: `Checkpoint ${objectivePoints.length + 1}`,
      type: newObjectiveType,
      description: `New ${newObjectiveType} navigation point`
    };
    
    setObjectivePoints(prev => [...prev, newObjective]);
    setIsAddingObjective(false);
    
    toast({
      title: "Checkpoint Added",
      description: `${newObjective.name} has been placed on the map`,
      duration: 3000,
    });
  };
  
  const handleGoToMyLocation = () => {
    // In a real app, this would use the browser's geolocation API
    toast({
      title: "Location Found",
      description: "Map centered on instructor's current position",
      duration: 3000,
    });
  };

  const getUnitTypeLabel = (type: UnitMarker['type']) => {
    switch(type) {
      case 'syndicate': return 'Cadet Syndicate';
      case 'instructor': return 'Field Instructor';
      case 'unknown': return 'Unidentified Unit';
      default: return 'Unknown';
    }
  }

  const getStatusLabel = (status: UnitMarker['status']) => {
    switch(status) {
      case 'active': return 'On Navigation Exercise';
      case 'idle': return 'At Checkpoint';
      case 'moving': return 'Moving Between Points';
      case 'alert': return 'Requires Assistance';
      default: return 'Unknown';
    }
  }

  const getObjectiveTypeLabel = (type: ObjectivePoint['type']) => {
    switch(type) {
      case 'primary': return 'Primary Checkpoint';
      case 'secondary': return 'Secondary Checkpoint';
      case 'extraction': return 'Extraction Point';
      default: return 'Unknown';
    }
  }
  
  return (
    <div className="relative overflow-hidden w-full h-full bg-card rounded-xl border subtle-ring">
      {/* Map Background */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576769267415-9242c9cd42dd?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-70"
        style={{ transform: `scale(${1 + (zoom - 50) / 100})` }}
        onClick={handleAddObjective}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/30"></div>
      </div>
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-20 p-2 bg-background/80 backdrop-blur-sm rounded-md border shadow-md">
        <h4 className="text-xs font-semibold mb-1">Map Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span>Cadet Syndicate</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Field Instructor</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-accent-foreground"></div>
            <span>Unidentified</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 text-yellow-500"><Flag size={12} /></div>
            <span>Primary Checkpoint</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 text-blue-500"><Flag size={12} /></div>
            <span>Secondary Checkpoint</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 text-green-500"><Flag size={12} /></div>
            <span>Extraction Point</span>
          </div>
        </div>
      </div>
      
      {/* Radar Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "w-[60%] h-[60%] border-2 border-primary/20 rounded-full relative",
          "before:content-[''] before:absolute before:inset-0 before:border-2 before:border-dashed before:border-primary/10 before:rounded-full",
          rotating && "before:animate-rotate-radar"
        )}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping-slow"></div>
          </div>
          
          {/* Syndicate Units */}
          {units.map(unit => (
            <TooltipProvider key={unit.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer",
                      "hover:scale-150 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                      unit.type === 'syndicate' && "bg-secondary",
                      unit.type === 'instructor' && "bg-blue-500",
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
                      setSelectedObjective(null);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs font-medium">{unit.name}</p>
                  <p className="text-xs">{getUnitTypeLabel(unit.type)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          
          {/* Objective Points */}
          {objectivePoints.map(objective => (
            <TooltipProvider key={objective.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedObjective(objective);
                      setSelectedUnit(null);
                    }}
                  >
                    <Flag className="w-full h-full" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs font-medium">{objective.name}</p>
                  <p className="text-xs">{getObjectiveTypeLabel(objective.type)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-20 left-4 z-10 space-y-2">
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
          <Flag size={16} className={isAddingObjective ? "text-primary-foreground" : ""} />
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
              <Flag className="w-3 h-3 text-yellow-500 mr-2" />
              Primary
            </Button>
            <Button
              variant={newObjectiveType === 'secondary' ? "default" : "ghost"}
              size="sm"
              className="justify-start"
              onClick={() => setNewObjectiveType('secondary')}
            >
              <Flag className="w-3 h-3 text-blue-500 mr-2" />
              Secondary
            </Button>
            <Button
              variant={newObjectiveType === 'extraction' ? "default" : "ghost"}
              size="sm"
              className="justify-start"
              onClick={() => setNewObjectiveType('extraction')}
            >
              <Flag className="w-3 h-3 text-green-500 mr-2" />
              Extraction
            </Button>
          </div>
        </div>
      )}
      
      {/* Unit Info Panel */}
      {selectedUnit && (
        <div className="absolute bottom-4 left-4 z-10 w-60 animate-slide-in bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-sm">{selectedUnit.name}</h4>
              <div className="flex items-center mt-1 gap-2">
                <Badge variant="outline" className={cn(
                  selectedUnit.type === 'syndicate' && "bg-secondary/20 text-secondary-foreground",
                  selectedUnit.type === 'instructor' && "bg-blue-500/20 text-blue-700",
                  selectedUnit.type === 'unknown' && "bg-accent-foreground/20 text-accent-foreground"
                )}>
                  {getUnitTypeLabel(selectedUnit.type)}
                </Badge>
                <Badge variant="outline" className={cn(
                  selectedUnit.status === 'active' && "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
                  selectedUnit.status === 'idle' && "bg-blue-500/20 text-blue-700 dark:text-blue-400",
                  selectedUnit.status === 'moving' && "bg-amber-500/20 text-amber-700 dark:text-amber-400",
                  selectedUnit.status === 'alert' && "bg-red-500/20 text-red-700 dark:text-red-400"
                )}>
                  {getStatusLabel(selectedUnit.status)}
                </Badge>
              </div>
              
              {selectedUnit.type === 'syndicate' && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Members:</span>
                    <span className="font-medium">{selectedUnit.members}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Checkpoints:</span>
                    <span className="font-medium">{selectedUnit.completedCheckpoints} of {selectedUnit.totalCheckpoints}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span className="font-medium">{selectedUnit.lat.toFixed(4)}, {selectedUnit.lng.toFixed(4)}</span>
                  </div>
                </div>
              )}
              
              {selectedUnit.status === 'alert' && (
                <div className="mt-2 flex items-center gap-1 text-xs text-destructive">
                  <AlertTriangle size={12} />
                  <span>Requires immediate assistance</span>
                </div>
              )}
              
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="w-full text-xs h-7">Contact</Button>
                <Button size="sm" className="w-full text-xs h-7">Track</Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1" onClick={() => setSelectedUnit(null)}>
              <X size={14} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Objective Info Panel */}
      {selectedObjective && (
        <div className="absolute bottom-4 left-4 z-10 w-60 animate-slide-in bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-sm">{selectedObjective.name}</h4>
              <Badge variant="outline" className={cn(
                "mt-1",
                selectedObjective.type === 'primary' && "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
                selectedObjective.type === 'secondary' && "bg-blue-500/20 text-blue-700 dark:text-blue-400",
                selectedObjective.type === 'extraction' && "bg-green-500/20 text-green-700 dark:text-green-400"
              )}>
                {getObjectiveTypeLabel(selectedObjective.type)}
              </Badge>
              
              <p className="mt-2 text-xs text-muted-foreground">{selectedObjective.description}</p>
              
              <div className="mt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="font-medium">{selectedObjective.lat.toFixed(4)}, {selectedObjective.lng.toFixed(4)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="font-medium">1.2 km</span>
                </div>
              </div>
              
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="w-full text-xs h-7">Details</Button>
                <Button size="sm" className="w-full text-xs h-7">Navigate</Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1" onClick={() => setSelectedObjective(null)}>
              <X size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
