import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

export type MapProvider = 'google' | 'apple' | 'amap' | 'baidu';

/**
 * 构造各厂商地图打开链接；百度在 iOS 无安装客户端时可能失败，需回退。
 */
export function getMapLaunchUrl(lat: number, lng: number, provider: MapProvider): string {
  switch (provider) {
    case 'google':
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    case 'apple':
      return `http://maps.apple.com/?ll=${lat},${lng}`;
    case 'amap':
      return `https://uri.amap.com/marker?position=${lng},${lat}&name=Card`;
    case 'baidu':
      return `baidumap://map/marker?location=${lat},${lng}&title=Card`;
    default:
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
}

/**
 * 打开系统地图或厂商 App；无法打开时回退到 Google Maps Web。
 */
export async function launchMapNavigation(
  lat: number,
  lng: number,
  provider: MapProvider = 'google',
): Promise<void> {
  let url = getMapLaunchUrl(lat, lng, provider);
  if (provider === 'baidu' && Platform.OS === 'ios') {
    const ok = await Linking.canOpenURL(url);
    if (!ok) url = getMapLaunchUrl(lat, lng, 'google');
  }
  try {
    await Linking.openURL(url);
  } catch {
    await Linking.openURL(getMapLaunchUrl(lat, lng, 'google'));
  }
}
