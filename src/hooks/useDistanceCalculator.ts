import { haversineKm } from '@/utils/math';

/**
 * 根据当前位置与目标经纬度计算距离（千米）。
 */
export function useDistanceCalculator(
  from: { lat: number; lng: number } | null,
  to: { lat: number; lng: number } | null,
): number | null {
  if (!from || !to) return null;
  return haversineKm(from.lat, from.lng, to.lat, to.lng);
}
