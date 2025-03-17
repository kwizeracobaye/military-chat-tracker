
import React from 'react';

interface EmbeddedGoogleMapProps {
  apiKey: string;
  location?: string;
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

const EmbeddedGoogleMap: React.FC<EmbeddedGoogleMapProps> = ({
  apiKey,
  location = 'Gako+Military+Academy,Bugesera+District,Rwanda',
  zoom = 14,
  className = '',
  style = { width: '100%', height: '100%', border: 0 }
}) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}&zoom=${zoom}`;
  
  return (
    <div className={`google-map-container ${className}`} style={{ height: '100%', width: '100%' }}>
      <iframe
        title="Google Map"
        className="rounded-lg"
        style={style}
        src={mapUrl}
        allowFullScreen
      />
    </div>
  );
};

export default EmbeddedGoogleMap;
