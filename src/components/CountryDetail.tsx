"use client";

import React from 'react';
import { useEffect, useState } from "react";
import { Country } from "@/types/country";
import { getCountryByName, getCountryByCodes } from "@/utils/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CountryDetail({ name }: { name: string }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCountryByName(name);
        const countryData = result[0];
        setCountry(countryData);

        if (countryData?.borders?.length) {
          const borders = await getCountryByCodes(countryData.borders);
          setBorderCountries(borders);
        }
      } catch (error) {
        console.error("Error loading country", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="text-center text-red-500 py-12">Country not found</div>
    );
  }

  const getNativeName = () => {
    if (!country.name.nativeName) return country.name.common;
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0]?.common || country.name.common;
  };

  const getCurrencies = () =>
    country.currencies
      ? Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")
      : "N/A";

  const getLanguages = () =>
    country.languages ? Object.values(country.languages).join(", ") : "N/A";

  return (
    <div className="space-y-10">
      <div className="py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </Link>
      </div>

      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(320px,500px)_1fr] lg:gap-24 items-start">
        <div className="w-full">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-auto max-h-[300px] object-cover rounded-md shadow-md"
          />
        </div>

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

          {borderCountries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-very-dark-blue-text dark:text-white">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    href={`/country/${b.name.common}`}
                    className="px-4 py-1.5 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded shadow-md hover:shadow-lg transition-all"
                  >
                    {b.name.common}
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
