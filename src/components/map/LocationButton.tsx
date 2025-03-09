
import React from 'react';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';

interface LocationButtonProps {
  onCenterLocation: () => void;
  isLoading: boolean;
}

const LocationButton = ({ onCenterLocation, isLoading }: LocationButtonProps) => {
  return (
    <Button
      onClick={onCenterLocation}
      variant="outline"
      disabled={isLoading}
    >
      <MapPin className="h-4 w-4 mr-2" />
      My Location
    </Button>
  );
};

export default LocationButton;
