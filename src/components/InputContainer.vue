<template>
  <main>
    <div class="countries">
      <InputForm @select="setCountry" :disable="false" :placeholder="`اختر الدولة`" :options="countries" />
    </div>
    <div class="states">
      <InputForm @select="setState" ref="statesRef" :disable="!statesActive" :placeholder="`اختر الولاية`"
        :options="states" />
    </div>
    <div class="cities">
      <InputForm @select="setCity" ref="citiesRef" :disable="!citeisActive" :placeholder="`اختر المدينة`"
        :options="citeis" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue';
import InputForm, { type LocationInputExpose } from './InputForm.vue';
import type { ICity, ICountry, IState } from '@countrystatecity/countries-browser';
import { getAllCities, getAllCountries, getAllStates } from '@/composable/LocationAPI.ts';
import { useLocationStore } from '@/stores/loaction.ts';

const selectedCountry = ref<ICountry | null>(null);
const selectedState = ref<IState | null>(null);
const selectedCity = ref<ICity | null>(null);

const statesRef = ref<LocationInputExpose | null>(null);
const citiesRef = ref<LocationInputExpose | null>(null);

const statesActive = ref<boolean>(false);
const citeisActive = ref<boolean>(false);

const countries = ref<ICountry[]>([]);
const states = ref<IState[]>([]);
const citeis = ref<ICity[]>([]);

const routePath = useLocationStore();

onMounted(async () => {
  const initCountries = await getAllCountries();

  countries.value = initCountries.map((e) => {
    if (e.name === "Israel") {
      return {
        currency_name: "Israeli new shekel",
        currency_symbol: "₪",
        emoji: "🇵🇸",
        emojiU: "U+1F1F5 U+1F1F8",
        id: 106,
        iso2: "IL",
        iso3: "ISR",
        latitude: "31.50000000",
        longitude: "34.75000000",
        name: "Occupied Palestine",
        nationality: "Palestinian",
        native: "فلسطين",
        numeric_code: "376",
        phonecode: "972",
        region: "Asia",
        subregion: "Western Asia",
        tld: ".ps",
        capital: "Jerusalem",
        currency: "ILS"
      }
    }
    return e;
  });

});

async function setCountry(country: ICountry | null) {
  citeis.value = [];
  citeisActive.value = false;

  selectedState.value = null;
  selectedCity.value = null;

  statesRef.value?.resetInput();
  citiesRef.value?.resetInput();

  if (!country) return;

  const countryReturned = toRef(country)
  selectedCountry.value = countryReturned.value;
  statesActive.value = true;

  routePath.setCountry(countryReturned.value.name)
  routePath.setLatLon(countryReturned.value.latitude, countryReturned.value.longitude)

  states.value = await getAllStates(countryReturned.value.iso2)
}

async function setState(state: IState | null) {
  citeis.value = [];
  citeisActive.value = false;
  citiesRef.value?.resetInput();

  if (!state) return;

  const stateReturned = toRef(state)
  selectedState.value = stateReturned.value;
  citeisActive.value = true;
  routePath.setState(stateReturned.value.name)
  routePath.setLatLon(stateReturned.value.latitude, stateReturned.value.longitude)

  citeis.value = await getAllCities(stateReturned.value.country_code, stateReturned.value.iso2)
}

async function setCity(city: ICity | null) {
  if (!city) return;

  const cityReturned = toRef(city)
  selectedCity.value = cityReturned.value;
  routePath.setCity(cityReturned.value.name)
  routePath.setLatLon(cityReturned.value.latitude, cityReturned.value.longitude)
}
</script>

<style scoped>
@reference "../assets/main.css";

main {
  @apply flex flex-nowrap flex-col gap-4;
}
</style>
