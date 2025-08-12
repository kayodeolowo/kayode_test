
'use client';

import { useState, useEffect } from 'react';
import { useBookSearch } from '@/hooks/use-books';
import { useFavorites } from '@/hooks/use-favorites';
import { useDebounce } from '@/hooks/use-debounce';
import { useUrlState } from '@/hooks/use-url-state';
import { BookCard } from '@/components/book-card';
import { SearchFilters } from '@/components/search-filters';
import { BookGridSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/empty-states';
import { Pagination } from '@/components/pagination';


export default function Home() {
  const { getParam, updateUrl, getAllParams } = useUrlState();
  const { favorites } = useFavorites();
  
  // Initialize state from URL (source of truth)
  const [searchQuery, setSearchQuery] = useState(getParam('q') || '');
  const [sortBy, setSortBy] = useState(getParam('sort') || 'relevance');
  const [subject, setSubject] = useState(getParam('subject') || '');
  const [showFavorites, setShowFavorites] = useState(getParam('favorites') === 'true');
  const [currentPage, setCurrentPage] = useState(parseInt(getParam('page') || '1', 10));
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from URL on mount
  useEffect(() => {
    if (!isInitialized) {
      const urlParams = getAllParams();
      setSearchQuery(urlParams.q || '');
      setSortBy(urlParams.sort || 'relevance');
      setSubject(urlParams.subject || '');
      setShowFavorites(urlParams.favorites === 'true');
      setCurrentPage(parseInt(urlParams.page || '1', 10));
      setIsInitialized(true);
    }
  }, [getAllParams, isInitialized]);
  
  const debouncedQuery = useDebounce(searchQuery, 400);
  const effectiveQuery = debouncedQuery || 'popular books';

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useBookSearch({
    query: effectiveQuery,
    page: currentPage,
    limit: 20,
    sort: sortBy as 'relevance' | 'rating' | 'new' | 'old',
    subject: subject || undefined,
  });

  // Update URL when state changes (with debouncing for search)
  useEffect(() => {
    if (!isInitialized) return;
    
    // Use replace for search queries (to avoid cluttering history)
    const isSearchChange = searchQuery !== getParam('q');
    
    updateUrl({
      q: searchQuery || null,
      sort: sortBy !== 'relevance' ? sortBy : null,
      subject: subject || null,
      favorites: showFavorites ? 'true' : null,
      page: currentPage > 1 ? currentPage.toString() : null,
    }, { replace: isSearchChange });
  }, [searchQuery, sortBy, subject, showFavorites, currentPage, updateUrl, isInitialized, getParam]);

  const allBooks = data?.items?.map(item => item.volumeInfo) || [];
  const displayBooks = showFavorites ? favorites : allBooks;
  
  // Calculate pagination
  const totalBooks = data?.totalItems || 0;
  const booksPerPage = 20;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when search changes
  useEffect(() => {
    if (isInitialized) {
      setCurrentPage(1);
    }
  }, [debouncedQuery, sortBy, subject, showFavorites, isInitialized]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSortBy('relevance');
    setSubject('');
    setShowFavorites(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = sortBy !== 'relevance' || subject || showFavorites;
  const hasSearchQuery = debouncedQuery.trim() !== '' && debouncedQuery !== 'popular books';
  
  // Don't render anything until initialized (prevents hydration mismatch)
  if (!isInitialized) {
    return <div className="min-h-screen bg-app-primary" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-app-gradient">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-app-secondary" style={{
            backgroundImage: 'radial-gradient(circle, var(--pattern-dot) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        

        <div className="relative container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                BookVerse
              </h1>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xl text-app-blue font-medium max-w-2xl mx-auto leading-relaxed">
              Discover extraordinary stories, explore infinite worlds, and find your next literary adventure
            </p>
          </header>
          
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            subject={subject}
            onSubjectChange={setSubject}
            showFavorites={showFavorites}
            onShowFavoritesChange={setShowFavorites}
            isLoading={isLoading}
          />

          <EmptyState 
            type="error" 
            onTryAgain={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-gradient">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-app-secondary" style={{
          backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6">
              BookVerse
            </h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-app-blue font-medium max-w-2xl mx-auto leading-relaxed">
            Discover extraordinary stories, explore infinite worlds, and find your next literary adventure
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>
        </header>

        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          subject={subject}
          onSubjectChange={setSubject}
          showFavorites={showFavorites}
          onShowFavoritesChange={setShowFavorites}
          isLoading={isLoading}
        />

        {/* Empty States */}
        {showFavorites && favorites.length === 0 ? (
          <EmptyState type="no-favorites" />
        ) : displayBooks.length === 0 && !isLoading && !hasSearchQuery ? (
          <EmptyState type="no-search" />
        ) : displayBooks.length === 0 && !isLoading && hasSearchQuery ? (
          <EmptyState 
            type="no-results" 
            query={debouncedQuery}
            onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
          />
        ) : (
          <>
            <div className="mb-4 text-sm text-app-blue-secondary flex justify-between items-center">
              <span>
                {showFavorites ? (
                  `${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`
                ) : totalBooks > 0 ? (
                  <>
                    {`${totalBooks.toLocaleString()} books found`}
                    {totalPages > 1 && (
                      <span className="ml-2 text-gray-500">
                        (Page {currentPage} of {totalPages})
                      </span>
                    )}
                  </>
                ) : ''}
              </span>
              
              {hasActiveFilters && !showFavorites && (
                <button
                  onClick={handleClearFilters}
                  className="text-app-cyan-accent hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {displayBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {isLoading && <BookGridSkeleton count={8} />}

            {!showFavorites && !isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
