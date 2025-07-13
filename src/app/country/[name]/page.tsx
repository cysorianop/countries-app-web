import { Country } from "@/types/country";
import { getCountryByName, getCountryByCodes } from "@/utils/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        console.error("Failed to fetch border countries:", err);
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
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ");
  };

  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </Link>
      </div>

      {/* Country Detail */}
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(320px,500px)_1fr] lg:gap-24 items-start">
        {/* Flag */}
        <div className="w-full">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-auto max-h-[240px] md:max-h-[300px] object-cover rounded-md shadow-md"
          />
        </div>

        {/* Info */}
        <div className="space-y-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-very-dark-blue-text dark:text-white">
            {country.name.common}
          </h1>
          <div className="flex flex-col md:flex-row md:gap-20 gap-8">
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {getNativeName()}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.[0] || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {getCurrencies()}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {getLanguages()}
              </p>
            </div>
          </div>

          {/* Border Countries */}
          {borderCountries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-very-dark-blue-text dark:text-white">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((borderCountry) => (
                  <Link
                    key={borderCountry.cca3}
                    href={`/country/${borderCountry.name.common}`}
                    className="px-4 py-1.5 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded shadow-md hover:shadow-lg transition-all"
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
