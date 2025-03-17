
import React, { useEffect, useRef } from 'react';

interface StoremapperWidgetProps {
  storeId: string;
  startDate?: string;
  className?: string;
}

const StoremapperWidget: React.FC<StoremapperWidgetProps> = ({ 
  storeId, 
  startDate = '2025,03,17', 
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://www.storemapper.co/js/widget-3.min.js';
    
    // Set data attributes
    script.setAttribute('data-storemapper-id', storeId);
    script.setAttribute('data-storemapper-start', startDate);
    
    // Append the script to the container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [storeId, startDate]);
  
  return (
    <div className={`storemapper-container ${className}`} style={{ width: '100%', height: '600px' }}>
      <div id="storemapper" ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <p>Store Locator is loading from <a href="https://www.storemapper.co">Storemapper plugin</a>...</p>
      </div>
    </div>
  );
};

export default StoremapperWidget;
