import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export interface HeaderProps {
  title: string;
  onBack?: () => void;
}

/**
 * 通用顶栏：左侧返回 + 标题。
 */
export function Header({ title, onBack }: HeaderProps): React.ReactElement {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2a3140',
    backgroundColor: colors.background,
  },
  back: { width: 40, height: 40, justifyContent: 'center' },
  backText: { color: colors.textPrimary, fontSize: 28, marginTop: -4 },
  backPlaceholder: { width: 40, height: 40 },
  title: { ...typography.title, color: colors.textPrimary, flex: 1, textAlign: 'center' },
});
