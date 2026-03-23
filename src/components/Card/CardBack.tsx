import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { CardEntity } from '@/store/cardSlice';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export interface CardBackProps {
  card: CardEntity;
}

/** 名片背面：地址与坐标摘要 */
export function CardBack({ card }: CardBackProps): React.ReactElement {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>地址</Text>
      <Text style={styles.addr}>{card.address}</Text>
      {card.lat != null && card.lng != null ? (
        <Text style={styles.coord}>
          {card.lat.toFixed(4)}, {card.lng.toFixed(4)}
        </Text>
      ) : (
        <Text style={styles.muted}>暂无坐标，可在设置中配置 Mapbox 后解析</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, gap: 8 },
  label: { ...typography.body, color: '#7b8698', fontSize: 13 },
  addr: { ...typography.body, color: colors.textPrimary },
  coord: { ...typography.body, color: '#9aa3b5', fontSize: 13 },
  muted: { ...typography.body, color: '#6b7280', fontSize: 13 },
});
