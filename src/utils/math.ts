/** 地球半径（千米），用于 Haversine 近似 */
const R_KM = 6371;

function toRad(d: number): number {
  return (d * Math.PI) / 180;
}

/**
 * 球面距离（千米）：用于名片距离与 Parallax 位移参考。
 */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R_KM * c;
}
