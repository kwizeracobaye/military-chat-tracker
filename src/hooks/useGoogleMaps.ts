
import { useLoadScript } from '@react-google-maps/api';

// Define a const for libraries to avoid reloads
const libraries: ("places")[] = ["places"];

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: "AIzaSyC9MrPyMDJD4KYoQYLFw28MQJ2sT9nUQcA", // Using a valid API key for Google Maps
    libraries: libraries,
  });
};
