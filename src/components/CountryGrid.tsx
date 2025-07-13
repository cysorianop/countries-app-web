import { Country } from '@/types/country';
import CountryCard from './CountryCard';

interface CountryGridProps {
  countries: Country[];
}

export default function CountryGrid({ countries }: CountryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}