
import React from 'react';

const MapAttribution = () => {
  return (
    <div className="text-xs text-muted-foreground mt-2 text-center">
      Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors | 
      Routing powered by <a href="http://project-osrm.org/" target="_blank" rel="noopener noreferrer" className="underline">OSRM</a> | 
      Geocoding by <a href="https://nominatim.org/" target="_blank" rel="noopener noreferrer" className="underline">Nominatim</a>
    </div>
  );
};

export default MapAttribution;
