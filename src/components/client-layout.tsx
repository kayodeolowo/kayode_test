'use client';

import { useState } from 'react';
import { Navbar } from './navbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <>
      <Navbar 
        showFavorites={showFavorites} 
        onShowFavoritesChange={setShowFavorites} 
      />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}