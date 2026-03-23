import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';

export interface DistanceBadgeProps {
  km: number | null;
}

/** 距离角标：无定位或无坐标时不展示数值 */
export function DistanceBadge({ km }: DistanceBadgeProps): React.ReactElement | null {
  if (km == null || Number.isNaN(km)) return null;
  const text = km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  return (
    <View style={styles.badge}>
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#334155',
  },
  txt: { color: colors.accent, fontSize: 12, fontWeight: '600' },
});
