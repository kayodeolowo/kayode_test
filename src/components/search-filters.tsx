"use client";

import { SORT_OPTIONS, SUBJECTS } from "@/json/data";
import { FaSearch, FaTimes, FaChevronDown, FaFilter, FaSortAmountDown } from "react-icons/fa";
import Dropdown from "./dropdown";

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
    <div className="bg-app-card backdrop-blur-sm p-6 rounded-lg shadow-xl border border-app-card mb-6 relative z-50">
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

        <Dropdown
          options={SUBJECTS}
          selectedValue={subject}
          onSelect={onSubjectChange}
          trigger={
            <div className="flex items-center justify-between w-full px-4 py-3 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary hover:border-cyan-400 transition-colors">
              <div className="flex items-center gap-2">
                <FaFilter className="text-cyan-400" />
                <span className="text-sm font-medium">
                  {SUBJECTS.find(s => s.value === subject)?.label || 'All Subjects'}
                </span>
              </div>
              <FaChevronDown className="text-app-blue-accent text-sm" />
            </div>
          }
          className="w-full"
        />

        <Dropdown
          options={SORT_OPTIONS.map(opt => ({ value: opt.value, label: `Sort by ${opt.label}` }))}
          selectedValue={sortBy}
          onSelect={onSortChange}
          trigger={
            <div className="flex items-center justify-between w-full px-4 py-3 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary hover:border-cyan-400 transition-colors">
              <div className="flex items-center gap-2">
                <FaSortAmountDown className="text-cyan-400" />
                <span className="text-sm font-medium">
                  {SORT_OPTIONS.find(s => s.value === sortBy)?.label ? `Sort by ${SORT_OPTIONS.find(s => s.value === sortBy)?.label}` : 'Sort by Relevance'}
                </span>
              </div>
              <FaChevronDown className="text-app-blue-accent text-sm" />
            </div>
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
