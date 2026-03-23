import { create } from 'zustand';

import type { CardEntity } from '@/store/cardSlice';

export interface UserLocation {
  lat: number;
  lng: number;
}

interface CardState {
  cards: CardEntity[];
  userLocation: UserLocation | null;
  locationError: string | null;
  setCards: (cards: CardEntity[]) => void;
  upsertCard: (card: CardEntity) => void;
  setUserLocation: (loc: UserLocation | null) => void;
  setLocationError: (msg: string | null) => void;
}

/**
 * 名片列表与设备位置：Home 排序、详情距离、长廊数据均从此读取。
 */
export const useCardStore = create<CardState>((set) => ({
  cards: [],
  userLocation: null,
  locationError: null,
  setCards: (cards) => set({ cards }),
  upsertCard: (card) =>
    set((s) => {
      const idx = s.cards.findIndex((c) => c.id === card.id);
      if (idx === -1) return { cards: [...s.cards, card] };
      const next = [...s.cards];
      next[idx] = card;
      return { cards: next };
    }),
  setUserLocation: (userLocation) => set({ userLocation }),
  setLocationError: (locationError) => set({ locationError }),
}));
