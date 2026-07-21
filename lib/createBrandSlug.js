export function createBrandSlug(manufacturer = "") {
  return manufacturer
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}
