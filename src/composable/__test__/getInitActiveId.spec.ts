// @vitest-environment happy-dom

import { getInitialActiveId, key } from "@/composable/getInitActiveId";
import { test, describe, expect, beforeEach } from "vitest";

describe("getInitialActiveId: filter the catogory on sidebar", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("return 0 when localStorage cleared", () => {
    expect(getInitialActiveId()).toBe(0);
  });

  test("return last number when localStorage's pattern is text-number", () => {
    localStorage.setItem(key, 'key-1');
    expect(getInitialActiveId()).toBe(1);
  });

  test("return 0 when localStorage's pattern is invalid pattern", () => {
    localStorage.setItem(key, 'key-2-text');
    expect(getInitialActiveId()).toBe(0);
    expect(getInitialActiveId()).not.toBe(2);
  });

  test("return 0 when localStorage has empty value", () => {
    localStorage.setItem(key, '');
    expect(getInitialActiveId()).toBe(0);
  });

  test.each([
    { theValue: 0, expected: 0 },
    { theValue: 1, expected: 1 },
    { theValue: 2, expected: 2 },
  ])("return $expected when localStorage is $theValue", ({ theValue, expected }) => {
    localStorage.setItem(key, `section_${theValue}`);
    expect(getInitialActiveId()).toBe(expected);
  });

  test.each([10, 9, 5])("return 0 when localStorage value is not within [0, 1, 2]", (theValue) => {
    localStorage.setItem(key, `section_${theValue}`);
    expect(getInitialActiveId()).toBe(0);
  });

});
