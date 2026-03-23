import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import type { MapProvider } from '@/navigation/MapLauncher';
import { useUiStore } from '@/store/useUiStore';
import { colors } from '@/styles/colors';

const PROVIDERS: { key: MapProvider; label: string }[] = [
  { key: 'google', label: 'Google Maps' },
  { key: 'apple', label: 'Apple Maps' },
  { key: 'amap', label: '高德' },
  { key: 'baidu', label: '百度' },
];

/**
 * 设置：OCR 开关、默认地图应用。
 */
export default function SettingsScreen(): React.ReactElement {
  const ocrEnabled = useUiStore((s) => s.ocrEnabled);
  const setOcrEnabled = useUiStore((s) => s.setOcrEnabled);
  const defaultMapProvider = useUiStore((s) => s.defaultMapProvider);
  const setDefaultMapProvider = useUiStore((s) => s.setDefaultMapProvider);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Header title="设置" />
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>OCR 地址识别</Text>
            <Text style={styles.sub}>Web 端使用 Tesseract；原生端待接入</Text>
          </View>
          <Switch value={ocrEnabled} onValueChange={setOcrEnabled} />
        </View>
      </View>
      <Text style={styles.section}>默认地图</Text>
      <View style={styles.card}>
        {PROVIDERS.map((p, i) => {
          const active = defaultMapProvider === p.key;
          return (
            <Pressable
              key={p.key}
              onPress={() => setDefaultMapProvider(p.key)}
              style={[
                styles.providerRow,
                i > 0 && styles.providerRowBorder,
                active && styles.providerRowActive,
              ]}
            >
              <Text style={[styles.providerTxt, active && styles.providerTxtActive]}>{p.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.hint}>
        配置地理编码请设置环境变量 EXPO_PUBLIC_MAPBOX_TOKEN；密钥勿提交仓库。
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#141824',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a3140',
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  label: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },
  sub: { color: '#6b7280', fontSize: 12, marginTop: 4 },
  section: { color: '#94a3b8', marginHorizontal: 16, marginTop: 18, marginBottom: 8, fontSize: 13 },
  providerRow: { paddingVertical: 12, paddingHorizontal: 14 },
  providerRowBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#2a3140' },
  providerRowActive: { backgroundColor: '#1e293b' },
  providerTxt: { color: '#cbd5e1', fontSize: 15 },
  providerTxtActive: { color: colors.accent, fontWeight: '700' },
  hint: { color: '#6b7280', fontSize: 12, marginHorizontal: 16, marginTop: 16, lineHeight: 18 },
});
