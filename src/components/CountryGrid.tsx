import { Country } from '@/types/country';
import CountryCard from './CountryCard';

interface CountryGridProps {
  countries: Country[];
}

export default function CountryGrid({ countries }: CountryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}