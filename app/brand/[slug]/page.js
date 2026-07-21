import Link from "next/link";
import { notFound } from "next/navigation";
import { createSlug } from "@/lib/createSlug";
import { createBrandSlug } from "@/lib/createBrandSlug";
import { getProducts } from "@/lib/getProducts";
import ProductCard from "@/app/components/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await getProducts();

  const brandProducts = products.filter(
    (p) => p.Manufacturer && createBrandSlug(p.Manufacturer) === slug,
  );

  if (!brandProducts.length) {
    return {
      title: "Brand Not Found",
    };
  }

  const brandName = brandProducts[0].Manufacturer;
  const titleText = `${brandName} Products | Health First Medical Systems`;
  const descText = `Browse certified medical devices and diagnostic solutions from ${brandName} available at Health First Medical Systems.`;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://healthfirstmed.in";
  const absoluteUrl = `${baseUrl}/brand/${slug}`;
  const ogImageUrl = `${baseUrl}/og-image.webp`;

  return {
    title: titleText,
    description: descText,
    alternates: {
      canonical: absoluteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: titleText,
      description: descText,
      url: absoluteUrl,
      images: [
        {
          url: ogImageUrl,
          alt: `${brandName} logo placeholder`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: [ogImageUrl],
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();

  const brandProducts = products
    .filter((p) => p.Manufacturer && createBrandSlug(p.Manufacturer) === slug)
    .sort((a, b) => a.Name.localeCompare(b.Name));

  if (!brandProducts.length) {
    notFound();
  }

  const brandName = brandProducts[0].Manufacturer;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://healthfirstmed.in";

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Brands",
        item: `${baseUrl}/brand`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/brand/${slug}`,
      },
    ],
  };

  return (
    <section className="bg-slate-50/50 min-h-screen py-20 px-6 mt-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 font-medium mb-6 hover:text-blue-700 transition duration-200"
        >
          ← Back to Products
        </Link>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">{brandName}</h1>
          <p className="text-gray-600 text-lg">
            Explore {brandProducts.length}{" "}
            {brandProducts.length === 1 ? "product" : "products"} from{" "}
            {brandName} available at Health First Medical Systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {brandProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbsSchema),
          }}
        />
      </div>
    </section>
  );
}
