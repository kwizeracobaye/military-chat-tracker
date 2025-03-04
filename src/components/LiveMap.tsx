
import React, { useState, useEffect } from 'react';
import { Compass, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';

type UnitMarker = {
  id: string;
  type: 'friendly' | 'hostile' | 'unknown';
  lat: number;
  lng: number;
  name: string;
  status: 'active' | 'idle' | 'moving' | 'alert';
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
  
  return (
    <div className="relative overflow-hidden w-full h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] rounded-xl border bg-card subtle-ring">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576769267415-9242c9cd42dd?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-70"
           style={{ transform: `scale(${1 + (zoom - 50) / 100})` }}>
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
              onClick={() => setSelectedUnit(unit)}
            />
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

import { X } from 'lucide-react';
