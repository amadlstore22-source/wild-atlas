export default function NewsSectionSkeleton() {
  return (
    <section className="py-20 bg-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="h-3 w-28 bg-sand-dark/50 rounded animate-pulse mb-3" />
          <div className="h-7 w-64 bg-sand-dark/40 rounded animate-pulse mb-2" />
          <div className="h-4 w-80 bg-sand-dark/30 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[4px] bg-card border border-sand-deep overflow-hidden shadow-sm">
              <div className="h-48 bg-sand-dark/40 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-sand-dark/40 rounded animate-pulse" />
                <div className="h-5 w-full bg-sand-dark/40 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-sand-dark/30 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-sand-dark/20 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
