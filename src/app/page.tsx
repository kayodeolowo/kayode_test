"use client";

import { useState, useEffect, Suspense } from "react";
import { useBookSearch } from "@/hooks/use-books";
import { useFavorites } from "@/hooks/use-favorites";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlState } from "@/hooks/use-url-state";
import { BookCard } from "@/components/book-card";
import { SearchFilters } from "@/components/search-filters";
import { BookGridSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-states";
import { Pagination } from "@/components/pagination";
import { Navbar } from "@/components/navbar";

function HomeContent() {
  const { getParam, updateUrl, getAllParams } = useUrlState();
  const { favorites } = useFavorites();

  // Initialize state from URL (source of truth)
  const [searchQuery, setSearchQuery] = useState(getParam("q") || "");
  const [sortBy, setSortBy] = useState(getParam("sort") || "relevance");
  const [subject, setSubject] = useState(getParam("subject") || "");
  const [showFavorites, setShowFavorites] = useState(
    getParam("favorites") === "true"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(getParam("page") || "1", 10)
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from URL on mount
  useEffect(() => {
    if (!isInitialized) {
      const urlParams = getAllParams();
      setSearchQuery(urlParams.q || "");
      setSortBy(urlParams.sort || "relevance");
      setSubject(urlParams.subject || "");
      setShowFavorites(urlParams.favorites === "true");
      setCurrentPage(parseInt(urlParams.page || "1", 10));
      setIsInitialized(true);
    }
  }, [getAllParams, isInitialized]);

  const debouncedQuery = useDebounce(searchQuery, 400);
  const effectiveQuery = debouncedQuery || "popular books";

  const { data, isLoading, error, refetch } = useBookSearch({
    query: effectiveQuery,
    page: currentPage,
    limit: 20,
    sort: sortBy as "relevance" | "rating" | "new" | "old",
    subject: subject || undefined,
  });

  // Update URL when state changes (with debouncing for search)
  useEffect(() => {
    if (!isInitialized) return;

    // Use replace for search queries (to avoid cluttering history)
    const isSearchChange = searchQuery !== getParam("q");

    updateUrl(
      {
        q: searchQuery || null,
        sort: sortBy !== "relevance" ? sortBy : null,
        subject: subject || null,
        favorites: showFavorites ? "true" : null,
        page: currentPage > 1 ? currentPage.toString() : null,
      },
      { replace: isSearchChange }
    );
  }, [
    searchQuery,
    sortBy,
    subject,
    showFavorites,
    currentPage,
    updateUrl,
    isInitialized,
    getParam,
  ]);

  const allBooks = data?.items?.map((item) => item.volumeInfo) || [];
  const displayBooks = showFavorites ? favorites : allBooks;

  // Calculate pagination
  const totalBooks = data?.totalItems || 0;
  const booksPerPage = 20;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset page when search changes
  useEffect(() => {
    if (isInitialized) {
      setCurrentPage(1);
    }
  }, [debouncedQuery, sortBy, subject, showFavorites, isInitialized]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("relevance");
    setSubject("");
    setShowFavorites(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = sortBy !== "relevance" || subject || showFavorites;
  const hasSearchQuery =
    debouncedQuery.trim() !== "" && debouncedQuery !== "popular books";

  // Don't render anything until initialized (prevents hydration mismatch)
  if (!isInitialized) {
    return <div className=" bg-app-primary" />;
  }

  if (error) {
    return (
      <div className=" bg-app-gradient ">
        <Navbar
          showFavorites={showFavorites}
          onShowFavoritesChange={setShowFavorites}
        />

        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-20 top-16">
          <div
            className="absolute inset-0 bg-app-secondary"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--pattern-dot) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-8">
          {!showFavorites && (
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              subject={subject}
              onSubjectChange={setSubject}
              isLoading={isLoading}
              hasActiveFilters={!!hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          )}

          <EmptyState type="error" onTryAgain={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-app-primary relative min-h-screen ">
      <Navbar
        showFavorites={showFavorites}
        onShowFavoritesChange={setShowFavorites}
      />

      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-20 top-16">
        <div
          className="absolute inset-0 bg-app-secondary"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--pattern-dot) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {!showFavorites && (
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            subject={subject}
            onSubjectChange={setSubject}
            isLoading={isLoading}
            hasActiveFilters={!!hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        )}

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
            <div className="mb-4  flex items-center justify-center text-sm text-app-blue-secondary "></div>

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

// Loading fallback component for Suspense
function HomePageFallback() {
  return (
    <div className=" bg-app-primary">
      <div className="container mx-auto px-4 py-8">
        <BookGridSkeleton count={8} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomeContent />
    </Suspense>
  );
}