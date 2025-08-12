'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): number[] => {
  const pages: number[] = [];
  const maxVisible = 5; 

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  // Adjust if end goes beyond totalPages
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};


  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="group flex items-center cursor-pointer gap-2 px-4 py-3 text-sm font-medium text-app-blue-secondary bg-app-secondary border border-app-secondary rounded-lg hover:bg-app-tertiary hover:text-app-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-app-secondary transition-all duration-200"
        aria-label="Previous page"
      >
        <FaChevronLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {visiblePages.map((pageNumber) => {
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={isLoading}
              className={`
                relative px-3 py-2 cursor-pointer text-sm font-medium rounded-lg transition-all duration-200 min-w-[40px]
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transform scale-110'
                    : 'text-app-blue bg-app-card border border-app-secondary hover:bg-app-tertiary hover:border-app-tertiary'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-105 active:scale-95
              `}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-50"></div>
              )}
              <span className="relative z-10">{pageNumber}</span>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="group flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-app-blue-secondary bg-app-secondary border border-app-secondary rounded-lg hover:bg-app-tertiary hover:text-app-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-app-secondary transition-all duration-200"
        aria-label="Next page"
      >
        <FaChevronRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
