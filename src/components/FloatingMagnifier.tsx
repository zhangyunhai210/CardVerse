import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { CardEntity } from '@/store/cardSlice';
import { colors } from '@/styles/colors';

export interface FloatingMagnifierProps {
  visible: boolean;
  card: CardEntity | null;
  onClose: () => void;
}

/**
 * 放大镜：放大展示名片关键文字，便于核对 OCR / 地址。
 */
export function FloatingMagnifier({ visible, card, onClose }: FloatingMagnifierProps): React.ReactElement | null {
  if (!card) return null;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.kicker}>放大镜</Text>
          <Text style={styles.bigTitle}>{card.title}</Text>
          <Text style={styles.bigName}>{card.name}</Text>
          <Text style={styles.bigCo}>{card.company}</Text>
          <Text style={styles.addr}>{card.address}</Text>
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeTxt}>关闭</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#334155',
    gap: 8,
  },
  kicker: { color: '#94a3b8', fontSize: 12 },
  bigTitle: { color: colors.textPrimary, fontSize: 22, fontWeight: '700' },
  bigName: { color: colors.accent, fontSize: 18, fontWeight: '600' },
  bigCo: { color: '#cbd5e1', fontSize: 16 },
  addr: { color: '#e2e8f0', fontSize: 15, lineHeight: 22, marginTop: 8 },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1e293b',
    borderRadius: 10,
  },
  closeTxt: { color: colors.textPrimary, fontWeight: '600' },
});
