import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createSlug } from "@/lib/createSlug";
import { createCategorySlug } from "@/lib/createCategorySlug";
import MobileContactBar from "@/app/components/MobileContactBar";
import ProductWhatsAppButton from "@/app/components/ProductWhatsAppButton";
import { getProducts } from "@/lib/getProducts";
import { isFieldEmpty } from "@/lib/isFieldEmpty";
import ProductSpecifications from "@/app/components/ProductSpecifications";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((p) => createSlug(p.Name) === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const manufacturerPart = !isFieldEmpty(product.Manufacturer)
    ? product.Manufacturer.trim()
    : "";
  const namePart = product.Name.trim();
  const categoryPart = !isFieldEmpty(product.Category)
    ? product.Category.trim()
    : "";

  let dynamicTitle = "";
  if (
    manufacturerPart &&
    !namePart.toLowerCase().includes(manufacturerPart.toLowerCase())
  ) {
    dynamicTitle += `${manufacturerPart} `;
  }
  dynamicTitle += namePart;
  if (
    categoryPart &&
    !namePart.toLowerCase().includes(categoryPart.toLowerCase())
  ) {
    dynamicTitle += ` ${categoryPart}`;
  }
  dynamicTitle += " | Health First Medical Systems";

  const descriptionPrefix = `${product.Name}${manufacturerPart ? ` manufactured by ${manufacturerPart}` : ""}${categoryPart ? ` under ${categoryPart}` : ""}. `;
  const baseDescription = product.Description || `Buy ${product.Name} online.`;
  const dynamicDescription =
    `${descriptionPrefix}${baseDescription}`.substring(0, 155).trim() + "...";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://healthfirstmed.in";
  const absoluteUrl = `${baseUrl}/products/${createSlug(product.Name)}`;
  const imageUrl = !isFieldEmpty(product["Image URL"])
    ? product["Image URL"]
    : `${baseUrl}/og-image.webp`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: {
      canonical: absoluteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      url: absoluteUrl,
      images: [
        {
          url: imageUrl,
          alt: product["Image Alt"] || product.Name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find((p) => createSlug(p.Name) === slug);

  if (!product) {
    notFound();
  }

  // Dynamic Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.Name,
  };

  if (!isFieldEmpty(product.Description)) {
    productSchema.description = product.Description;
  }
  if (!isFieldEmpty(product["Image URL"])) {
    productSchema.image = product["Image URL"];
  }
  if (!isFieldEmpty(product.Category)) {
    productSchema.category = product.Category;
  }
  if (!isFieldEmpty(product.Manufacturer)) {
    productSchema.manufacturer = {
      "@type": "Organization",
      name: product.Manufacturer,
    };
    productSchema.brand = {
      "@type": "Brand",
      name: product.Manufacturer,
    };
  }
  if (!isFieldEmpty(product["Model Number"])) {
    productSchema.model = product["Model Number"];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://healthfirstmed.in";
  const absoluteUrl = `${siteUrl}/products/${createSlug(product.Name)}`;
  productSchema.url = absoluteUrl;

  const rawPrice = product.Price;
  const numericPrice = rawPrice ? rawPrice.replace(/[^0-9]/g, "") : "";
  if (numericPrice && !isFieldEmpty(rawPrice)) {
    productSchema.offers = {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl,
      seller: {
        "@type": "Organization",
        name: "Health First Medical Systems",
        url: "https://healthfirstmed.in",
      },
    };
  }

  const relatedProducts = products
    .filter((p) => p.Category === product.Category && p.Name !== product.Name)
    .slice(0, 3);

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.Category,
        item: `${siteUrl}/category/${createCategorySlug(product.Category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.Name,
        item: absoluteUrl,
      },
    ],
  };

  return (
    <section className="bg-slate-50/50 min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 font-medium mb-6"
        >
          ← Back to Products
        </Link>

        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/">Home</Link>

          <span className="mx-2">/</span>

          <Link href="/products">Products</Link>

          <span className="mx-2">/</span>

          <Link href={`/category/${createCategorySlug(product.Category)}`}>
            {product.Category}
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-800">{product.Name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative w-full aspect-square md:aspect-auto md:h-[450px] overflow-hidden rounded-xl bg-white border border-slate-200/80 p-6">
            <Image
              src={product["Image URL"]}
              alt={product["Image Alt"] || product.Name || "Product Image"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
              priority={true}
            />
          </div>

          <div>
            <Link
              href={`/category/${createCategorySlug(product.Category)}`}
              className="inline-flex px-3 py-1.5 rounded-md bg-slate-100/80 hover:bg-slate-250/50 border border-slate-200/60 text-blue-700 text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              {product.Category}
            </Link>

            <h1 className="text-4xl font-bold mt-6 text-gray-900">
              {product.Name}
            </h1>

            {!isFieldEmpty(product.Description) && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  Product Overview
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {product.Description}
                </p>
              </div>
            )}

            <ProductWhatsAppButton
              productName={product.Name}
              productUrl={`/products/${createSlug(product.Name)}`}
            />
          </div>
        </div>

        <ProductSpecifications product={product} />

        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.Name}
                  href={`/products/${createSlug(item.Name)}`}
                  className="bg-white rounded-3xl border p-4 hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-48 overflow-hidden rounded-2xl">
                    <Image
                      src={item["Image URL"]}
                      alt={item["Image Alt"] || item.Name || "Product Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.Name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">
                Do you provide installation support?
              </h3>
              <p className="text-gray-600">
                Yes, installation and setup assistance are available.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Do you deliver across India?</h3>
              <p className="text-gray-600">
                Yes, products can be supplied across India.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Can I request a quotation?</h3>
              <p className="text-gray-600">
                Yes, contact us through WhatsApp for pricing and quotations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Do you provide warranty support?
              </h3>
              <p className="text-gray-600">
                Warranty availability depends on the manufacturer and product
                model.
              </p>
            </div>
          </div>
        </section>
        <MobileContactBar
          productName={product.Name}
          productUrl={`/products/${createSlug(product.Name)}`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do you provide installation support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, installation and setup assistance are available.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you deliver across India?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, products can be supplied across India.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I request a quotation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, contact us through WhatsApp for pricing and quotations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you provide warranty support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Warranty availability depends on the manufacturer and product model.",
                  },
                },
              ],
            }),
          }}
        />
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
