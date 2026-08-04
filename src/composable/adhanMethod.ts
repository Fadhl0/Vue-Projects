import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  CalculationParameters,
} from 'adhan';
import { formater } from '@/composable/formater';
import { useCalcMethodStore } from '@/stores/CalculationMethod';
import { useLocationStore } from '@/stores/loaction';

const getCalcMethod: Record<string, () => CalculationParameters> = {
  "Muslim World League": CalculationMethod.MuslimWorldLeague,
  "Egyptian": CalculationMethod.Egyptian,
  "Karachi": CalculationMethod.Karachi,
  "Umm Al Qura": CalculationMethod.UmmAlQura,
  "Dubai": CalculationMethod.Dubai,
  "Moonsighting Committee": CalculationMethod.MoonsightingCommittee,
  "North America": CalculationMethod.NorthAmerica,
  "Kuwait": CalculationMethod.Kuwait,
  "Qatar": CalculationMethod.Qatar,
  "Singapore": CalculationMethod.Singapore,
  "Tehran": CalculationMethod.Tehran,
  "Turkey": CalculationMethod.Turkey,
  "Other": CalculationMethod.Other,
};

export function getPrayTime() {
  const location = useLocationStore().getLatLon;

  const lat = Number.parseFloat(location[0]);
  const lon = Number.parseFloat(location[1]);

  const method = useCalcMethodStore().getMethodName;
  const params = getCalculationMethod(method);

  const coordinates = new Coordinates(lat, lon);
  const prayerTimes = new PrayerTimes(coordinates, new Date(), params);

  const data = [
    formater(prayerTimes.fajr),
    formater(prayerTimes.sunrise),
    formater(prayerTimes.dhuhr),
    formater(prayerTimes.asr),
    formater(prayerTimes.maghrib),
    formater(prayerTimes.isha),
  ];

  return data;
}

function getCalculationMethod(method: string): CalculationParameters {
  const methodFn = getCalcMethod[method] ?? CalculationMethod.UmmAlQura;
  return methodFn();
}
