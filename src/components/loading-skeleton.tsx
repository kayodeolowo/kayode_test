export function BookCardSkeleton() {
  return (
    <div className="bg-app-card backdrop-blur-sm rounded-3xl overflow-hidden border border-app-card shadow-xl animate-pulse">
      <div className="w-full h-64 bg-app-tertiary"></div>
      <div className="p-6">
        <div className="h-6 bg-app-tertiary rounded mb-3"></div>
        <div className="h-4 bg-app-tertiary rounded mb-4 w-3/4"></div>
        <div className="flex justify-between items-center pt-4 border-t border-app-tertiary">
          <div className="h-4 bg-app-tertiary rounded w-20"></div>
          <div className="h-4 bg-app-tertiary rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function BookDetailSkeleton() {
  return (
    <div className="min-h-screen bg-app-gradient">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-app-secondary"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--pattern-dot) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-8 bg-app-tertiary rounded w-32 mb-6"></div>

          {/* Main content skeleton */}
          <div className="bg-app-card backdrop-blur-sm rounded-lg shadow-xl border border-app-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Book cover skeleton */}
              <div className="lg:col-span-1">
                <div className="w-full h-96 bg-app-tertiary rounded-lg"></div>
              </div>

              {/* Book details skeleton */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title and author */}
                <div>
                  <div className="h-8 bg-app-tertiary rounded mb-4"></div>
                  <div className="h-6 bg-app-tertiary rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-app-tertiary rounded mb-4 w-1/2"></div>
                </div>

                {/* Info cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-20 bg-app-tertiary rounded-lg"></div>
                  <div className="h-20 bg-app-tertiary rounded-lg"></div>
                  <div className="h-20 bg-app-tertiary rounded-lg"></div>
                  <div className="h-20 bg-app-tertiary rounded-lg"></div>
                </div>

                {/* Categories skeleton */}
                <div>
                  <div className="h-6 bg-app-tertiary rounded mb-3 w-32"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 bg-app-tertiary rounded-full w-24"></div>
                    <div className="h-8 bg-app-tertiary rounded-full w-20"></div>
                    <div className="h-8 bg-app-tertiary rounded-full w-28"></div>
                  </div>
                </div>

                {/* Description skeleton */}
                <div>
                  <div className="h-6 bg-app-tertiary rounded mb-3 w-32"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-app-tertiary rounded"></div>
                    <div className="h-4 bg-app-tertiary rounded"></div>
                    <div className="h-4 bg-app-tertiary rounded w-5/6"></div>
                    <div className="h-4 bg-app-tertiary rounded w-4/6"></div>
                    <div className="h-4 bg-app-tertiary rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchFiltersSkeleton() {
  return (
    <div className="bg-app-card backdrop-blur-sm p-6 rounded-lg shadow-xl border border-app-card mb-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-10 bg-app-tertiary rounded-lg"></div>
        <div className="h-10 bg-app-tertiary rounded-lg"></div>
        <div className="h-10 bg-app-tertiary rounded-lg"></div>
        <div className="h-10 bg-app-tertiary rounded-lg"></div>
      </div>
    </div>
  );
}
