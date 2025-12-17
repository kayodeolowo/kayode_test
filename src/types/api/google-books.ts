import { BookImageLinks, IndustryIdentifier } from '../models/image';

export interface GoogleBooksVolumeInfo {
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

export interface BookAccessFormat {
  isAvailable: boolean;
  downloadLink?: string;
  acsTokenLink?: string;
}

export interface BookAccessInfo {
  country?: string;
  viewability?: string;
  embeddable?: boolean;
  publicDomain?: boolean;
  textToSpeechPermission?: string;
  epub?: BookAccessFormat;
  pdf?: BookAccessFormat;
  webReaderLink?: string;
  accessViewStatus?: string;
}

export interface GoogleBooksItem {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
  accessInfo?: BookAccessInfo;
}

export interface GoogleBooksSearchResponse {
  totalItems: number;
  items?: GoogleBooksItem[];
}