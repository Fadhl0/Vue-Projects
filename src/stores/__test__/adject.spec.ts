// @vitest-environment happy-dom
import { setActivePinia, createPinia } from "pinia";
import { it, describe, expect, beforeEach } from "vitest";
import { KEY, useAdjectStore } from "../adjestTime";

describe('adject hijri date', () => {

  beforeEach(() => {
    setActivePinia(createPinia());
  })

  it('should increament value', () => {
    const adject = useAdjectStore();
    adject.increament();
    adject.increament();
    adject.decreament();
    adject.increament();
    expect(adject.getAdject).toBe(2);
    adject.decreament();
    adject.decreament();
    expect(adject.getAdject).toBe(0);
  });

  it('should return 0 if local storage not exist', () => {
    localStorage.removeItem(KEY);
    const adject = useAdjectStore();
    expect(adject.getAdject).toBe(0);
  });
});
