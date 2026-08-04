import { it, describe, expect } from "vitest";
import { formater } from "../formater";

describe('formater', () => {
  it('should return array with 2 values + correct symbol (PM, AM)', () => {
    const date = new Date();
    date.setHours(0, 0);
    expect(formater(date)).toHaveLength(2);
    expect(formater(date)[1]).toBe("ص");

  });

  it.each([
    { val: [13, 5], expected: "01:05" },
    { val: [18, 50], expected: "06:50" },
    { val: [23, 59], expected: "11:59" },
    { val: [0, 0], expected: "12:00" },
    { val: [4, 30], expected: "04:30" },
  ])
    ("return $expected when time is $val in 24-style", ({ val, expected }) => {
      const date = new Date();
      const num = [val[0], val[1]] as [number, number]
      date.setHours(...num);
      expect(formater(date)[0]).toBe(expected);
    });

});
