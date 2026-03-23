import * as Location from 'expo-location';

/**
 * 前台定位：拒绝权限时返回 null，不抛错，由界面展示说明。
 */
export async function getCurrentPosition(): Promise<{ lat: number; lng: number } | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) return null;
  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return { lat: pos.coords.latitude, lng: pos.coords.longitude };
}
