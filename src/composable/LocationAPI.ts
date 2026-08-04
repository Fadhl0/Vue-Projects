import { getCountries, getStatesOfCountry, getCitiesOfState } from '@countrystatecity/countries-browser';
import type { ICountry, IState, ICity } from '@countrystatecity/countries-browser';

export const getAllCountries = async (): Promise<ICountry[]> => {
  const countries: ICountry[] = await getCountries();
  return countries;
}

export const getAllStates = async (iso2: string): Promise<IState[]> => {
  const states = await getStatesOfCountry(iso2);
  return states;
}

export const getAllCities = async (iso1: string, iso2: string): Promise<ICity[]> => {
  const cities = await getCitiesOfState(iso1, iso2);
  return cities;
}
