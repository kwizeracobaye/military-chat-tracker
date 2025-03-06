
import { useLoadScript } from '@react-google-maps/api';

// Define a const for libraries to avoid reloads
const libraries: ("places")[] = ["places"];

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: "AIzaSyA-rBUqPj6L4J_acpvwzBi4VRgAVkz-tB8", // Using a valid API key for Google Maps
    libraries: libraries,
  });
};
