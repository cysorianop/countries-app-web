import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryCard from '@/components/CountryCard';
import { Country } from '@/types/country';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const mockCountry: Country = {
  name: { common: 'Colombia', official: 'Republic of Colombia' },
  cca3: 'COL',
  region: 'Americas',
  population: 50000000,
  capital: ['Bogotá'],
  flags: { png: 'https://flagcdn.com/co.png', svg: '', alt: 'Colombia flag' },
} as Country;

test('renders country card with name, region, capital', () => {
  render(<CountryCard country={mockCountry} />, {
    wrapper: MemoryRouterProvider,
  });

  expect(screen.getByText('Colombia')).toBeInTheDocument();
  expect(screen.getByText(/Americas/)).toBeInTheDocument();
  expect(screen.getByText(/Bogotá/)).toBeInTheDocument();
});