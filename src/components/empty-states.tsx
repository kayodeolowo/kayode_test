import {
  FaSearch,
  FaHeart,
  FaBook,
  FaExclamationTriangle,
} from "react-icons/fa";

interface EmptyStateProps {
  type: "no-results" | "no-favorites" | "no-search" | "error";
  query?: string;
  onClearFilters?: () => void;
  onTryAgain?: () => void;
}

export function EmptyState({
  type,
  query,
  onClearFilters,
  onTryAgain,
}: EmptyStateProps) {
  switch (type) {
    case "no-results":
      return (
        <div className="text-center py-16">
          <FaSearch className="mx-auto h-16 w-16 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No books found for &quot;{query}&quot;
          </h3>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any books matching your search. Try different
            keywords or check your spelling.
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-white mb-2">
                Try these suggestions:
              </h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Use different or more general keywords</li>
                <li>• Check your spelling</li>
                <li>• Try searching by author or title</li>
                <li>• Remove some filters to broaden your search</li>
              </ul>
            </div>
            {onClearFilters && (
              <button
                onClick={onClearFilters}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      );

    case "no-favorites":
      return (
        <div className="text-center py-16">
          <FaHeart className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No favorites yet
          </h3>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            Start building your personal library by clicking the heart icon on
            any book you&apos;d like to save for later.
          </p>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-200">
              💡 <strong>Tip:</strong> Your favorites are saved locally and will
              persist between sessions.
            </p>
          </div>
        </div>
      );

    case "no-search":
      return (
        <div className="text-center py-16">
          <FaBook className="mx-auto h-16 w-16 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Discover Amazing Books
          </h3>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            Search through millions of books to find your next great read. Try
            searching for a title, author, or genre.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-purple-700/50">
              <strong className="text-purple-300">
                Try &quot;fantasy;&quot;
              </strong>
              <p className="text-purple-200">Discover magical worlds</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-4 rounded-lg border border-blue-700/50">
              <strong className="text-blue-300">
                Try &quot;romance;&quot;
              </strong>
              <p className="text-blue-200">Find your next love story</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-green-700/50">
              <strong className="text-green-300">
                Try &quot;mystery;&quot;
              </strong>
              <p className="text-green-200">Solve thrilling puzzles</p>
            </div>
          </div>
        </div>
      );

    case "error":
      return (
        <div className="text-center py-16">
          <FaExclamationTriangle className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            We&apos;re having trouble loading books right now. Please check your
            internet connection and try again.
          </p>
          {onTryAgain && (
            <button
              onClick={onTryAgain}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              Try Again
            </button>
          )}
        </div>
      );

    default:
      return null;
  }
}
