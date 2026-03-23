/**
 * 名片列表与排序相关状态（占位）：接入 slice 后实现 reducer 与 selectors。
 */
export type CardId = string;

export interface CardEntity {
  id: CardId;
  title: string;
}
