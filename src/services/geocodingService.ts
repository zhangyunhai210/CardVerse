import { getMapboxToken } from '@/config/env';

export interface GeocodeResult {
  lat: number;
  lng: number;
  placeName: string;
}

/**
 * Mapbox Geocoding：无 Token 时返回 null，由 UI 提示配置 EXPO_PUBLIC_MAPBOX_TOKEN。
 */
export async function geocodeAddress(query: string): Promise<GeocodeResult | null> {
  const token = getMapboxToken();
  if (!token.trim()) return null;
  const path = encodeURIComponent(query.trim());
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${path}.json?access_token=${token}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    features?: { place_name: string; center: [number, number] }[];
  };
  const f = data.features?.[0];
  if (!f) return null;
  return { lng: f.center[0], lat: f.center[1], placeName: f.place_name };
}
