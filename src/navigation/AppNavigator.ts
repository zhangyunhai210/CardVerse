import { useRouter } from 'expo-router';

/**
 * 兼容原「AppNavigator」命名：业务层通过该 hook 跳转，底层为 expo-router。
 */
export function useAppNavigation() {
  const router = useRouter();
  return {
    goHome: () => router.replace('/'),
    openCard: (id: string) => router.push(`/card/${id}`),
    openGallery: () => router.push('/gallery'),
    openSettings: () => router.push('/settings'),
  };
}
