
export type UnitMarker = {
  id: string;
  type: 'friendly' | 'hostile' | 'unknown';
  position: google.maps.LatLngLiteral;
  name: string;
  status: 'active' | 'idle' | 'moving' | 'alert';
};

export type ObjectivePoint = {
  id: string;
  position: google.maps.LatLngLiteral;
  name: string;
  type: 'primary' | 'secondary' | 'extraction';
};
