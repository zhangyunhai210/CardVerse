import type { CardEntity } from '@/store/cardSlice';
import type { UserLocation } from '@/store/useCardStore';

import { haversineKm } from '@/utils/math';

/**
 * 有定位时按球面距离升序；无定位时按创建时间降序。
 */
export function sortCardsByDistance(cards: CardEntity[], user: UserLocation | null): CardEntity[] {
  const copy = [...cards];
  if (!user) {
    return copy.sort((a, b) => b.createdAt - a.createdAt);
  }
  return copy.sort((a, b) => {
    const da =
      a.lat != null && a.lng != null
        ? haversineKm(user.lat, user.lng, a.lat, a.lng)
        : Number.POSITIVE_INFINITY;
    const db =
      b.lat != null && b.lng != null
        ? haversineKm(user.lat, user.lng, b.lat, b.lng)
        : Number.POSITIVE_INFINITY;
    return da - db;
  });
}
