import { Book } from '@/types';

const FAVORITES_KEY = 'book-favorites';

export function getFavorites(): Book[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
}

export function addToFavorites(book: Book): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);
  
  if (!isAlreadyFavorite) {
    const updatedFavorites = [...favorites, book];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  }
}

export function removeFromFavorites(bookId: string): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(fav => fav.id !== bookId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
}

export function isFavorite(bookId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === bookId);
}

export function toggleFavorite(book: Book): boolean {
  const isCurrentlyFavorite = isFavorite(book.id);
  
  if (isCurrentlyFavorite) {
    removeFromFavorites(book.id);
    return false;
  } else {
    addToFavorites(book);
    return true;
  }
}