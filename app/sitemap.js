import { createSlug } from "@/lib/createSlug";
import { createCategorySlug } from "@/lib/createCategorySlug";
import { createBrandSlug } from "@/lib/createBrandSlug";
import { getProducts } from "@/lib/getProducts";
import { isFieldEmpty } from "@/lib/isFieldEmpty";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const products = await getProducts();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${createSlug(product.Name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const uniqueCategories = [...new Set(products.map((p) => p.Category))];

  const categoryUrls = uniqueCategories.map((category) => ({
    url: `${baseUrl}/category/${createCategorySlug(category)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const uniqueManufacturers = [
    ...new Set(
      products.map((p) => p.Manufacturer).filter((m) => !isFieldEmpty(m)),
    ),
  ];

  const brandUrls = uniqueManufacturers.map((manufacturer) => ({
    url: `${baseUrl}/brand/${createBrandSlug(manufacturer)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
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
    {
      url: `${baseUrl}/brand`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...categoryUrls,
    ...brandUrls,
    ...productUrls,
  ];
}
