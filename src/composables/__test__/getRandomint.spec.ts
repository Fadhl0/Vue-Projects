import { describe, it, expect } from 'vitest'
import { getRandomInt } from '../getRandomint';

describe('random number', () => {

  it.each([
    { min: 5, max: 9 },
    { min: 6, max: 10 },
    { min: 9, max: 99 },
    { min: 100, max: 110 },
    { min: 1000, max: 9999 },
  ])
    ("return value in range $min to $max", ({ min, max }) => {
      const rand = getRandomInt(min, max).value;
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThanOrEqual(max);
    });
})
