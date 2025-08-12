export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
  sort?: 'relevance' | 'rating' | 'new' | 'old';
  subject?: string;
  author?: string;
  language?: string;
}