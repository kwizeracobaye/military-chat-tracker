
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { forwardGeocode } from '@/utils/osmUtils';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface RouteCalculatorProps {
  onCalculateRoute: (startLat: number, startLng: number, endLat: number, endLng: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const RouteCalculator = ({ onCalculateRoute, isLoading, setIsLoading }: RouteCalculatorProps) => {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');

  const calculateRoute = async () => {
    if (!startAddress || !endAddress) {
      toast.error("Please enter both start and end addresses");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Geocode start address
      const startResults = await forwardGeocode(startAddress);
      if (startResults.length === 0) {
        toast.error("Could not find start location");
        return;
      }
      
      // Geocode end address
      const endResults = await forwardGeocode(endAddress);
      if (endResults.length === 0) {
        toast.error("Could not find end location");
        return;
      }
      
      const startLat = parseFloat(startResults[0].lat);
      const startLng = parseFloat(startResults[0].lon);
      const endLat = parseFloat(endResults[0].lat);
      const endLng = parseFloat(endResults[0].lon);
      
      onCalculateRoute(startLat, startLng, endLat, endLng);
      toast.success("Route calculated successfully");
    } catch (error) {
      console.error("Routing error:", error);
      toast.error("Failed to calculate route");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-center">
        <Input
          type="text"
          placeholder="Start address"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
        />
        <div className="hidden sm:block">to</div>
        <Input
          type="text"
          placeholder="End address"
          value={endAddress}
          onChange={(e) => setEndAddress(e.target.value)}
        />
      </div>
      
      <Button
        onClick={calculateRoute}
        disabled={isLoading || !startAddress || !endAddress}
        className="flex-grow"
      >
        Calculate Route
      </Button>
    </>
  );
};

export default RouteCalculator;
