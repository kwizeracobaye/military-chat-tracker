
import React from 'react';
import { Button } from "@/components/ui/button";
import { ObjectivePoint } from '@/types/map';

interface ObjectiveSelectorProps {
  isAddingObjective: boolean;
  objectiveType: ObjectivePoint['type'];
  onTypeSelect: (type: ObjectivePoint['type']) => void;
}

export const ObjectiveSelector: React.FC<ObjectiveSelectorProps> = ({
  isAddingObjective,
  objectiveType,
  onTypeSelect,
}) => {
  if (!isAddingObjective) return null;
  
  return (
    <div className="absolute top-4 right-14 z-10">
      <div className="flex flex-col gap-2 p-2 bg-background/70 backdrop-blur-sm border rounded-md shadow-md">
        <Button
          variant={objectiveType === 'primary' ? "default" : "ghost"}
          size="sm"
          className="justify-start"
          onClick={() => onTypeSelect('primary')}
        >
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          Primary
        </Button>
        <Button
          variant={objectiveType === 'secondary' ? "default" : "ghost"}
          size="sm"
          className="justify-start"
          onClick={() => onTypeSelect('secondary')}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          Secondary
        </Button>
        <Button
          variant={objectiveType === 'extraction' ? "default" : "ghost"}
          size="sm"
          className="justify-start"
          onClick={() => onTypeSelect('extraction')}
        >
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          Extraction
        </Button>
      </div>
    </div>
  );
};
