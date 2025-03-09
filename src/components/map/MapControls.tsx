
import React from 'react';
import MapSearchBox from './MapSearchBox';
import RouteCalculator from './RouteCalculator';
import LocationButton from './LocationButton';
import { GeocodingResult } from '@/utils/osmUtils';

interface MapControlsProps {
  onSearchResults: (results: GeocodingResult[]) => void;
  onCalculateRoute: (startLat: number, startLng: number, endLat: number, endLng: number) => void;
  onCenterLocation: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MapControls = ({ 
  onSearchResults, 
  onCalculateRoute, 
  onCenterLocation, 
  isLoading, 
  setIsLoading 
}: MapControlsProps) => {
  return (
    <div className="p-4 bg-card rounded-lg border shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Navigation Tools</h3>
      <div className="flex flex-col gap-4">
        <MapSearchBox 
          onSearchResults={onSearchResults} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />
        
        <RouteCalculator 
          onCalculateRoute={onCalculateRoute} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />
        
        <div className="flex gap-2">
          <LocationButton 
            onCenterLocation={onCenterLocation} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default MapControls;
