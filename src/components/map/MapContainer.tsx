
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface MapContainerProps {
  height: string;
  isLoading: boolean;
  mapRef: React.MutableRefObject<L.Map | null>;
  mapContainerRef: React.RefObject<HTMLDivElement>;
}

const MapContainer = ({ height, isLoading, mapRef, mapContainerRef }: MapContainerProps) => {
  return (
    <div 
      ref={mapContainerRef} 
      style={{ height, width: '100%' }} 
      className="rounded-lg border shadow-lg overflow-hidden relative z-0"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default MapContainer;
