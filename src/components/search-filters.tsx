"use client";

import { SORT_OPTIONS, SUBJECTS } from "@/json/data";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  subject: string;
  onSubjectChange: (subject: string) => void;
  isLoading?: boolean;
  hasActiveFilters?: boolean; 
  onClearFilters?: () => void; 
}



export function SearchFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  subject,
  onSubjectChange,
  isLoading,
}: SearchFiltersProps) {
  return (
    <div className="bg-app-card backdrop-blur-sm p-6 rounded-lg shadow-xl border border-app-card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search with inline clear */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={isLoading}
            className="w-full pl-4 pr-2 py-[9px] bg-app-tertiary border border-app-secondary rounded-lg text-app-primary placeholder-blue-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 disabled:bg-app-tertiary"
            aria-label="Search books"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-app-blue-accent" />
          {searchQuery.trim() !== "" && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              disabled={isLoading}
              className="absolute left-[1px] top-1 text-lg bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer  items-center text-center rounded-full  -translate-y-1/2 p-1  hover:bg-app-secondary/40 text-red-500 disabled:opacity-50"
              aria-label="Clear search"
              title="Clear search"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Subject with inline clear */}
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            disabled={isLoading}
            className="w-full pr-9 px-4 py-3 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 disabled:bg-app-tertiary"
            aria-label="Filter by subject"
          >
            {SUBJECTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {subject && (
            <button
              type="button"
              onClick={() => onSubjectChange("")}
              disabled={isLoading}
              className="absolute left-[1px] top-1 text-lg bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer  items-center text-center rounded-full  -translate-y-1/2 p-1  hover:bg-app-secondary/40 text-red-500 disabled:opacity-50"
              aria-label="Clear subject filter"
              title="Clear subject"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Sort with inline clear (only when not default) */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            disabled={isLoading}
            className="w-full pr-9 px-4 py-3 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 disabled:bg-app-tertiary"
            aria-label="Sort results"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
          {sortBy !== "relevance" && (
            <button
              type="button"
              onClick={() => onSortChange("relevance")}
              disabled={isLoading}
              className="absolute left-[1px] top-1 text-lg bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer  items-center text-center rounded-full  -translate-y-1/2 p-1  hover:bg-app-secondary/40 text-red-500 disabled:opacity-50"
              aria-label="Reset sort"
              title="Reset sort"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
