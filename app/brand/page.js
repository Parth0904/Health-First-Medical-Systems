import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { createBrandSlug } from "@/lib/createBrandSlug";
import PageHero from "../components/Pagehero";
import BrandCard from "../components/BrandCard";

export const metadata = {
  title: "All Brands | Health First Medical Systems",
  description:
    "Browse medical equipment and systems organized by manufacturer brand names.",
};

export default async function BrandIndexPage() {
  const products = await getProducts();

  // Dynamically group all products to count and compile brands
  const uniqueBrandsMap = {};
  products.forEach((p) => {
    if (
      p.Manufacturer &&
      p.Manufacturer.trim() !== "" &&
      p.Manufacturer.toUpperCase() !== "N/A" &&
      p.Manufacturer !== "-"
    ) {
      if (!uniqueBrandsMap[p.Manufacturer]) {
        uniqueBrandsMap[p.Manufacturer] = {
          name: p.Manufacturer,
          slug: createBrandSlug(p.Manufacturer),
          count: 0,
        };
      }
      uniqueBrandsMap[p.Manufacturer].count += 1;
    }
  });

  const brands = Object.values(uniqueBrandsMap)
    .filter((brand) => brand.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="bg-slate-50/50 min-h-screen py-20 px-6 mt-4">
      <div className="max-w-7xl mx-auto">
        <PageHero
          badge="Manufacturer Partners"
          title="Clinical Equipment Brands"
          description="Explore high-quality healthcare devices and engineering systems organized by leading brand manufacturers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {brands.map((brand, idx) => (
            <BrandCard key={idx} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
