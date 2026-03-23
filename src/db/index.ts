import * as SQLite from 'expo-sqlite';

import type { CardEntity } from '@/store/cardSlice';

let dbSingleton: SQLite.SQLiteDatabase | null = null;

const SCHEMA_VERSION = 1;

/**
 * 打开数据库并执行建表与种子数据（首次为空时插入演示名片）。
 */
export async function initLocalDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbSingleton) return dbSingleton;
  const db = await SQLite.openDatabaseAsync('cardverse.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL,
      lng REAL,
      created_at INTEGER NOT NULL
    );
  `);
  const verRow = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM meta WHERE key = 'schema_version'",
  );
  const ver = verRow ? Number(verRow.value) : 0;
  if (ver < SCHEMA_VERSION) {
    await db.runAsync('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)', [
      'schema_version',
      String(SCHEMA_VERSION),
    ]);
  }
  dbSingleton = db;
  const countRow = await db.getFirstAsync<{ c: number }>('SELECT COUNT(*) as c FROM cards');
  if (countRow && countRow.c === 0) {
    await seedDemoCards(db);
  }
  return db;
}

function rowToEntity(row: {
  id: string;
  title: string;
  name: string;
  company: string;
  address: string;
  lat: number | null;
  lng: number | null;
  created_at: number;
}): CardEntity {
  return {
    id: row.id,
    title: row.title,
    name: row.name,
    company: row.company,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    createdAt: row.created_at,
  };
}

/** 从数据库读取全部名片（按创建时间倒序）。 */
export async function loadAllCards(): Promise<CardEntity[]> {
  const db = dbSingleton ?? (await initLocalDatabase());
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    name: string;
    company: string;
    address: string;
    lat: number | null;
    lng: number | null;
    created_at: number;
  }>('SELECT * FROM cards ORDER BY created_at DESC');
  return rows.map(rowToEntity);
}

/** 插入或更新一张名片。 */
export async function saveCard(card: CardEntity): Promise<void> {
  const db = dbSingleton ?? (await initLocalDatabase());
  await db.runAsync(
    `INSERT OR REPLACE INTO cards (id, title, name, company, address, lat, lng, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      card.id,
      card.title,
      card.name,
      card.company,
      card.address,
      card.lat,
      card.lng,
      card.createdAt,
    ],
  );
}

/** 演示数据：三座城市的示例坐标，便于距离排序与地图展示。 */
async function seedDemoCards(db: SQLite.SQLiteDatabase): Promise<void> {
  const demo: CardEntity[] = [
    {
      id: 'demo-bj',
      title: '产品总监',
      name: '张三',
      company: '星云科技',
      address: '北京市海淀区中关村大街1号',
      lat: 39.9836,
      lng: 116.3184,
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: 'demo-sh',
      title: '设计顾问',
      name: '李四',
      company: '澜图设计',
      address: '上海市黄浦区外滩中山东一路',
      lat: 31.2397,
      lng: 121.4998,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'demo-gz',
      title: '技术负责人',
      name: '王五',
      company: '南湾互联',
      address: '广州市天河区珠江新城花城大道',
      lat: 23.1291,
      lng: 113.2644,
      createdAt: Date.now(),
    },
  ];
  for (const c of demo) {
    await db.runAsync(
      `INSERT OR REPLACE INTO cards (id, title, name, company, address, lat, lng, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [c.id, c.title, c.name, c.company, c.address, c.lat, c.lng, c.createdAt],
    );
  }
}
