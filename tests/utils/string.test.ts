import { describe, expect, it } from 'vitest';

import { levenshtein } from '@/utils/string';

describe('levenshtein', () => {
  it('相同字符串为 0', () => {
    expect(levenshtein('abc', 'abc')).toBe(0);
  });

  it('单字符编辑距离', () => {
    expect(levenshtein('abc', 'abx')).toBe(1);
  });
});
