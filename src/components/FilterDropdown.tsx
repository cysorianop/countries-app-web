"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterDropdownProps {
  onFilterChange: (region: string) => void;
  currentFilter: string;
}

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function FilterDropdown({
  onFilterChange,
  currentFilter,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (region: string) => {
    onFilterChange(region);
    setIsOpen(false);
  };

  return (
    <div className="relative py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[200px] px-4 py-4 bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <span>
          {currentFilter === "All" ? "Filter by Region" : currentFilter}
        </span>
        <ChevronDown
          size={20}
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-blue rounded-lg shadow-lg z-10">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleSelect(region)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-very-dark-blue-text dark:text-white"
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
