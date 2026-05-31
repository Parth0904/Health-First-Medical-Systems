import Link from "next/link";
import { notFound } from "next/navigation";
import { createSlug } from "@/lib/createSlug";
import { createCategorySlug } from "@/lib/createCategorySlug";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data.products || [];
}

export async function generateMetadata({
  params,
}) {
  const { slug } = await params;

  const products = await getProducts();

  const categoryProducts = products.filter(
    (p) =>
      createCategorySlug(p.Category) === slug
  );

  if (!categoryProducts.length) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryName =
    categoryProducts[0].Category;

  return {
    title: `${categoryName} | Health First Medical Systems`,
    description: `Browse ${categoryName} products and medical equipment.`,
  };
}

export default async function CategoryPage({
  params,
}) {
  const { slug } = await params;

  const products = await getProducts();

  const categoryProducts = products.filter(
    (p) =>
      createCategorySlug(p.Category) === slug
  );

  if (!categoryProducts.length) {
    notFound();
  }

  const categoryName =
    categoryProducts[0].Category;

  return (
    <section className="bg-[#f5f9ff] min-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <Link
          href="/products"
          className="
            inline-flex
            items-center
            gap-2
            text-blue-600
            font-medium
            mb-6
          "
        >
          ← Back to Products
        </Link>

        <h1
          className="
            text-5xl
            font-bold
            text-gray-900
          "
        >
          {categoryName}
        </h1>

        <p
          className="
            mt-4
            text-gray-600
            text-lg
          "
        >
          Explore all products under the
          {` ${categoryName} `}
          category.
        </p>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            mt-12
          "
        >
          {categoryProducts.map((product) => (
            <Link
              key={product.Name}
              href={`/products/${createSlug(product.Name)}`}
            >
              <div
                className="
                  bg-white
                  rounded-3xl
                  border border-gray-100
                  p-4
                  h-full
                  hover:shadow-lg
                  hover:border-blue-100
                  transition-all duration-300
                "
              >
                <img
                  src={product["Image URL"]}
                  alt={product.Name}
                  className="
                    w-full
                    h-[220px]
                    object-cover
                    rounded-2xl
                  "
                />

                <h3
                  className="
                    mt-4
                    text-lg
                    font-bold
                    text-gray-900
                  "
                >
                  {product.Name}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-500
                    line-clamp-2
                  "
                >
                  {product.Description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>

    </section>
  );
}