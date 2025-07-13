import { Country } from '@/types/country';
import Link from 'next/link';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.name.common}`}> 
      <div className="bg-white dark:bg-dark-blue rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden">
        <div className="relative h-48 md:h-56">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 space-y-2">
          <h3 className="text-xl font-extrabold text-very-dark-blue-text dark:text-white">
            {country.name.common}
          </h3>
          <p className="text-sm text-very-dark-blue-text dark:text-white">
            <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
          </p>
          <p className="text-sm text-very-dark-blue-text dark:text-white">
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p className="text-sm text-very-dark-blue-text dark:text-white">
            <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}