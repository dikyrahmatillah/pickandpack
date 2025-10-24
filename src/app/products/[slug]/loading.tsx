export default function Loading() {
  return (
    <main className="px-2 sm:px-4 md:px-8 lg:px-28 py-8 pt-20 md:pt-25">
      <div className="text-xs sm:text-sm text-gray-400 mb-4">
        Home / <span className="sr-only">Loading product</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:max-w-[50%]">
          <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible w-full md:w-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-md shimmer`}
              />
            ))}
          </div>

          <div className="flex-1 aspect-square max-w-full rounded-[8%] overflow-hidden flex items-center justify-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] shimmer" />
        </div>

        <div className="flex-1 flex flex-col gap-y-1 mt-4 md:mt-0 mx-2">
          <div className="h-4 rounded w-40 mb-3 shimmer" />
          <div className="h-8 sm:h-10 rounded w-3/4 mb-4 shimmer" />

          <div className="h-3 rounded w-24 mb-2 shimmer" />
          <div className="h-4 rounded w-1/3 mb-4 shimmer" />

          <div className="h-3 rounded w-24 mb-2 shimmer" />
          <div className="h-4 rounded w-1/3 mb-4 shimmer" />

          <div className="h-3 rounded w-28 mb-2 shimmer" />
          <div className="h-24 rounded w-full mb-4 shimmer" />

          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 rounded-full w-40 shimmer" />
          </div>
        </div>
      </div>
    </main>
  );
}
