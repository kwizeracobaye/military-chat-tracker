
import { useLoadScript } from '@react-google-maps/api';

// Define a const for libraries to avoid reloads
const libraries: ("places")[] = ["places"];

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: "AIzaSyBG6uRQf8wRQXJ1VNLhkotdaZaA0lQECn8", // Replace with actual API key
    libraries: libraries,
  });
};
