import { createSlug } from "@/lib/createSlug";
import { createCategorySlug } from "@/lib/createCategorySlug";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.products || [];
}

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  const products = await getProducts();

  const productUrls = products.map(
    (product) => ({
      url: `${baseUrl}/products/${createSlug(
        product.Name
      )}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const uniqueCategories = [
    ...new Set(
      products.map((p) => p.Category)
    ),
  ];

  const categoryUrls =
    uniqueCategories.map((category) => ({
      url: `${baseUrl}/category/${createCategorySlug(
        category
      )}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...categoryUrls,

    ...productUrls,
  ];
}