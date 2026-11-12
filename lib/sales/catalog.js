import { assignUniqueProductSlugs, createSlug } from "../createSlug.js";
import { isFieldEmpty } from "../isFieldEmpty.js";

export const CANONICAL_SITE_ORIGIN = "https://www.healthfirstmed.in";

/**
 * Build the canonical public product page URL from a product slug.
 */
export function buildProductUrlFromSlug(slug) {
  return `${CANONICAL_SITE_ORIGIN}/products/${slug}`;
}

/**
 * Build the canonical public product page URL using the existing slug helper.
 */
export function buildProductUrl(productName) {
  const slug = createSlug(productName);
  return buildProductUrlFromSlug(slug);
}

/**
 * Normalize published products returned by getProducts() for the Sales Assistant UI.
 */
export function normalizeSalesCatalog(rawProducts = []) {
  if (!Array.isArray(rawProducts)) return [];

  const publishedProducts = rawProducts.filter(
    (item) =>
      item?.published === true &&
      typeof item?.Name === "string" &&
      item.Name.trim() !== "",
  );

  // Ensure unique slugs even if normalizeSalesCatalog is called on synthetic items without precomputed slugs.
  const needsSlugAssignment = publishedProducts.some(
    (item) => typeof item?.slug !== "string" || !item.slug.trim(),
  );
  const productsWithSlugs = needsSlugAssignment
    ? assignUniqueProductSlugs(publishedProducts)
    : publishedProducts;

  const seenIds = new Set();

  return productsWithSlugs.map((item, index) => {
    const name = item.Name.trim();
    const slug = item.slug.trim();
    const sheetId = typeof item.id === "string" ? item.id.trim() : "";

    let id = sheetId || slug || `product-${index}`;
    if (seenIds.has(id)) {
      id = `${id}-${index}`;
    }
    seenIds.add(id);

    const rawImageUrl =
      typeof item["Image URL"] === "string" ? item["Image URL"].trim() : "";
    const hasCustomImage =
      !isFieldEmpty(rawImageUrl) && rawImageUrl !== "/logo.webp";

    return {
      id,
      sheetId,
      name,
      slug,
      path: `/products/${slug}`,
      url: buildProductUrlFromSlug(slug),
      manufacturer: isFieldEmpty(item.Manufacturer)
        ? ""
        : item.Manufacturer.trim(),
      modelNumber: isFieldEmpty(item["Model Number"])
        ? ""
        : item["Model Number"].trim(),
      category: isFieldEmpty(item.Category) ? "" : item.Category.trim(),
      imageUrl: hasCustomImage ? rawImageUrl : "",
      imageAlt:
        typeof item["Image Alt"] === "string" && item["Image Alt"].trim()
          ? item["Image Alt"].trim()
          : name,
    };
  });
}

/**
 * Case-insensitive multi-token search across name, manufacturer, model number, and category.
 */
export function filterSalesProducts(products = [], query = "") {
  const trimmed = typeof query === "string" ? query.trim().toLowerCase() : "";
  if (!trimmed) return products;

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const manufacturer = product.manufacturer?.toLowerCase() || "";
    const modelNumber = product.modelNumber?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";

    return tokens.every(
      (token) =>
        name.includes(token) ||
        manufacturer.includes(token) ||
        modelNumber.includes(token) ||
        category.includes(token),
    );
  });
}
