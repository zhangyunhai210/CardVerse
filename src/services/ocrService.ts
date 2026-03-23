import { Platform } from 'react-native';

import { levenshtein } from '@/utils/string';

/**
 * 从 OCR 文本中启发式抽取可能含「路/街/区/号」的一行作为地址候选。
 */
export function pickAddressLine(text: string): string | null {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const keywords = ['路', '街', '巷', '号', '区', '市', '省', 'Rd', 'St', 'Ave'];
  for (const line of lines) {
    if (keywords.some((k) => line.includes(k)) && line.length >= 4) return line;
  }
  return lines[0] ?? null;
}

/**
 * 将识别结果与候选标准地址做模糊匹配，取编辑距离最小者（演示用）。
 */
export function calibrateAddress(ocrLine: string, candidates: string[]): string | null {
  if (!candidates.length) return ocrLine;
  let best = candidates[0]!;
  let bestScore = Infinity;
  for (const c of candidates) {
    const d = levenshtein(ocrLine, c);
    if (d < bestScore) {
      bestScore = d;
      best = c;
    }
  }
  return best;
}

/**
 * Web：Tesseract.js 识别；原生：暂返回 null（可后续接 Vision / 原生 OCR）。
 */
export async function extractAddressFromImage(imageUri: string): Promise<string | null> {
  if (Platform.OS !== 'web') {
    return null;
  }
  try {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng');
    const { data } = await worker.recognize(imageUri);
    await worker.terminate();
    return pickAddressLine(data.text);
  } catch {
    return null;
  }
}
