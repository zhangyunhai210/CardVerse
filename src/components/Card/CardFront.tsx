import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { CardEntity } from '@/store/cardSlice';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export interface CardFrontProps {
  card: CardEntity;
}

/** 名片正面信息块 */
export function CardFront({ card }: CardFrontProps): React.ReactElement {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.name}>{card.name}</Text>
      <Text style={styles.company}>{card.company}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, gap: 6 },
  title: { ...typography.title, color: colors.textPrimary },
  name: { ...typography.body, color: colors.accent, fontWeight: '600' },
  company: { ...typography.body, color: '#a8b0c4' },
});
