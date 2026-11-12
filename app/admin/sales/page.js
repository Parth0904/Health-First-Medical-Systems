import { requireSalesSession } from "@/lib/auth/session";
import { getProducts } from "@/lib/getProducts";
import { normalizeSalesCatalog } from "@/lib/sales/catalog";
import SalesAssistantHeader from "./components/SalesAssistantHeader";
import SalesAssistantWorkspace from "./components/SalesAssistantWorkspace";

export const dynamic = "force-dynamic";

export default async function AdminSalesPage() {
  const session = await requireSalesSession();

  let products = [];
  let catalogError = "";

  try {
    const rawProducts = await getProducts();
    products = normalizeSalesCatalog(rawProducts);
  } catch {
    catalogError =
      "Unable to fetch the published product catalog right now. Please try again.";
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <SalesAssistantHeader
          session={{ name: session.name, email: session.email }}
        />
        <SalesAssistantWorkspace
          initialProducts={products}
          catalogError={catalogError}
        />
      </div>
    </main>
  );
}
