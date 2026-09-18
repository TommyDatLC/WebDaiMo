export type MapType = 'roadmap' | 'satellite' | 'terrain';

export interface WardProperties {
  name: string;
  name_en: string;
  admin_level: number;
  district: string;
  city: string;
  area_km2: number;
  population: number;
  center: [number, number]; // [lon, lat]
  bounds: {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
  };
}

export interface Landmark {
  id: string;
  name: string;
  category: string;
  coords: [number, number]; // [lat, lon]
}
