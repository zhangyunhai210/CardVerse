import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { launchMapNavigation } from '@/navigation/MapLauncher';
import { colors } from '@/styles/colors';

export interface MapStickerProps {
  lat: number;
  lng: number;
  label?: string;
  mapProvider?: import('@/navigation/MapLauncher').MapProvider;
}

/**
 * 微缩地图贴纸：以色块 + 坐标示意，点击打开外部地图（避免无 Key 时依赖瓦片服务）。
 */
export function MapSticker({
  lat,
  lng,
  label = '在地图中打开',
  mapProvider = 'google',
}: MapStickerProps): React.ReactElement {
  return (
    <Pressable
      onPress={() => void launchMapNavigation(lat, lng, mapProvider)}
      style={({ pressed }) => [styles.box, pressed && { opacity: 0.9 }]}
    >
      <View style={styles.pin} />
      <Text style={styles.coord}>
        {lat.toFixed(3)}, {lng.toFixed(3)}
      </Text>
      <Text style={styles.hint}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111827',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#334155',
    padding: 12,
    gap: 6,
    minHeight: 100,
    justifyContent: 'center',
  },
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    alignSelf: 'center',
  },
  coord: { color: colors.textPrimary, textAlign: 'center', fontSize: 13 },
  hint: { color: '#94a3b8', textAlign: 'center', fontSize: 12 },
});
