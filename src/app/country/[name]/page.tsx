import { Country } from '@/types/country';
import { getCountryByName, getCountryByCodes } from '@/utils/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CountryPageProps {
  params: {
    name: string;
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const countryName = decodeURIComponent(params.name);
  let country: Country;
  let borderCountries: Country[] = [];

  try {
    const countries = await getCountryByName(countryName);
    country = countries[0];
    
    if (!country) {
      notFound();
    }

    // Get border countries if they exist
    if (country.borders && country.borders.length > 0) {
      try {
        borderCountries = await getCountryByCodes(country.borders);
      } catch (err) {
        console.error('Failed to fetch border countries:', err);
      }
    }
  } catch (error) {
    notFound();
  }

  const getNativeName = () => {
    if (!country.name.nativeName) return country.name.common;
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0]?.common || country.name.common;
  };

  const getCurrencies = () => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map(currency => currency.name)
      .join(', ');
  };

  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <ArrowLeft size={20} />
        Back
      </Link>

      {/* Country Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Flag */}
        <div className="relative">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-very-dark-blue-text dark:text-white">
            {country.name.common}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Native Name:</span> {getNativeName()}
              </p>
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
              </p>
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Sub Region:</span> {country.subregion || 'N/A'}
              </p>
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Top Level Domain:</span> {country.tld?.[0] || 'N/A'}
              </p>
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Currencies:</span> {getCurrencies()}
              </p>
              <p className="text-very-dark-blue-text dark:text-white">
                <span className="font-semibold">Languages:</span> {getLanguages()}
              </p>
            </div>
          </div>

          {/* Border Countries */}
          {borderCountries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-very-dark-blue-text dark:text-white">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((borderCountry) => (
                  <Link
                    key={borderCountry.cca3}
                    href={`/country/${borderCountry.name.common}`}
                    className="px-4 py-1 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded shadow-md hover:shadow-lg transition-all"
                  >
                    {borderCountry.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}