import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { createCategorySlug } from "@/lib/createCategorySlug";
import PageHero from "../components/Pagehero";

export const metadata = {
  title: "All Categories | Health First Medical Systems",
  description:
    "Browse medical equipment and diagnostic systems by clinical categories.",
};

export default async function CategoryIndexPage() {
  const products = await getProducts();

  // Dynamically group all products to count and compile categories
  const uniqueCategoriesMap = {};
  products.forEach((p) => {
    if (!uniqueCategoriesMap[p.Category]) {
      uniqueCategoriesMap[p.Category] = {
        name: p.Category,
        slug: createCategorySlug(p.Category),
        count: 0,
      };
    }
    uniqueCategoriesMap[p.Category].count += 1;
  });

  const categories = Object.values(uniqueCategoriesMap)
    .filter((cat) => cat.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="bg-slate-50/50 min-h-screen py-20 px-6 mt-4">
      <div className="max-w-7xl mx-auto">
        <PageHero
          badge="Product Segments"
          title="Clinical Hardware Categories"
          description="Select any dynamic equipment group to view specialized solutions and request quotation pricing."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="group block p-6 bg-white border border-slate-200/80 rounded-xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:-translate-y-0.5 focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
              aria-label={`Browse products in ${cat.name} category. Contains ${cat.count} ${cat.count === 1 ? "product" : "products"}`}
            >
              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400">
                    {cat.count} {cat.count === 1 ? "Product" : "Products"}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs font-bold text-blue-600">
                  <span>Explore Category</span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
