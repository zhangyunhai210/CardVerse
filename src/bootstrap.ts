import { initLocalDatabase, loadAllCards } from '@/db';
import { useCardStore } from '@/store/useCardStore';

/**
 * 应用启动：初始化 SQLite 并将名片载入全局 store。
 */
export async function bootstrapApp(): Promise<void> {
  await initLocalDatabase();
  const cards = await loadAllCards();
  useCardStore.getState().setCards(cards);
}
