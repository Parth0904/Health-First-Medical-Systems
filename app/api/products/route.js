import { getProducts } from "@/lib/getProducts";

export async function GET() {
  const products = await getProducts();

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.Category))).sort(),
  ];

  return Response.json({ products, categories });
}
