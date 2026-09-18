export type TravelModeId = 'car' | 'transit' | 'bike' | 'rideshare';

export interface TravelMode {
  id: TravelModeId;
  label: string;
  duration: string;
  icon: string;
}

export interface RouteOption {
  id: string;
  name: string;
  duration: string;
  distance: string;
  trafficNote: string;
  isFastest?: boolean;
}

export type PoiCategoryId = 'toilets' | 'gas' | 'restaurants' | 'more' | 'coffee' | 'hotel';

export interface PoiCategory {
  id: PoiCategoryId;
  label: string;
  icon: string;
}
