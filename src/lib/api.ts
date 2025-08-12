import { SearchResponse, BookDetail, SearchParams, GoogleBooksSearchResponse, GoogleBooksItem, BookImageLinks } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.googleapis.com/books/v1';

// Log the base URL being used (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('📚 BookVerse API Base URL:', BASE_URL);
}

export async function searchBooks(params: SearchParams, signal?: AbortSignal): Promise<SearchResponse> {
  const { query, page = 1, limit = 20, sort, subject, author, language } = params;
  
  let searchQuery = query;
  if (subject) searchQuery += `+subject:${subject}`;
  if (author) searchQuery += `+inauthor:${author}`;
  if (language) searchQuery += `+langRestrict:${language}`;

  const searchParams = new URLSearchParams({
    q: searchQuery,
    startIndex: ((page - 1) * limit).toString(),
    maxResults: Math.min(limit, 40).toString(), 
    printType: 'books',
  });

  if (sort && sort !== 'relevance') {
    searchParams.append('orderBy', sort === 'new' ? 'newest' : 'relevance');
  }

  const response = await fetch(`${BASE_URL}/volumes?${searchParams}`, { signal });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }

  const data: GoogleBooksSearchResponse = await response.json();
  

  return {
    totalItems: data.totalItems || 0,
    items: data.items?.map((item: GoogleBooksItem) => ({
      id: item.id,
      volumeInfo: {
        id: item.id,
        title: item.volumeInfo?.title || 'Untitled',
        authors: item.volumeInfo?.authors || [],
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        pageCount: item.volumeInfo?.pageCount,
        categories: item.volumeInfo?.categories || [],
        averageRating: item.volumeInfo?.averageRating,
        ratingsCount: item.volumeInfo?.ratingsCount,
        imageLinks: item.volumeInfo?.imageLinks,
        industryIdentifiers: item.volumeInfo?.industryIdentifiers || [],
        publisher: item.volumeInfo?.publisher,
        language: item.volumeInfo?.language,
      }
    })) || []
  };
}

export async function getBookDetail(id: string, signal?: AbortSignal): Promise<BookDetail> {
  const response = await fetch(`${BASE_URL}/volumes/${id}`, { signal });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch book detail: ${response.statusText}`);
  }

  const data: GoogleBooksItem = await response.json();
  
  return {
    id: data.id,
    title: data.volumeInfo?.title || 'Untitled',
    authors: data.volumeInfo?.authors || [],
    publishedDate: data.volumeInfo?.publishedDate,
    description: data.volumeInfo?.description,
    pageCount: data.volumeInfo?.pageCount,
    categories: data.volumeInfo?.categories || [],
    averageRating: data.volumeInfo?.averageRating,
    ratingsCount: data.volumeInfo?.ratingsCount,
    imageLinks: data.volumeInfo?.imageLinks,
    industryIdentifiers: data.volumeInfo?.industryIdentifiers || [],
    publisher: data.volumeInfo?.publisher,
    language: data.volumeInfo?.language,
  };
}

export function getCoverImageUrl(imageLinks?: BookImageLinks, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!imageLinks) return '';
  
  // Google Books provides different sizes - prioritize higher quality
  if (size === 'large') {
    return imageLinks.large || 
           imageLinks.medium || 
           imageLinks.thumbnail?.replace('&zoom=1', '&zoom=0') || 
           imageLinks.thumbnail || 
           imageLinks.smallThumbnail || '';
  }
  
  if (size === 'medium') {
    return imageLinks.medium || 
           imageLinks.thumbnail?.replace('&zoom=1', '&zoom=0') || 
           imageLinks.large || 
           imageLinks.thumbnail || 
           imageLinks.smallThumbnail || '';
  }
  
  // For small size, still prefer better quality
  return imageLinks.thumbnail?.replace('&zoom=1', '&zoom=0') || 
         imageLinks.medium || 
         imageLinks.thumbnail || 
         imageLinks.smallThumbnail || '';
}