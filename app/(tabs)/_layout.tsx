import { Tabs } from 'expo-router';
import React from 'react';

import { colors } from '@/styles/colors';

/**
 * 底部标签：首页、长廊、设置。
 */
export default function TabsLayout(): React.ReactElement {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: '#2a3140' },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tabs.Screen name="index" options={{ title: '名片' }} />
      <Tabs.Screen name="gallery" options={{ title: '长廊' }} />
      <Tabs.Screen name="settings" options={{ title: '设置' }} />
    </Tabs>
  );
}
