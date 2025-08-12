# BookVerse 📚

A modern, responsive book discovery application built with Next.js 15 and the Google Books API. Search, filter, and bookmark your favorite books with a clean, intuitive interface.

## Features

- **Smart Search**: Full-text search across millions of books via Google Books API
- **Advanced Filtering**: Filter by subject, and more
- **Favorites System**: Bookmark and save your favorite books locally
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **URL State Management**: Shareable URLs that preserve search state and filters
- **Infinite Scrolling**: Smooth pagination through search results
- **Performance Optimized**: React Query for efficient data caching and background refetching

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **State Management**: React Query (TanStack Query)
- **API**: Google Books API
- **Icons**: React Icons
- **Linting**: ESLint with Next.js config

## How to Run

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kayode_test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_BASE_URL=https://www.googleapis.com/books/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── books/[id]/        # Dynamic book detail pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page with search interface
├── components/            # Reusable React components
│   ├── book-card.tsx      # Individual book display
│   ├── navbar.tsx         # Navigation with favorites toggle
│   ├── pagination.tsx     # Pagination controls
│   └── search-filters.tsx # Search and filter interface
├── hooks/                 # Custom React hooks
│   ├── use-books.ts       # Book search and detail queries
│   ├── use-debounce.ts    # Input debouncing utility
│   ├── use-favorites.ts   # Local favorites management
│   └── use-url-state.ts   # URL state synchronization
├── lib/                   # Core utilities and API
│   ├── api.ts             # Google Books API client
│   ├── favorites.ts       # Favorites persistence logic
│   └── query-client.tsx   # React Query configuration
└── types/                 # TypeScript type definitions
    ├── models/            # Domain models (Book, Image)
    └── api/              # API response types
```

### Key Design Decisions & Trade-offs

#### 1. **State Management Architecture**
- **Decision**: URL-first state management with React Query for server state
- **Trade-offs**: 
  - ✅ Shareable URLs, browser back/forward support, SEO-friendly
  - ✅ Automatic caching and background refetching
  - ❌ Slightly more complex than pure client state
  - ❌ URL can become long with many filters

#### 2. **Data Fetching Strategy**
- **Decision**: React Query with stale-while-revalidate caching
- **Trade-offs**:
  - ✅ Excellent UX with instant cache responses
  - ✅ Automatic background updates and error handling
  - ✅ Request deduplication and cancellation
  - ❌ Additional bundle size (~13kb gzipped)

#### 3. **Google Books API Integration**
- **Decision**: Direct client-side API calls (no backend proxy)
- **Trade-offs**:
  - ✅ Simpler architecture, faster development
  - ✅ Leverages Google's CDN and caching
  - ❌ API rate limits apply per client
  - ❌ Potential CORS issues in some environments

#### 4. **Favorites Implementation**
- **Decision**: localStorage-based persistence
- **Trade-offs**:
  - ✅ Works offline, no authentication required
  - ✅ Fast access, no network requests
  - ❌ Not synced across devices
  - ❌ Limited to ~5-10MB storage
  - ❌ Data lost on browser data clearing

#### 5. **Styling Approach**
- **Decision**: Tailwind CSS with CSS custom properties
- **Trade-offs**:
  - ✅ Rapid development, consistent design system
  - ✅ Tree-shaking reduces final CSS size
  - ✅ CSS variables enable easy theming
  - ❌ Large initial learning curve
  - ❌ HTML can become verbose with utility classes

### Performance Optimizations

1. **Debounced Search**: 400ms debouncing prevents excessive API calls
2. **Request Cancellation**: Automatic AbortController usage for cleanup
3. **Image Optimization**: Next.js Image component with lazy loading
4. **Code Splitting**: Automatic route-based splitting via App Router
5. **Caching Strategy**: 5-minute stale time, 10-minute garbage collection

## API Integration

The app integrates with the Google Books API v1:

- **Search Endpoint**: `/volumes?q={query}&startIndex={offset}&maxResults={limit}`
- **Detail Endpoint**: `/volumes/{volumeId}`
- **Rate Limits**: 1000 requests per day (free tier)

### Search Parameters Supported:
- `q`: Full-text search query
- `subject`: Category filtering (e.g., `subject:fiction`)
- `inauthor`: Author filtering
- `langRestrict`: Language filtering
- `orderBy`: Sort by `relevance` or `newest`

## What I'd Ship Next

### High Priority
1. **User Authentication & Cloud Sync**
   - Firebase Auth integration for cross-device favorites sync
   - User profiles and reading history
   - **Why**: Most requested feature for persistent favorites

2. **Enhanced Book Details**
   - Reading progress tracking
   - User reviews and ratings
   - Similar books recommendations
   - **Why**: Increase user engagement and session duration

3. **Performance & Accessibility**
   - Implement infinite scroll for search results
   - Full keyboard navigation support
   - Screen reader optimizations
   - **Why**: Better UX for all users, SEO benefits

### Medium Priority
4. **Advanced Features**
   - Reading lists and collections
   - Book availability check (libraries, stores)
   - Social sharing capabilities
   - **Why**: Differentiate from other book apps

5. **Technical Improvements**
   - Add comprehensive test suite (Jest, React Testing Library)
   - Implement error boundary components
   - Add analytics and performance monitoring
   - **Why**: Production readiness and maintainability

### Future Considerations
6. **Backend Implementation**
   - Custom API for better caching and rate limiting
   - Database for user data and enhanced search
   - **Why**: Scale beyond API limitations, add custom features

The current implementation prioritizes rapid development and excellent UX while maintaining clean, scalable code architecture.