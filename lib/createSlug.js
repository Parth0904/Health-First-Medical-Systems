import { isFieldEmpty } from "./isFieldEmpty.js";

export function createSlug(name = "") {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Assign deterministic, unique slugs to published products while preserving
 * the base createSlug(Name) URL for the first occurrence of each slug.
 */
export function assignUniqueProductSlugs(products = []) {
  const usedSlugs = new Set();

  return products.map((product, index) => {
    const baseSlug = createSlug(product?.Name || "") || `product-${index + 1}`;
    let candidate = baseSlug;

    if (usedSlugs.has(candidate)) {
      const modelPart = !isFieldEmpty(product?.["Model Number"])
        ? createSlug(product["Model Number"])
        : "";
      const idPart = !isFieldEmpty(product?.id)
        ? createSlug(product.id)
        : "";

      if (modelPart && !usedSlugs.has(`${baseSlug}-${modelPart}`)) {
        candidate = `${baseSlug}-${modelPart}`;
      } else if (idPart && !usedSlugs.has(`${baseSlug}-${idPart}`)) {
        candidate = `${baseSlug}-${idPart}`;
      } else {
        let suffix = 2;
        while (usedSlugs.has(`${baseSlug}-${suffix}`)) {
          suffix += 1;
        }
        candidate = `${baseSlug}-${suffix}`;
      }
    }

    usedSlugs.add(candidate);
    return {
      ...product,
      slug: candidate,
    };
  });
}
