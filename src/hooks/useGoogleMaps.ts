
import { useLoadScript } from '@react-google-maps/api';

// Define a const for libraries to avoid reloads
const libraries: ("places")[] = ["places"];

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCYt9MUxGvuu6t7ncSYVZ0XQ_6rXIIVUQo", // Updated API key
    libraries: libraries,
  });
};
