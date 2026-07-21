export default function Loading() {
  return (
    <section className="bg-[#f5f9ff] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-8" />

        {/* Title */}
        <div className="h-12 w-80 bg-gray-200 rounded animate-pulse mb-4" />

        {/* Description */}
        <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mb-12" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border p-4 animate-pulse"
            >
              <div className="h-[220px] bg-gray-200 rounded-2xl" />

              <div className="h-6 bg-gray-200 rounded w-3/4 mt-4" />

              <div className="h-4 bg-gray-200 rounded mt-4" />

              <div className="h-4 bg-gray-200 rounded w-5/6 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
