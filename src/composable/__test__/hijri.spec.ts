import { it, describe, expect, beforeEach } from "vitest";
import { getHijri, days } from "../hijriDate";
import { useAdjectStore } from "@/stores/adjestTime";
import { setActivePinia, createPinia } from 'pinia'

describe('Math operations', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })

  it('should return 2 string values (month must be hex, day must be in certin set)', () => {
    const adject = useAdjectStore();
    adject.increament();
    adject.increament();
    adject.increament();

    const test = getHijri.value;
    expect(test.fontDay).toBeOneOf(days)

    const values = (c = 12) =>
      Array.from({ length: c }, (_, i) => (i + 1).toString(16).toUpperCase());
    expect(test.fontMonth).toBeOneOf(values())
  });
});
