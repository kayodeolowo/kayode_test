"use client";

import { useState, useRef, useEffect } from "react";
import { useBookDetail } from "@/hooks/use-books";
import { useFavorites } from "@/hooks/use-favorites";
import { getCoverImageUrl } from "@/lib/api";
import { BookDetailSkeleton } from "@/components/loading-skeleton";
import { Navbar } from "@/components/navbar";
import {
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaFilePdf,
  FaBook,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "@/components/footer";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { data: book, isLoading, error, refetch } = useBookDetail(bookId);
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
      const height = descriptionRef.current.scrollHeight;
      const lines = height / lineHeight;
      setIsDescriptionLong(lines > 4);
    }
  }, [book]);

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

const handleBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    // Fallback if user opened detail page directly
    router.push("/", { scroll: false });
  }
};

  if (error) {
    return (
      <div className=" bg-app-gradient">
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
          <button
            onClick={handleBack}
            className="inline-flex  cursor-pointer items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
          >
            <FaArrowLeft className="cursor-pointer text-xl" /> 
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Book not found
            </h2>
            <p className="text-blue-200 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  const isBookFavorite = isFavorite(book.id);
  const description = book.description || "No description available.";

  const handleFavoriteClick = () => {
    toggleFavorite(book);
  };

  return (
    <div className="  bg-app-primary relative min-h-screen">
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
        <p
          onClick={handleBack}
          className="inline-flex items-center cursor-pointer gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="text-xl" /> 
        </p>

        <div className="bg-app-card backdrop-blur-sm rounded-lg shadow-xl border border-app-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {book.imageLinks &&
                getCoverImageUrl(book.imageLinks, "large") ? (
                  <Image
                    src={getCoverImageUrl(book.imageLinks, "large")}
                    alt={book.title}
                    width={500}
                    height={750}
                    className="w-full h-auto rounded-lg shadow-lg"
                    quality={95}
                    priority={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-96 bg-slate-700 rounded-lg flex items-center justify-center"
                  style={{
                    display:
                      book.imageLinks &&
                      getCoverImageUrl(book.imageLinks, "large")
                        ? "none"
                        : "flex",
                  }}
                >
                  <span className="text-blue-200 text-lg">
                    No Cover Available
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {book.title}
                      </h1>

                      {book.authors && book.authors.length > 0 && (
                        <div className="flex items-center gap-2 text-xl text-blue-200">
                          <FaUser className="text-blue-400" />
                          <span>By {book.authors.join(", ")}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleFavoriteClick}
                      aria-pressed={isBookFavorite}
                      aria-label={
                        isBookFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      className="p-2 cursor-pointer rounded-full hover:bg-app-secondary/40 transition-colors duration-200"
                    >
                      {isBookFavorite ? (
                        <FaHeart className="w-6 h-6 text-red-500" />
                      ) : (
                        <FaRegHeart className="w-6 h-6 text-app-secondary" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                    {book.publishedDate && (
                      <div className="bg-blue-900/30 border border-blue-700/50 px-4 py-3 rounded-lg flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-400" />
                        <div>
                          <h1 className="font-medium text-blue-200">
                            Published
                          </h1>
                          <p className="text-blue-100">
                            {new Date(book.publishedDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                ...(book.publishedDate.includes("-") &&
                                  book.publishedDate.split("-").length > 2 && {
                                    day: "numeric",
                                  }),
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {book.pageCount && (
                      <div className="bg-green-900/30 border border-green-700/50 px-4 py-3 rounded-lg flex items-center gap-3">
                        <span className="text-green-400 font-bold">📖</span>
                        <div>
                          <p className="font-medium text-blue-200">Publisher</p>
                          <p className="text-blue-100">{book.publisher}</p>
                        </div>
                      </div>
                    )}

                    {book.pageCount && (
                      <div className="bg-green-900/30 border border-green-700/50 px-4 py-3 rounded-lg flex items-center gap-3">
                        <span className="text-green-400 font-bold">📖</span>
                        <div>
                          <span className="font-medium text-blue-200">
                            Pages
                          </span>
                          <p className="text-blue-100">{book.pageCount}</p>
                        </div>
                      </div>
                    )}

                    {book.language && (
                      <div className="bg-purple-900/30 border border-purple-700/50 px-4 py-3 rounded-lg flex items-center gap-3">
                        <span className="text-purple-400 font-bold">🌐</span>
                        <div>
                          <span className="font-medium text-blue-200">
                            Language
                          </span>
                          <p className="text-blue-100">
                            {book.language.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Categories */}
                  {book.categories && book.categories.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-white mb-3">
                        Categories
                      </h3>

                      <div className="flex items-center flex-wrap gap-2">
                        {(showAllCategories
                          ? book.categories
                          : book.categories.slice(0, 6)
                        ).map((category, index) => (
                          <span
                            key={`${category}-${index}`}
                            className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-2 rounded-full text-xs font-medium hover:bg-blue-500/30 transition-colors cursor-pointer max-w-[240px] truncate"
                            title={category}
                          >
                            {category.replace("Fiction / ", "")}
                          </span>
                        ))}

                        {book.categories.length > 6 && (
                          <button
                            type="button"
                            onClick={() => setShowAllCategories((v) => !v)}
                            className="text-blue-300 text-xs cursor-pointer px-3 py-2 rounded-full border border-transparent hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors"
                            aria-expanded={showAllCategories}
                            aria-controls="all-categories"
                          >
                            {showAllCategories
                              ? "Show less"
                              : `+${book.categories.length - 6} more`}
                          </button>
                        )}
                      </div>

                      {/* Hidden container to satisfy aria-controls if you want stricter a11y */}
                      <div id="all-categories" className="sr-only">
                        {book.categories.join(", ")}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Description
                    </h3>
                    <div
                      ref={descriptionRef}
                      className={`text-blue-100 leading-relaxed prose prose-sm max-w-none transition-all duration-300 ${
                        showFullDescription ? '' : 'line-clamp-4'
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: description
                          .replace(/<br\s*\/?>/gi, "<br/>")
                          .replace(/<b>/gi, "<strong>")
                          .replace(/<\/b>/gi, "</strong>")
                          .replace(/<i>/gi, "<em>")
                          .replace(/<\/i>/gi, "</em>"),
                      }}
                    />
                    {isDescriptionLong && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        {showFullDescription ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Download/Access Options */}
                  {book.accessInfo && (
                    (book.accessInfo.pdf?.isAvailable && (book.accessInfo.pdf.downloadLink || book.accessInfo.pdf.acsTokenLink)) ||
                    (book.accessInfo.epub?.isAvailable && (book.accessInfo.epub.downloadLink || book.accessInfo.epub.acsTokenLink)) ||
                    book.accessInfo.webReaderLink
                  ) && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-white mb-3">
                        Access Options
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {book.accessInfo.pdf?.isAvailable && (book.accessInfo.pdf.downloadLink || book.accessInfo.pdf.acsTokenLink) && (
                          <a
                            href={book.accessInfo.pdf.downloadLink || book.accessInfo.pdf.acsTokenLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                          >
                            <FaFilePdf className="text-lg" />
                            <span>PDF</span>
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                        
                        {book.accessInfo.epub?.isAvailable && (book.accessInfo.epub.downloadLink || book.accessInfo.epub.acsTokenLink) && (
                          <a
                            href={book.accessInfo.epub.downloadLink || book.accessInfo.epub.acsTokenLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                          >
                            <FaBook className="text-lg" />
                            <span>EPUB</span>
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                        
                        {!book.accessInfo.pdf?.isAvailable && !book.accessInfo.epub?.isAvailable && book.accessInfo.webReaderLink && (
                          <a
                            href={book.accessInfo.webReaderLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                          >
                            <FaBook className="text-lg" />
                            <span>Play Books</span>
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                      </div>
                      
                      {book.accessInfo.publicDomain && (
                        <p className="text-sm text-green-400 mt-3 flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                          This book is in the public domain
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
