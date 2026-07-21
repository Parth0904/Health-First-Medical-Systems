import Papa from "papaparse";

export async function getProducts() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSquIBj5dT4sJTc2h_a1spd8o_thibULUFy2MQfCWOEb1A90oYEk7Q60kxMorJj8VY4SRc5vZppTb1o/pub?output=csv",
    {
      next: { revalidate: 86400 }, // 24 hours (rare updates)
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const csv = await res.text();
  const parsed = Papa.parse(csv, {
    header: true,
    transformHeader: (h) => h.trim(),
  }).data;

  const products = parsed
    .filter((p) => p?.Name && p?.Category)
    .map((p) => {
      const published = p.Published?.trim().toLowerCase() === "true";
      const featured = p.Featured?.trim().toLowerCase() === "true";
      return {
        id: p.ID?.trim() || "",
        Name: p.Name?.trim(),
        Category: p.Category?.trim(),
        Manufacturer: p.Manufacturer?.trim(),
        "Model Number": p["Model Number"]?.trim(),
        Description: p.Description,
        Price: p.Price,
        Warranty: p.Warranty,
        "Regulatory Approval": p["Regulatory Approval"],
        "Image URL":
          p["Image URL"] &&
          p["Image URL"].trim() !== "" &&
          p["Image URL"].trim().toUpperCase() !== "N/A" &&
          p["Image URL"].trim() !== "-"
            ? p["Image URL"].trim()
            : "/logo.webp",
        "Image Alt": p["Image Alt"]?.trim() || "",
        featured,
        published,
      };
    })
    .filter((p) => p.published); // ONLY expose products where Published === true

  return products;
}
