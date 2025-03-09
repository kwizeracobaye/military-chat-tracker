
import { toast } from "sonner";

// Constants for Gako Military Academy, Rwanda (default location)
export const DEFAULT_LOCATION = {
  lat: -2.0794,
  lng: 30.1272,
  name: "Gako Military Academy, Bugesera District, Rwanda"
};

// Nominatim API for geocoding
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

// Rate limiting and caching utilities
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const geocodeCache = new Map<string, { data: any; timestamp: number }>();

export type GeocodingResult = {
  lat: string;
  lon: string;
  display_name: string;
  place_id: number;
  importance: number;
  address: {
    [key: string]: string;
  };
};

// Get user's current location using browser Geolocation API
export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        toast.error(`Unable to retrieve your location: ${error.message}`);
        console.error("Geolocation error:", error);
        // Fallback to default location
        resolve({
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};

// Forward geocoding: Convert address to coordinates
export const forwardGeocode = async (query: string): Promise<GeocodingResult[]> => {
  // Check cache first
  const cacheKey = `forward_${query}`;
  const cachedResult = geocodeCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.data;
  }
  
  try {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      limit: "5",
      addressdetails: "1"
    });
    
    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: {
        "User-Agent": "CadetNavigationSystem/1.0"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    geocodeCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error("Forward geocoding error:", error);
    toast.error("Failed to geocode address");
    return [];
  }
};

// Reverse geocoding: Convert coordinates to address
export const reverseGeocode = async (lat: number, lng: number): Promise<GeocodingResult | null> => {
  // Check cache first
  const cacheKey = `reverse_${lat}_${lng}`;
  const cachedResult = geocodeCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.data;
  }
  
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      format: "json",
      addressdetails: "1"
    });
    
    const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
      headers: {
        "User-Agent": "CadetNavigationSystem/1.0"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    geocodeCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    toast.error("Failed to get address for location");
    return null;
  }
};

// Calculate route between two points using OSRM
export const getRoute = async (
  start: [number, number] | [string, string], 
  end: [number, number] | [string, string]
): Promise<any> => {
  // Convert to string if needed
  const startLng = typeof start[1] === 'number' ? start[1].toString() : start[1];
  const startLat = typeof start[0] === 'number' ? start[0].toString() : start[0];
  const endLng = typeof end[1] === 'number' ? end[1].toString() : end[1];
  const endLat = typeof end[0] === 'number' ? end[0].toString() : end[0];
  
  const cacheKey = `route_${startLat},${startLng}_${endLat},${endLng}`;
  const cachedResult = geocodeCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.data;
  }
  
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
    );
    
    if (!response.ok) {
      throw new Error(`Routing error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    geocodeCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error("Routing error:", error);
    toast.error("Failed to calculate route");
    return null;
  }
};
