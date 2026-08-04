import { defineStore } from 'pinia'

export const KEY = 'VUE_DAILY_SALAH_LOCATION';

interface LocationStore {
  country: string,
  state: string,
  city: string,
  locationTarget: [string, string],
}

function initLoad(): LocationStore {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      const obj = JSON.parse(saved);
      if (isLocationStore(obj)) return obj;
    } catch (e) {
      console.error('Failed to parse location state from localStorage', e);
    }
  }
  return {
    country: 'Saudi Arabia',
    state: 'Makkah',
    city: '',
    locationTarget: ['21.66980630', '41.49960290'],
  };
}

export const useLocationStore = defineStore('location', {
  state: (): LocationStore => initLoad(),

  getters: {
    getLocationName: (state) => {
      return [state.country, state.state, state.city].filter(Boolean).join(' / ');
    },
    /**
     * const [lat, lon] = getLatLon();
     *
     */
    getLatLon: (state) => state.locationTarget,
  },

  actions: {
    saveLocalStorage() {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          country: this.country,
          state: this.state,
          city: this.city,
          locationTarget: this.locationTarget,
        })
      )
    },

    setCountry(route: string) {
      this.country = route;
      this.state = "";
      this.city = "";
      this.saveLocalStorage();
    },
    setState(route: string) {
      this.state = route;
      this.city = "";
      this.saveLocalStorage();
    },
    setCity(route: string) {
      this.city = route;
      this.saveLocalStorage();
    },

    setLatLon(lat: string | null, lon: string | null) {
      if (!lat || !lon) return;

      const latNum = Number.parseFloat(lat);
      const lonNum = Number.parseFloat(lon);
      if (Number.isNaN(latNum) || Number.isNaN(lonNum) || latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) return;

      this.locationTarget = [lat.trim(), lon.trim()];
      this.saveLocalStorage();
    },
  },
});

function isLocationStore(obj: LocationStore): obj is LocationStore {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.country === 'string' &&
    typeof obj.state === 'string' &&
    typeof obj.city === 'string' &&
    Array.isArray(obj.locationTarget) &&
    obj.locationTarget.length === 2 &&
    typeof obj.locationTarget[0] === 'string' &&
    typeof obj.locationTarget[1] === 'string'
  );
}
