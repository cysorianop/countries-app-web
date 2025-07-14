"use client";

import { useState, useEffect } from "react";
import { Country } from "@/types/country";
import { getAllCountries, getCountriesByRegion } from "@/utils/api";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import CountryGrid from "@/components/CountryGrid";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const data = await getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError("Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        country.region.toLowerCase().includes(query.toLowerCase()) ||
        country.capital?.[0]?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFilterChange = async (region: string) => {
    setCurrentFilter(region);
    setLoading(true);

    try {
      if (region === "All") {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } else {
        const data = await getCountriesByRegion(region);
        setCountries(data);
        setFilteredCountries(data);
      }
    } catch (err) {
      setError("Failed to filter countries");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
        <div className="w-full md:w-1/2">
          //Reutilizacion del componente Search bar
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-full md:w-auto">
          //Reutilizacion del componente Filter Dropdown
          <FilterDropdown
            onFilterChange={handleFilterChange}
            currentFilter={currentFilter}
          />
        </div>
      </div>

      {/* Results */}
      {filteredCountries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No countries found</p>
        </div>
      ) : (
        //Reutilizacion del componente Country Grid
        <CountryGrid countries={filteredCountries} />
      )}
    </div>
  );
}
