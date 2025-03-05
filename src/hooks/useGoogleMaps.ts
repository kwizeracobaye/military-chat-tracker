
import { useLoadScript } from '@react-google-maps/api';

// Define a const for libraries to avoid reloads
const libraries: ("places")[] = ["places"];

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: "AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU", // Using a valid API key for Google Maps
    libraries: libraries,
  });
};
