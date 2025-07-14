import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryPage from '@/components/CountryDetail';

jest.mock('@/utils/api', () => ({
  getCountryByName: jest.fn().mockResolvedValue([
    {
      name: { common: 'Colombia', nativeName: { spa: { common: 'Colombia' } } },
      population: 50000000,
      region: 'Americas',
      subregion: 'South America',
      capital: ['Bogotá'],
      tld: ['.co'],
      currencies: { COP: { name: 'Colombian peso', symbol: '$' } },
      languages: { spa: 'Spanish' },
      flags: { png: 'https://flagcdn.com/co.png', alt: 'Flag of Colombia' },
      borders: [],
      cca3: 'COL',
    },
  ]),
  getCountryByCodes: jest.fn().mockResolvedValue([]),
}));

test('renders loading and country name', async () => {
  render(<CountryPage name="Colombia" />);
  const results = await screen.findAllByText('Colombia');
  expect(results.length).toBeGreaterThan(0);
});