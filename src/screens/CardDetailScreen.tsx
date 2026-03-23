import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardBack } from '@/components/Card/CardBack';
import { CardFront } from '@/components/Card/CardFront';
import { FloatingMagnifier } from '@/components/FloatingMagnifier';
import { Header } from '@/components/Header';
import { MapSticker } from '@/components/MapSticker';
import { useDistanceCalculator } from '@/hooks/useDistanceCalculator';
import { useCardStore } from '@/store/useCardStore';
import { useUiStore } from '@/store/useUiStore';
import { colors } from '@/styles/colors';

/**
 * 名片详情：正反面、距离、微缩地图贴纸、放大镜。
 */
export default function CardDetailScreen(): React.ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cards = useCardStore((s) => s.cards);
  const userLocation = useCardStore((s) => s.userLocation);
  const magnifierOpen = useUiStore((s) => s.magnifierOpen);
  const magnifierCardId = useUiStore((s) => s.magnifierCardId);
  const setMagnifier = useUiStore((s) => s.setMagnifier);
  const defaultMapProvider = useUiStore((s) => s.defaultMapProvider);

  const card = useMemo(() => cards.find((c) => c.id === id) ?? null, [cards, id]);
  const distKm = useDistanceCalculator(
    userLocation,
    card?.lat != null && card?.lng != null ? { lat: card.lat, lng: card.lng } : null,
  );

  if (!card) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="未找到" onBack={() => router.back()} />
        <Text style={styles.muted}>该名片不存在或已删除</Text>
      </SafeAreaView>
    );
  }

  const magnifierVisible = magnifierOpen && magnifierCardId === card.id;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Header title="名片详情" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.panel}>
          <CardFront card={card} />
          <Pressable style={styles.magBtn} onPress={() => setMagnifier(true, card.id)}>
            <Text style={styles.magTxt}>打开放大镜</Text>
          </Pressable>
        </View>
        <View style={styles.panel}>
          <CardBack card={card} />
        </View>
        {distKm != null ? (
          <Text style={styles.dist}>距您约 {distKm < 1 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`}</Text>
        ) : (
          <Text style={styles.muted}>距离需开启定位且名片含坐标</Text>
        )}
        {card.lat != null && card.lng != null ? (
          <MapSticker lat={card.lat} lng={card.lng} mapProvider={defaultMapProvider} />
        ) : null}
      </ScrollView>
      <FloatingMagnifier visible={magnifierVisible} card={card} onClose={() => setMagnifier(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { padding: 16, gap: 14, paddingBottom: 32 },
  panel: {
    backgroundColor: '#141824',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a3140',
    overflow: 'hidden',
  },
  magBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2a3140',
  },
  magTxt: { color: colors.accent, fontWeight: '600' },
  dist: { color: colors.textPrimary, fontSize: 15 },
  muted: { color: '#6b7280', padding: 16 },
});
