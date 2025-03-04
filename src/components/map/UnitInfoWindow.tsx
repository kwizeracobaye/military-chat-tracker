
import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { cn } from '@/lib/utils';
import { UnitMarker } from '@/types/map';

interface UnitInfoWindowProps {
  selectedUnit: UnitMarker | null;
  onClose: () => void;
}

export const UnitInfoWindow: React.FC<UnitInfoWindowProps> = ({
  selectedUnit,
  onClose,
}) => {
  if (!selectedUnit) return null;
  
  return (
    <InfoWindow
      position={selectedUnit.position}
      onCloseClick={onClose}
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
  );
};
