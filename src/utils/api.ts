import { Country } from '@/types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export async function getAllCountries(): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/all?fields=name,flags,capital,region,population,cca3`);
  if (!response.ok) {
    const text = await response.text();
    console.error(`Error fetching all countries:`, text);
    throw new Error(`Failed to fetch countries`);
  }
  return response.json();
}

export async function getCountryByName(name: string): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/name/${name}?fields=name,flags,capital,region,subregion,tld,currencies,languages,borders,population,cca3`);
  if (!response.ok) {
    const text = await response.text();
    console.error(`Error fetching country by name:`, text);
    throw new Error(`Failed to fetch country`);
  }
  return response.json();
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/region/${region}?fields=name,flags,capital,region,population,cca3`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries by region');
  }
  return response.json();
}

export async function getCountryByCodes(codes: string[]): Promise<Country[]> {
  const codeString = codes.join(',');
  const response = await fetch(`${BASE_URL}/alpha?codes=${codeString}&fields=name,cca3`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries by codes');
  }
  return response.json();
}