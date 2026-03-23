import { describe, expect, it } from 'vitest';

import { haversineKm } from '@/utils/math';

describe('haversineKm', () => {
  it('北京到上海距离约为 1000km 量级', () => {
    const km = haversineKm(39.9836, 116.3184, 31.2397, 121.4998);
    expect(km).toBeGreaterThan(900);
    expect(km).toBeLessThan(1200);
  });
});
