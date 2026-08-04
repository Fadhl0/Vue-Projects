// @vitest-environment happy-dom
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from "vitest";
import { getPrayTime } from "../adhanMethod";
import { KEY, useLocationStore } from '@/stores/loaction';

const numberOfItems: number = 6;

describe('adhan Method', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('return 5 times', () => {
    expect(getPrayTime()).toHaveLength(numberOfItems);
  });

  it('return object', () => {
    expect(getPrayTime()).toBeTypeOf("object");
  });

  it('if no lat & lon still output all date', () => {
    const store = useLocationStore();
    store.setLatLon("", "")
    expect(getPrayTime()).toBeTruthy();
  });

  it('if local storage cleared still output all date', () => {
    localStorage.setItem(KEY, "");
    expect(getPrayTime()).toBeTruthy();
    expect(getPrayTime()).toHaveLength(numberOfItems);
  });

});
