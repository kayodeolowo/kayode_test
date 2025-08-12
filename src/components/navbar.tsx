'use client';

import { FaHeart, FaBook } from 'react-icons/fa';
import { useFavorites } from '@/hooks/use-favorites';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  showFavorites: boolean;
  onShowFavoritesChange: (show: boolean) => void;
}

export function Navbar({ showFavorites, onShowFavoritesChange }: NavbarProps) {
  const { favorites } = useFavorites();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 backdrop-blur-md border-b border-white/20 shadow-lg">
      {/* Colorful accent line */}
      <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            onClick={() => {
              // Reset to show all books when navigating home
              if (showFavorites) {
                onShowFavoritesChange(false);
              }
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300 group-hover:scale-110">
                <FaBook className="text-white text-lg" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white group-hover:text-cyan-100 transition-colors duration-300">
                BookVerse
              </span>
              <span className="text-xs text-blue-200 font-medium -mt-1">
                Discover Stories
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {/* Favorites Button - always show */}
            <button
                onClick={() => {
                  if (isHomePage) {
                    // On home page, toggle favorites view
                    onShowFavoritesChange(!showFavorites);
                  } else {
                    // On other pages, navigate to home with favorites enabled
                    onShowFavoritesChange(true);
                    window.location.href = '/?favorites=true';
                  }
                }}
                className={`relative cursor-pointer flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-300 font-medium backdrop-blur-sm border shadow-lg hover:shadow-xl ${
                  (isHomePage && showFavorites)
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400/50 hover:from-red-600 hover:to-pink-600'
                    : 'bg-white/15 hover:bg-white/25 text-white hover:text-pink-100 border-white/30 hover:border-pink-400/50'
                }`}
              >
                <div className="relative ">
                  <FaHeart className={`w-4 h-4  transition-all duration-300 ${
                    (isHomePage && showFavorites) ? 'text-white scale-110' : 'text-red-400'
                  }`} />
                  {/* Heart pulse animation when favorites are shown */}
                  {(isHomePage && showFavorites) && (
                    <div className="absolute inset-0">
                      <FaHeart className="w-4 h-4 text-white animate-ping opacity-75" />
                    </div>
                  )}
                </div>
                
                <span className="hidden sm:inline">
                  {isHomePage 
                    ? (showFavorites ? 'Show All Books' : 'My Favorites')
                    : 'My Favorites'
                  }
                </span>
                
                {/* Favorites count badge */}
                {favorites.length > 0 && (
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    (isHomePage && showFavorites) 
                      ? 'bg-white text-red-500' 
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  }`}>
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </div>
                )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </nav>
  );
}