'use client';

import { FaSearch, FaHeart } from 'react-icons/fa';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  subject: string;
  onSubjectChange: (subject: string) => void;
  showFavorites: boolean;
  onShowFavoritesChange: (show: boolean) => void;
  isLoading?: boolean;
}

const SUBJECTS = [
  { value: '', label: 'All Subjects' },
  { value: 'fiction', label: 'Fiction' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'science_fiction', label: 'Science Fiction' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'biography', label: 'Biography' },
  { value: 'history', label: 'History' },
  { value: 'science', label: 'Science' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating' },
  { value: 'new', label: 'Newest' },
  { value: 'old', label: 'Oldest' },
];

export function SearchFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  subject,
  onSubjectChange,
  showFavorites,
  onShowFavoritesChange,
  isLoading,
}: SearchFiltersProps) {
  return (
    <div className="bg-app-card backdrop-blur-sm p-6 rounded-lg shadow-xl border border-app-card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-blue-accent" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-2 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary placeholder-blue-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 disabled:bg-app-tertiary"
          />
        </div>

        <select
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          disabled={isLoading}
          className="px-4 py-2 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 disabled:bg-app-tertiary"
        >
          {SUBJECTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          disabled={isLoading}
          className="px-4 py-2 bg-app-tertiary border border-app-secondary rounded-lg text-app-primary focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 disabled:bg-app-tertiary"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Sort by {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => onShowFavoritesChange(!showFavorites)}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 ${
            showFavorites
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-app-tertiary text-app-blue-secondary hover:bg-app-secondary border border-app-secondary'
          }`}
        >
          <FaHeart className={showFavorites ? 'text-white' : 'text-red-400'} />
          {showFavorites ? 'Show All' : 'Favorites'}
        </button>
      </div>
    </div>
  );
}