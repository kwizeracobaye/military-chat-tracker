
import React from 'react';
import { Navigation } from 'lucide-react';

interface CurrentLocationProps {
  currentAddress: string;
}

const CurrentLocation = ({ currentAddress }: CurrentLocationProps) => {
  if (!currentAddress) return null;
  
  return (
    <div className="p-2 mb-4 bg-background rounded-lg border flex items-center text-sm">
      <Navigation className="h-4 w-4 mr-2 text-muted-foreground" />
      <span className="text-muted-foreground mr-2">Current location:</span>
      <span className="truncate">{currentAddress}</span>
    </div>
  );
};

export default CurrentLocation;
