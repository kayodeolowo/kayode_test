'use client';

import { useEffect, useRef } from 'react';

export function useScrollRestoration(key: string) {
  const scrollPositions = useRef<Map<string, number>>(new Map());
  const currentPath = useRef<string>('');

  useEffect(() => {
    const saveScrollPosition = () => {
      if (currentPath.current) {
        scrollPositions.current.set(currentPath.current, window.scrollY);
      }
    };

    const handleBeforeUnload = () => {
      saveScrollPosition();
      // Store in sessionStorage for persistence across page reloads
      sessionStorage.setItem(`scroll-${key}`, JSON.stringify(Array.from(scrollPositions.current.entries())));
    };

    const handleScroll = () => {
      if (currentPath.current) {
        scrollPositions.current.set(currentPath.current, window.scrollY);
      }
    };

    // Restore scroll positions from sessionStorage on mount
    const stored = sessionStorage.getItem(`scroll-${key}`);
    if (stored) {
      try {
        const entries = JSON.parse(stored);
        scrollPositions.current = new Map(entries);
      } catch (error) {
        console.warn('Failed to restore scroll positions:', error);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [key]);

  const saveCurrentPosition = (path: string) => {
    currentPath.current = path;
    scrollPositions.current.set(path, window.scrollY);
  };

  const restorePosition = (path: string) => {
    currentPath.current = path;
    const position = scrollPositions.current.get(path);
    if (position !== undefined && position > 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: position, behavior: 'instant' });
      });
    }
  };

  return {
    saveCurrentPosition,
    restorePosition,
  };
}