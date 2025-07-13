import { Country } from "@/types/country";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.name.common}`}>
      <div className="bg-white dark:bg-dark-blue rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden">
        <div className="relative h-48">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-very-dark-blue-text dark:text-white mb-4">
            {country.name.common}
          </h3>
          <div className="space-y-1 text-sm text-very-dark-blue-text dark:text-white">
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
