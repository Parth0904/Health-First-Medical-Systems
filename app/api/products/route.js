import Papa from "papaparse";

export async function GET() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSquIBj5dT4sJTc2h_a1spd8o_thibULUFy2MQfCWOEb1A90oYEk7Q60kxMorJj8VY4SRc5vZppTb1o/pub?output=csv",
    {
      next: { revalidate: 86400 }, // 24 hours (rare updates)
    }
  );

  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true }).data;

  const products = parsed
    .filter(p => p?.Name && p?.Category)
    .map(p => ({
      Name: p.Name?.trim(),
      Category: p.Category?.trim(),
      Manufacturer: p.Manufacturer?.trim(),
      "Model Number": p["Model Number"]?.trim(),
      Description: p.Description,
      Price: p.Price,
      Warranty: p.Warranty,
      "Regulatory Approval": p["Regulatory Approval"],
      "Image URL": p["Image URL"],
    }));

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map(p => p.Category))
    ).sort(),
  ];

  return Response.json({ products, categories });
}
