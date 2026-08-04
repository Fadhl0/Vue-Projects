// @vitest-environment happy-dom
import { createPinia, setActivePinia } from "pinia";
import { it, describe, expect, beforeEach } from "vitest";
import { CalculationMethod } from 'adhan';
import { useCalcMethodStore, KEY } from "../CalculationMethod";

describe('Calculation Method', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('keys name must be correct', () => {
    const methodKeys = Object.keys(CalculationMethod);
    const target = useCalcMethodStore();
    const test = target.getMethodList().map((e) => e.name.replaceAll(" ", ""));
    expect(test).toHaveLength(methodKeys.length);
    expect(test.every((v, i) => v === methodKeys[i])).toBeTruthy();
  });

  it('default value is 3 when local storage is cleared or user does not specified', () => {
    localStorage.removeItem(KEY);
    const target = useCalcMethodStore();
    expect(target.getMethodName).toBe("Umm Al Qura");
  });

  it.each([
    { name: "Moonsighting Committee", id: 6 },
    { name: "Turkey", id: 12 },
    { name: "Other", id: 13 },
    { name: "Qatar", id: 9 },
  ])
    ('change method to $name', (e) => {
      const target = useCalcMethodStore();
      target.setMethod(e);
      expect(target.getMethodName).toBe(e.name);
    });

  it.each([
    { name: "gr werf", id: 242 },
    { name: "Turkey", id: 0 },
    { name: "44", id: 44 },
    { name: "Q at er", id: 8 },
  ])
    ('change method to $name (not valid method) return last value', (e) => {
      const target = useCalcMethodStore();
      const lastValue = target.getMethodName;
      target.setMethod(e);
      expect(target.getMethodName).toBe(lastValue);
    });
});
