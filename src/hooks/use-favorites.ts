import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/types';
import { getFavorites, toggleFavorite as toggleFavoriteUtil } from '@/lib/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshFavorites = useCallback(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites, refreshTrigger]);

  useEffect(() => {
    const handleStorageChange = () => {
      refreshFavorites();
    };

    const handleFavoriteChange = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorites-changed', handleFavoriteChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-changed', handleFavoriteChange);
    };
  }, [refreshFavorites]);

  const toggleFavorite = (book: Book) => {
    const newIsFavorite = toggleFavoriteUtil(book);
    refreshFavorites();
    
   
    window.dispatchEvent(new CustomEvent('favorites-changed'));
    
    return newIsFavorite;
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite: (bookId: string) => favorites.some(fav => fav.id === bookId),
    favoritesCount: favorites.length,
    refreshFavorites,
  };
}