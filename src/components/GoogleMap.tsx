
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UnitMarker, ObjectivePoint } from '@/types/map';
import { 
  containerStyle, 
  defaultCenter, 
  generateRandomUnits, 
  getUnitIcon, 
  getObjectiveIcon 
} from '@/utils/mapUtils';
import { MapZoomControls } from '@/components/map/MapZoomControls';
import { MapNavigationControls } from '@/components/map/MapNavigationControls';
import { MapActionControls } from '@/components/map/MapActionControls';
import { ObjectiveSelector } from '@/components/map/ObjectiveSelector';
import { UnitInfoWindow } from '@/components/map/UnitInfoWindow';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

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
  const { isLoaded, loadError } = useGoogleMaps();
  
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
  
  const toggleAddingObjective = () => {
    setIsAddingObjective(!isAddingObjective);
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
        <UnitInfoWindow 
          selectedUnit={selectedUnit} 
          onClose={() => setSelectedUnit(null)}
        />
      </GoogleMap>
      
      {/* Map Controls */}
      <MapNavigationControls />
      <MapZoomControls 
        zoom={zoom} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onSliderChange={handleSliderChange} 
      />
      <MapActionControls 
        isAddingObjective={isAddingObjective} 
        toggleAddingObjective={toggleAddingObjective}
        onGoToMyLocation={handleGoToMyLocation}
      />
      <ObjectiveSelector 
        isAddingObjective={isAddingObjective} 
        objectiveType={newObjectiveType} 
        onTypeSelect={setNewObjectiveType} 
      />
    </div>
  );
}
