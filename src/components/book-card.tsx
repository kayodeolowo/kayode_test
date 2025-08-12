"use client";

import { Book } from "@/types";
import { getCoverImageUrl } from "@/lib/api";
import { useFavorites } from "@/hooks/use-favorites";
import { FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isBookFavorite = isFavorite(book.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book);
  };

  const bookId = book.id;

  return (
    <div className="group relative">
      <Link href={`/books/${bookId}`} className="block">
        <div className="relative bg-app-card backdrop-blur-sm rounded-3xl overflow-hidden border border-app-card shadow-xl hover:shadow-2xl hover:shadow-app-primary transition-all duration-500 hover:-translate-y-2">
          {/* Book Cover */}
          <div className="relative h-64 bg-gradient-to-br from-app-tertiary to-app-secondary">
            {book.imageLinks && getCoverImageUrl(book.imageLinks, "large") ? (
              <Image
                src={getCoverImageUrl(book.imageLinks, "large")}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={90}
                priority={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(
                    ".fallback-cover"
                  ) as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className="fallback-cover absolute inset-0 flex items-center justify-center bg-gradient-to-br from-app-tertiary via-blue-800 to-indigo-900"
              style={{
                display:
                  book.imageLinks && getCoverImageUrl(book.imageLinks, "large")
                    ? "none"
                    : "flex",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">📚</span>
                </div>
                <span className="text-app-blue-secondary text-sm font-medium">
                  No Cover
                </span>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              aria-label={
                isBookFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className="absolute top-4 right-4 p-2.5 rounded-full bg-app-card backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300 z-10 border border-app-secondary"
            >
              <div className="relative cursor-pointer">
                <FaHeart
                  className={`w-4 h-4 transition-all duration-300 ${
                    isBookFavorite
                      ? "text-red-500 scale-100 opacity-100"
                      : "text-red-500 scale-0 opacity-0"
                  }`}
                />
                <FaRegHeart
                  className={`w-4 h-4 absolute inset-0 transition-all duration-300 ${
                    isBookFavorite
                      ? "text-gray-400 scale-0 opacity-0"
                      : "text-app-secondary scale-100 opacity-100"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="font-bold truncate text-lg mb-3 line-clamp-2 text-app-primary leading-tight">
              {book.title}
            </h3>

            <div className="flex justify-between items-center pt-4 border-t border-app-tertiary">
              <div className="flex items-center gap-4 text-xs text-app-blue-secondary">
                {book.publishedDate && (
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span className="font-medium">
                      {book.publishedDate.split("-")[0]}
                    </span>
                  </div>
                )}
                {book.language && (
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-md font-semibold uppercase border border-cyan-500/30">
                    {book.language}
                  </span>
                )}
              </div>

              {book.pageCount && (
                <span className="text-xs text-app-blue-accent font-medium">
                  {book.pageCount} pages
                </span>
              )}
            </div>
          </div>

          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
        </div>
      </Link>
    </div>
  );
}
