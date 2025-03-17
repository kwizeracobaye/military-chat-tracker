
import { useLoadScript } from '@react-google-maps/api';

// Define a const for libraries to avoid reloads
const libraries: ("places")[] = ["places"];

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: "AIzaSyAjVL-75atatWJ010s6UPsXAXjrh_20UMA", // Updated API key
    libraries: libraries,
  });
};
