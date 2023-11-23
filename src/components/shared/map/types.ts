export type Restaurant = {
  id: string;
  name: string;
  emoji?: string;
  // isHighlight: boolean;
  latLng: LatLng;
};

export type LatLng = {
  lat: number;
  lng: number;
};
