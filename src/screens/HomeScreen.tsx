import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DistanceBadge } from '@/components/DistanceBadge';
import { Header } from '@/components/Header';
import { getCurrentPosition } from '@/services/locationService';
import type { CardEntity } from '@/store/cardSlice';
import { useCardStore } from '@/store/useCardStore';
import { colors } from '@/styles/colors';
import { haversineKm } from '@/utils/math';
import { sortCardsByDistance } from '@/utils/sortCardsByDistance';

/**
 * 首页：竖屏列表，按距离排序（需定位权限）。
 */
export default function HomeScreen(): React.ReactElement {
  const router = useRouter();
  const cards = useCardStore((s) => s.cards);
  const userLocation = useCardStore((s) => s.userLocation);
  const locationError = useCardStore((s) => s.locationError);
  const setUserLocation = useCardStore((s) => s.setUserLocation);
  const setLocationError = useCardStore((s) => s.setLocationError);
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshLocation = useCallback(async () => {
    setRefreshing(true);
    try {
      const loc = await getCurrentPosition();
      if (loc) {
        setUserLocation(loc);
        setLocationError(null);
      } else {
        setLocationError('未获得定位权限，将按时间排序');
      }
    } finally {
      setRefreshing(false);
    }
  }, [setLocationError, setUserLocation]);

  useEffect(() => {
    void refreshLocation();
  }, [refreshLocation]);

  const sorted = sortCardsByDistance(cards, userLocation);

  const renderItem = useCallback(
    ({ item }: { item: CardEntity }) => {
      const dist =
        item.lat != null && item.lng != null && userLocation
          ? haversineKm(userLocation.lat, userLocation.lng, item.lat, item.lng)
          : null;
      return (
        <Pressable onPress={() => router.push(`/card/${item.id}`)} style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <DistanceBadge km={dist} />
          </View>
          <Text style={styles.cardSub}>
            {item.name} · {item.company}
          </Text>
          <Text style={styles.cardAddr} numberOfLines={2}>
            {item.address}
          </Text>
        </Pressable>
      );
    },
    [router, userLocation],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Header title="附近名片" />
      {locationError ? <Text style={styles.hint}>{locationError}</Text> : null}
      <FlatList
        data={sorted}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void refreshLocation()} tintColor={colors.accent} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <ActivityIndicator color={colors.accent} />
            <Text style={styles.muted}>加载名片…</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  hint: { color: '#fbbf24', paddingHorizontal: 16, paddingBottom: 8, fontSize: 13 },
  list: { padding: 16, paddingBottom: 32, gap: 12 },
  card: {
    backgroundColor: '#141824',
    borderRadius: 14,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a3140',
    gap: 6,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  cardTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', flex: 1 },
  cardSub: { color: '#a8b0c4', fontSize: 14 },
  cardAddr: { color: '#6b7280', fontSize: 13 },
  empty: { paddingTop: 48, alignItems: 'center', gap: 8 },
  muted: { color: '#6b7280', fontSize: 13 },
});
