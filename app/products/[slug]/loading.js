export default function Loading() {
  return (
    <section className="bg-[#f5f9ff] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12">

          <div className="h-[500px] bg-gray-200 rounded-3xl animate-pulse" />

          <div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6" />

            <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mb-6" />

            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="h-14 w-48 bg-gray-200 rounded-2xl animate-pulse" />
          </div>

        </div>

      </div>
    </section>
  );
}