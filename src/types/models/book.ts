import { BookImageLinks, IndustryIdentifier } from './image';

export interface Book {
  id: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: BookImageLinks;
  industryIdentifiers?: IndustryIdentifier[];
  publisher?: string;
  language?: string;
}

export interface SearchResponse {
  totalItems: number;
  items: Array<{
    id: string;
    volumeInfo: Book;
  }>;
}

export interface BookDetail extends Book {
  // Google Books API provides all details in the same structure
}