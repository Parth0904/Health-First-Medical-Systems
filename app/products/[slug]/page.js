import Link from "next/link";
import { notFound } from "next/navigation";
import { createSlug } from "@/lib/createSlug";
import { createCategorySlug } from "@/lib/createCategorySlug";
import MobileContactBar from "@/app/components/MobileContactBar";
import ProductWhatsAppButton from "@/app/components/ProductWhatsAppButton";

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

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (p) => createSlug(p.Name) === slug
  );

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.Name} | Health First Medical Systems`,
    description:
      product.Description ||
      product.Name,
    openGraph: {
      title: product.Name,
      description: product.Description,
      images: [product["Image URL"]],
    },
  };
}

export default async function ProductPage({
  params,
}) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (p) => createSlug(p.Name) === slug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (p) =>
        p.Category === product.Category &&
        p.Name !== product.Name
    )
    .slice(0, 3);

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

       <nav className="text-sm text-gray-500 mb-8">
  <Link href="/">
    Home
  </Link>

  <span className="mx-2">/</span>

  <Link href="/products">
    Products
  </Link>

  <span className="mx-2">/</span>

  <Link
    href={`/category/${createCategorySlug(
      product.Category
    )}`}
  >
    {product.Category}
  </Link>

  <span className="mx-2">/</span>

  <span className="text-gray-800">
    {product.Name}
  </span>
</nav>

        <div className="grid lg:grid-cols-2 gap-12">

          <div>
            <img
              src={product["Image URL"]}
              alt={product.Name}
              className="
                w-full
                rounded-3xl
                bg-white
                border
                p-6
              "
            />
          </div>

          <div>

            <div
              className="
                inline-flex
                px-4 py-2
                rounded-full
                bg-blue-50
                text-blue-700
                font-semibold
              "
            >
              <Link
  href={`/category/${createCategorySlug(
    product.Category
  )}`}
  className="
    inline-flex
    px-4
    py-2
    rounded-full
    bg-blue-50
    text-blue-700
    font-semibold
  "
>
  {product.Category}
</Link>
            </div>

            <h1
              className="
                text-4xl
                font-bold
                mt-6
                text-gray-900
              "
            >
              {product.Name}
            </h1>

            {product.Manufacturer && (
              <p className="mt-4 text-gray-600">
                Manufacturer:{" "}
                <strong>
                  {product.Manufacturer}
                </strong>
              </p>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-semibold">
                Product Overview
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.Description}
              </p>
            </div>

            <ProductWhatsAppButton
              productName={product.Name}
              productUrl={`/products/${createSlug(product.Name)}`}
            />

          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24">

            <h2 className="text-3xl font-bold mb-8">
              Related Products
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.Name}
                  href={`/products/${createSlug(item.Name)}`}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    p-4
                    hover:shadow-lg
                    transition-all
                  "
                >
                  <img
                    src={item["Image URL"]}
                    alt={item.Name}
                    className="
                      w-full
                      h-48
                      object-cover
                      rounded-2xl
                    "
                  />

                  <h3 className="mt-4 font-semibold">
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
      <h3 className="font-semibold">
        Do you deliver across India?
      </h3>
      <p className="text-gray-600">
        Yes, products can be supplied across India.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Can I request a quotation?
      </h3>
      <p className="text-gray-600">
        Yes, contact us through WhatsApp for pricing and quotations.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Do you provide warranty support?
      </h3>
      <p className="text-gray-600">
        Warranty availability depends on the manufacturer and product model.
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
            __html: JSON.stringify({
              "@context":
                "https://schema.org",
              "@type": "Product",
              name: product.Name,
              description:
                product.Description,
              image:
                product["Image URL"],
              category:
                product.Category,
              manufacturer: {
                "@type":
                  "Organization",
                name:
                  product.Manufacturer,
              },
            }),
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
            text: "Yes, installation and setup assistance are available."
          }
        },
        {
          "@type": "Question",
          name: "Do you deliver across India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, products can be supplied across India."
          }
        },
        {
          "@type": "Question",
          name: "Can I request a quotation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, contact us through WhatsApp for pricing and quotations."
          }
        },
        {
          "@type": "Question",
          name: "Do you provide warranty support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Warranty availability depends on the manufacturer and product model."
          }
        }
      ]
    })
  }}
/>

      </div>
    </section>
  );
}