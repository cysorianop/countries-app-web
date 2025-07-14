import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryGrid from '@/components/CountryGrid';
import { Country } from '@/types/country';

const mockCountries: Country[] = [
  {
    name: { common: 'Colombia', official: 'Republic of Colombia' },
    cca3: 'COL',
    region: 'Americas',
    population: 50000000,
    capital: ['Bogotá'],
    flags: { png: 'https://flagcdn.com/co.png', svg: '', alt: 'Colombia flag' },
  },
  {
    name: { common: 'Chile', official: 'Republic of Chile' },
    cca3: 'CHL',
    region: 'Americas',
    population: 19000000,
    capital: ['Santiago'],
    flags: { png: 'https://flagcdn.com/cl.png', svg: '', alt: 'Chile flag' },
  },
] as Country[];

test('renders the correct number of country cards', () => {
  render(<CountryGrid countries={mockCountries} />);
  const cards = screen.getAllByRole('link');
  expect(cards.length).toBe(2);
});