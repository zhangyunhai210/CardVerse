import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardFront } from '@/components/Card/CardFront';
import { Header } from '@/components/Header';
import { Scene } from '@/gl/Scene';
import { useCardStore } from '@/store/useCardStore';
import { colors } from '@/styles/colors';

/**
 * 横屏长廊：Web 使用 WebGL Scene；原生使用横向列表作为等价体验。
 */
export default function GalleryScreen(): React.ReactElement {
  const cards = useCardStore((s) => s.cards);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.flex}>
        <Header title="艺术长廊" />
        <View style={styles.gl}>
          <Scene cards={cards} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Header title="艺术长廊" />
      <Text style={styles.note}>原生端当前为横向卡片带；完整 WebGL 可接 expo-gl + fiber/native。</Text>
      <FlatList
        horizontal
        data={cards}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.hList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.nativeCard}>
            <CardFront card={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1, backgroundColor: colors.background },
  gl: { flex: 1, minHeight: 400 },
  note: { color: '#94a3b8', paddingHorizontal: 16, paddingBottom: 8, fontSize: 13 },
  hList: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  nativeCard: {
    width: 280,
    backgroundColor: '#141824',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a3140',
    marginRight: 12,
  },
});
