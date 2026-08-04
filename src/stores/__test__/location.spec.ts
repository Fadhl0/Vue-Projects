// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { KEY, useLocationStore } from "../loaction";
import { createPinia, setActivePinia } from "pinia";

describe('Location', () => {

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('inital value is Saudi/Makkah', () => {
    localStorage.removeItem(KEY);
    const target = useLocationStore();
    expect(target.getLocationName).toBe("Saudi Arabia / Makkah");
    expect(target.getLatLon[0]).toBe('21.66980630');
    expect(target.getLatLon[1]).toBe('41.49960290');
  });

  it.each([
    { lat: "91.0000", lon: "181.0000" },
    { lat: null, lon: null },
    { lat: "-90.0001", lon: "-180.0001" },
    { lat: "hello", lon: null },
    { lat: "invalid", lon: "12.345" },
    { lat: "Infinity", lon: "-Infinity" },
    { lat: " ", lon: "\t\n" },
    { lat: "", lon: "" },
  ])
    ('set invalid lan: $lat and lon: $lon', ({ lat, lon }) => {
      const target = useLocationStore();
      target.setLatLon(lat, lon);
      expect(target.getLocationName).toBe("Saudi Arabia / Makkah");
      expect(target.getLatLon[0]).toBe('21.66980630');
      expect(target.getLatLon[1]).toBe('41.49960290');
    });

  it.each([
    { lat: "89.9", lon: "1" },
    { lat: "0", lon: "-0" },
    { lat: "-32", lon: "43" },
    { lat: "23", lon: "54" },
    { lat: "12.34.56", lon: "100..00" },
  ])
    ('set valid lan: $lat and lon: $lon', ({ lat, lon }) => {
      const target = useLocationStore();
      target.setLatLon(lat, lon);
      expect(target.getLatLon[0]).toBe(lat);
      expect(target.getLatLon[1]).toBe(lon);
    });

});
