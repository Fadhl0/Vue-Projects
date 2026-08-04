import { setActivePinia, createPinia } from "pinia";
import { it, describe, expect, beforeEach } from "vitest";
import { useActiveStore } from "../activeAdhan";

describe('Active Adhan', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })

  it.each([0, 1, 2, 3, 4])
    ('correct active state', (val) => {
      const target = useActiveStore()
      target.setActive(val)
      expect(target.getActive).toBe(val);
    });

  it.each([-1, -2, 6, 10, 1000])
    ('incorrect number must return last active state', (val) => {
      const target = useActiveStore()
      target.setActive(val)
      expect(target.getActive).toBe(0);
    });
});
