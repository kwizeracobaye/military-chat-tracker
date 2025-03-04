
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { 
  Compass, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Target, 
  Navigation,
  AlertTriangle 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Map container styles
const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem'
};

// Default center location
const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503
};

type UnitMarker = {
  id: string;
  type: 'friendly' | 'hostile' | 'unknown';
  position: google.maps.LatLngLiteral;
  name: string;
  status: 'active' | 'idle' | 'moving' | 'alert';
};

type ObjectivePoint = {
  id: string;
  position: google.maps.LatLngLiteral;
  name: string;
  type: 'primary' | 'secondary' | 'extraction';
};

// Generate some random units for demo purposes
const generateRandomUnits = (count: number, center: google.maps.LatLngLiteral): UnitMarker[] => {
  const types: Array<UnitMarker['type']> = ['friendly', 'hostile', 'unknown'];
  const statuses: Array<UnitMarker['status']> = ['active', 'idle', 'moving', 'alert'];
  
  return Array.from({ length: count }).map((_, index) => ({
    id: `unit-${index}`,
    type: types[Math.floor(Math.random() * types.length)],
    position: {
      lat: center.lat + (Math.random() - 0.5) * 0.2,
      lng: center.lng + (Math.random() - 0.5) * 0.2
    },
    name: `Unit ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// Get marker icon based on unit type
const getUnitIcon = (type: UnitMarker['type'], status: UnitMarker['status']) => {
  const baseUrl = '/';
  
  // SVG icons as data URLs
  const friendlyIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#22c55e" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="6" fill="#22c55e" />
    </svg>
  `)}`;
  
  const hostileIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L4 11l2.5 8H12h5.5L20 11 12 2z" fill="#ef4444" fill-opacity="0.2" />
      <circle cx="12" cy="14" r="4" fill="#ef4444" />
    </svg>
  `)}`;
  
  const unknownIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#9ca3af" fill-opacity="0.2" />
      <path d="M9 12h6" stroke="#9ca3af" stroke-width="2" />
    </svg>
  `)}`;
  
  // Return icon based on type
  switch (type) {
    case 'friendly':
      return { url: friendlyIcon, scaledSize: new google.maps.Size(30, 30) };
    case 'hostile':
      return { url: hostileIcon, scaledSize: new google.maps.Size(30, 30) };
    case 'unknown':
    default:
      return { url: unknownIcon, scaledSize: new google.maps.Size(30, 30) };
  }
};

// Get objective icon based on type
const getObjectiveIcon = (type: ObjectivePoint['type']) => {
  // SVG icons as data URLs
  const primaryIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#eab308" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="3" fill="#eab308" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#eab308" />
    </svg>
  `)}`;
  
  const secondaryIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="3" fill="#3b82f6" />
      <path d="M12 2v4M12 18v4" stroke="#3b82f6" />
    </svg>
  `)}`;
  
  const extractionIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#22c55e" fill-opacity="0.2" />
      <path d="M12 7l-5 5h10l-5-5z" fill="#22c55e" />
      <path d="M12 17v-5" stroke="#22c55e" />
    </svg>
  `)}`;
  
  // Return icon based on type
  switch (type) {
    case 'primary':
      return { url: primaryIcon, scaledSize: new google.maps.Size(36, 36) };
    case 'secondary':
      return { url: secondaryIcon, scaledSize: new google.maps.Size(36, 36) };
    case 'extraction':
      return { url: extractionIcon, scaledSize: new google.maps.Size(36, 36) };
    default:
      return null;
  }
};

export function GoogleMapComponent() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState(defaultCenter);
  const [units, setUnits] = useState<UnitMarker[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<UnitMarker | null>(null);
  const [objectivePoints, setObjectivePoints] = useState<ObjectivePoint[]>([]);
  const [isAddingObjective, setIsAddingObjective] = useState(false);
  const [newObjectiveType, setNewObjectiveType] = useState<ObjectivePoint['type']>('primary');
  const { toast } = useToast();
  
  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBG6uRQf8wRQXJ1VNLhkotdaZaA0lQECn8", // This is a placeholder, replace with your actual API key
    libraries: ["places"],
  });
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
    // Apply custom map styles
    map.setOptions({
      styles: [
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{ "visibility": "off" }]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{ "color": "#f9f9f9" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#c9d1d9" }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    
    // Generate random units around the center
    setUnits(generateRandomUnits(12, center));
  }, [center]);
  
  // Update units positions periodically to simulate movement
  useEffect(() => {
    if (!units.length) return;
    
    const interval = setInterval(() => {
      setUnits(prev => 
        prev.map(unit => ({
          ...unit,
          position: {
            lat: unit.position.lat + (Math.random() - 0.5) * 0.001,
            lng: unit.position.lng + (Math.random() - 0.5) * 0.001
          },
          status: Math.random() > 0.9 
            ? (['active', 'idle', 'moving', 'alert'] as const)[Math.floor(Math.random() * 4)] 
            : unit.status
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [units]);
  
  const handleZoomIn = () => {
    if (!mapRef.current) return;
    const currentZoom = mapRef.current.getZoom() || zoom;
    const newZoom = currentZoom + 1;
    mapRef.current.setZoom(newZoom);
    setZoom(newZoom);
  };
  
  const handleZoomOut = () => {
    if (!mapRef.current) return;
    const currentZoom = mapRef.current.getZoom() || zoom;
    const newZoom = Math.max(currentZoom - 1, 1);
    mapRef.current.setZoom(newZoom);
    setZoom(newZoom);
  };
  
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!isAddingObjective || !e.latLng) return;
    
    const position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    
    const newObjective: ObjectivePoint = {
      id: `objective-${Date.now()}`,
      position,
      name: `Objective ${objectivePoints.length + 1}`,
      type: newObjectiveType
    };
    
    setObjectivePoints(prev => [...prev, newObjective]);
    setIsAddingObjective(false);
    
    toast({
      title: "Objective Added",
      description: `${newObjective.name} has been placed on the map at position ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`,
      duration: 3000,
    });
  };
  
  const handleGoToMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (mapRef.current) {
            mapRef.current.panTo(pos);
            mapRef.current.setZoom(15);
            setZoom(15);
          }
          
          toast({
            title: "Location Found",
            description: "Map centered on your current position",
            duration: 3000,
          });
        },
        () => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location",
            duration: 3000,
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        duration: 3000,
      });
    }
  };
  
  // Handle map zoom level changes from slider
  const handleSliderChange = (value: number[]) => {
    const newZoom = value[0];
    setZoom(newZoom);
    if (mapRef.current) {
      mapRef.current.setZoom(newZoom);
    }
  };
  
  // Convert slider value to appropriate zoom level (1-20)
  const sliderToZoom = (value: number) => {
    return Math.round(1 + (value / 100) * 19);
  };
  
  // Convert zoom level to slider value (0-100)
  const zoomToSlider = (zoom: number) => {
    return Math.round(((zoom - 1) / 19) * 100);
  };
  
  if (loadError) {
    return (
      <div className="w-full h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] flex items-center justify-center bg-card subtle-ring rounded-xl border">
        <div className="text-center p-6">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Maps</h3>
          <p className="text-muted-foreground">
            There was a problem loading Google Maps. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className="w-full h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] flex items-center justify-center bg-card subtle-ring rounded-xl border">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading maps...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative overflow-hidden w-full h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] rounded-xl border bg-card subtle-ring">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
        }}
      >
        {/* Unit Markers */}
        {units.map((unit) => (
          <Marker
            key={unit.id}
            position={unit.position}
            icon={getUnitIcon(unit.type, unit.status)}
            animation={unit.status === 'alert' ? google.maps.Animation.BOUNCE : undefined}
            onClick={() => setSelectedUnit(unit)}
          />
        ))}
        
        {/* Objective Markers */}
        {objectivePoints.map((objective) => (
          <Marker
            key={objective.id}
            position={objective.position}
            icon={getObjectiveIcon(objective.type)}
            zIndex={200}
          />
        ))}
        
        {/* Info Window for selected unit */}
        {selectedUnit && (
          <InfoWindow
            position={selectedUnit.position}
            onCloseClick={() => setSelectedUnit(null)}
          >
            <div className="p-1">
              <h4 className="font-medium text-sm">{selectedUnit.name}</h4>
              <div className="flex items-center mt-1 space-x-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs",
                  selectedUnit.type === 'friendly' && "bg-emerald-100 text-emerald-800",
                  selectedUnit.type === 'hostile' && "bg-red-100 text-red-800",
                  selectedUnit.type === 'unknown' && "bg-gray-100 text-gray-800"
                )}>
                  {selectedUnit.type}
                </span>
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs",
                  selectedUnit.status === 'active' && "bg-emerald-100 text-emerald-800",
                  selectedUnit.status === 'idle' && "bg-blue-100 text-blue-800",
                  selectedUnit.status === 'moving' && "bg-amber-100 text-amber-800",
                  selectedUnit.status === 'alert' && "bg-red-100 text-red-800"
                )}>
                  {selectedUnit.status}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Position: {selectedUnit.position.lat.toFixed(4)}, {selectedUnit.position.lng.toFixed(4)}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Map Controls */}
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
      
      {/* Right Side Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
        <Button 
          variant="secondary" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" 
          onClick={handleZoomOut}
        >
          <ZoomOut size={16} />
        </Button>
        <div className="w-24 h-8 px-3 flex items-center bg-background/70 backdrop-blur-sm border rounded-full shadow-md">
          <Slider 
            value={[zoomToSlider(zoom)]} 
            onValueChange={(val) => handleSliderChange([sliderToZoom(val[0])])} 
            max={100} 
            step={1} 
            className="w-full" 
          />
        </div>
        <Button 
          variant="secondary" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border shadow-md" 
          onClick={handleZoomIn}
        >
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
    </div>
  );
}
