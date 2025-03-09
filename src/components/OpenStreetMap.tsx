
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { DEFAULT_LOCATION, getUserLocation, reverseGeocode, GeocodingResult } from '../utils/osmUtils';
import MapControls from './map/MapControls';
import MapContainer from './map/MapContainer';
import MapAttribution from './map/MapAttribution';
import CurrentLocation from './map/CurrentLocation';

// Fix the marker icon issue in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface OpenStreetMapProps {
  height?: string;
  className?: string;
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ height = '500px', className = '' }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routingControlRef = useRef<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentAddress, setCurrentAddress] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      console.log("Initializing map...");
      
      // Create map instance
      mapRef.current = L.map(mapContainerRef.current, {
        center: [DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng],
        zoom: 14,
        zoomControl: false
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      
      // Add zoom control in a better position
      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapRef.current);
      
      setMapInitialized(true);
      
      // Try to get user location
      getUserLocation()
        .then(coords => {
          console.log("Got user location:", coords);
          if (mapRef.current) {
            mapRef.current.setView([coords.lat, coords.lng], 16);
            
            // Add marker for user location
            if (!userMarkerRef.current && mapRef.current) {
              userMarkerRef.current = L.marker([coords.lat, coords.lng], {
                icon: L.divIcon({
                  className: 'user-location-marker',
                  html: `<div class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full shadow-lg">
                          <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-primary opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </div>`,
                  iconSize: [24, 24],
                  iconAnchor: [12, 12]
                })
              }).addTo(mapRef.current);
              
              // Get address for user location
              reverseGeocode(coords.lat, coords.lng)
                .then(result => {
                  if (result) {
                    setCurrentAddress(result.display_name);
                    userMarkerRef.current?.bindPopup(`Your location: ${result.display_name}`).openPopup();
                  }
                });
            }
          }
        })
        .catch(error => {
          console.error("Error getting location:", error);
          
          // Add marker for default location
          if (mapRef.current) {
            userMarkerRef.current = L.marker([DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng], {
              icon: L.divIcon({
                className: 'default-location-marker',
                html: `<div class="w-6 h-6 bg-amber-500 text-white rounded-full shadow-lg flex items-center justify-center">
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })
            }).addTo(mapRef.current)
              .bindPopup(`Default location: ${DEFAULT_LOCATION.name}`).openPopup();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // This effect ensures the map resizes properly when it becomes visible
  useEffect(() => {
    if (mapRef.current && mapInitialized) {
      mapRef.current.invalidateSize();
    }
  }, [mapInitialized]);

  // Function to clear all markers except user location
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (mapRef.current) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];
  };

  // Function to clear routing
  const clearRouting = () => {
    if (routingControlRef.current && mapRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
  };

  // Handle search results
  const handleSearchResults = (results: GeocodingResult[]) => {
    // Clear previous markers
    clearMarkers();
    
    if (results.length > 0) {
      // Add markers for all results
      results.forEach(result => {
        if (mapRef.current) {
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          const marker = L.marker([lat, lng])
            .addTo(mapRef.current)
            .bindPopup(result.display_name);
          markersRef.current.push(marker);
        }
      });
      
      // Center map on first result
      if (mapRef.current) {
        const lat = parseFloat(results[0].lat);
        const lng = parseFloat(results[0].lon);
        mapRef.current.setView([lat, lng], 14);
      }
    }
  };

  // Calculate and display route
  const handleCalculateRoute = (startLat: number, startLng: number, endLat: number, endLng: number) => {
    // Clear previous routing
    clearRouting();
    
    // Add new routing control
    if (mapRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(startLat, startLng),
          L.latLng(endLat, endLng)
        ],
        routeWhileDragging: true,
        showAlternatives: true,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: '#6366F1', opacity: 0.8, weight: 6 },
            { color: 'white', opacity: 0.8, weight: 2 }
          ]
        }
      }).addTo(mapRef.current);
      
      // Clear the previous markers
      clearMarkers();
    }
  };

  // Center on user location
  const handleCenterOnUserLocation = async () => {
    try {
      setIsLoading(true);
      const coords = await getUserLocation();
      
      if (mapRef.current) {
        mapRef.current.setView([coords.lat, coords.lng], 16);
        
        // Update or create user marker
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([coords.lat, coords.lng]);
        } else {
          userMarkerRef.current = L.marker([coords.lat, coords.lng]).addTo(mapRef.current);
        }
        
        // Get address for location
        const result = await reverseGeocode(coords.lat, coords.lng);
        if (result) {
          setCurrentAddress(result.display_name);
          userMarkerRef.current.bindPopup(`Your location: ${result.display_name}`).openPopup();
        }
      }
    } catch (error) {
      console.error("Center location error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <MapControls 
        onSearchResults={handleSearchResults}
        onCalculateRoute={handleCalculateRoute}
        onCenterLocation={handleCenterOnUserLocation}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      
      <CurrentLocation currentAddress={currentAddress} />
      
      <MapContainer 
        height={height} 
        isLoading={isLoading} 
        mapRef={mapRef} 
        mapContainerRef={mapContainerRef} 
      />
      
      <MapAttribution />
    </div>
  );
};

export default OpenStreetMap;
