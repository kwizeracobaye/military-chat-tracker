
import { UnitMarker, ObjectivePoint } from '@/types/map';

// Default center location
export const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503
};

// Map container styles
export const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem'
};

// Generate some random units for demo purposes
export const generateRandomUnits = (count: number, center: google.maps.LatLngLiteral): UnitMarker[] => {
  const types: Array<UnitMarker['type']> = ['friendly', 'hostile', 'unknown'];
  const statuses: Array<UnitMarker['status']> = ['active', 'idle', 'moving', 'alert'];
  
  return Array.from({ length: count }).map((_, index) => ({
    id: `unit-${index}`,
    type: types[Math.floor(Math.random() * types.length)],
    position: {
      lat: center.lat + (Math.random() - 0.5) * 0.2,
      lng: center.lng + (Math.random() - 0.5) * 0.2
    },
    name: `Unit ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// Get marker icon based on unit type
export const getUnitIcon = (type: UnitMarker['type'], status: UnitMarker['status']) => {
  // SVG icons as data URLs
  const friendlyIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#22c55e" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="6" fill="#22c55e" />
    </svg>
  `)}`;
  
  const hostileIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L4 11l2.5 8H12h5.5L20 11 12 2z" fill="#ef4444" fill-opacity="0.2" />
      <circle cx="12" cy="14" r="4" fill="#ef4444" />
    </svg>
  `)}`;
  
  const unknownIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#9ca3af" fill-opacity="0.2" />
      <path d="M9 12h6" stroke="#9ca3af" stroke-width="2" />
    </svg>
  `)}`;
  
  // Return icon based on type
  switch (type) {
    case 'friendly':
      return { url: friendlyIcon, scaledSize: new google.maps.Size(30, 30) };
    case 'hostile':
      return { url: hostileIcon, scaledSize: new google.maps.Size(30, 30) };
    case 'unknown':
    default:
      return { url: unknownIcon, scaledSize: new google.maps.Size(30, 30) };
  }
};

// Get objective icon based on type
export const getObjectiveIcon = (type: ObjectivePoint['type']) => {
  // SVG icons as data URLs
  const primaryIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#eab308" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="3" fill="#eab308" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#eab308" />
    </svg>
  `)}`;
  
  const secondaryIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="3" fill="#3b82f6" />
      <path d="M12 2v4M12 18v4" stroke="#3b82f6" />
    </svg>
  `)}`;
  
  const extractionIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#22c55e" fill-opacity="0.2" />
      <path d="M12 7l-5 5h10l-5-5z" fill="#22c55e" />
      <path d="M12 17v-5" stroke="#22c55e" />
    </svg>
  `)}`;
  
  // Return icon based on type
  switch (type) {
    case 'primary':
      return { url: primaryIcon, scaledSize: new google.maps.Size(36, 36) };
    case 'secondary':
      return { url: secondaryIcon, scaledSize: new google.maps.Size(36, 36) };
    case 'extraction':
      return { url: extractionIcon, scaledSize: new google.maps.Size(36, 36) };
    default:
      return null;
  }
};
