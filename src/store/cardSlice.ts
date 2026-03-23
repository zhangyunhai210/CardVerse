/**
 * 名片领域模型：与 SQLite 表字段对齐，供 Zustand 与列表/详情共用。
 */
export type CardId = string;

export interface CardEntity {
  id: CardId;
  /** 展示用标题（如活动名或职位摘要） */
  title: string;
  name: string;
  company: string;
  address: string;
  lat: number | null;
  lng: number | null;
  createdAt: number;
}
