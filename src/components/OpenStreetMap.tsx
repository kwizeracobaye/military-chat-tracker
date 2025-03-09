
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { DEFAULT_LOCATION, getUserLocation, forwardGeocode, reverseGeocode, getRoute, GeocodingResult } from '../utils/osmUtils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2, MapPin, Navigation, Search } from 'lucide-react';
import { toast } from 'sonner';

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
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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
          toast.error("Could not get your location. Using default location.");
          
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

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const results = await forwardGeocode(searchQuery);
      setSearchResults(results);
      
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
        
        toast.success(`Found ${results.length} locations`);
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate and display route
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
      
      toast.success("Route calculated successfully");
    } catch (error) {
      console.error("Routing error:", error);
      toast.error("Failed to calculate route");
    } finally {
      setIsLoading(false);
    }
  };

  // Center on user location
  const centerOnUserLocation = async () => {
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
      
      toast.success("Centered on your location");
    } catch (error) {
      console.error("Center location error:", error);
      toast.error("Could not center on your location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="p-4 bg-card rounded-lg border shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Navigation Tools</h3>
        
        {/* Navigation Controls */}
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-grow"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Routing */}
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
          
          <div className="flex gap-2">
            <Button
              onClick={calculateRoute}
              disabled={isLoading || !startAddress || !endAddress}
              className="flex-grow"
            >
              Calculate Route
            </Button>
            <Button
              onClick={centerOnUserLocation}
              variant="outline"
              disabled={isLoading}
            >
              <MapPin className="h-4 w-4 mr-2" />
              My Location
            </Button>
          </div>
        </div>
      </div>
      
      {/* Current Location Info */}
      {currentAddress && (
        <div className="p-2 mb-4 bg-background rounded-lg border flex items-center text-sm">
          <Navigation className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground mr-2">Current location:</span>
          <span className="truncate">{currentAddress}</span>
        </div>
      )}
      
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        style={{ height, width: '100%' }} 
        className="rounded-lg border shadow-lg overflow-hidden relative z-0"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
      
      {/* Attribution notice */}
      <div className="text-xs text-muted-foreground mt-2 text-center">
        Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors | 
        Routing powered by <a href="http://project-osrm.org/" target="_blank" rel="noopener noreferrer" className="underline">OSRM</a> | 
        Geocoding by <a href="https://nominatim.org/" target="_blank" rel="noopener noreferrer" className="underline">Nominatim</a>
      </div>
    </div>
  );
};

export default OpenStreetMap;
