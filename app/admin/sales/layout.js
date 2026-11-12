import { requireSalesSession } from "@/lib/auth/session";

export const metadata = {
  title: "Sales Assistant",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminSalesLayout({ children }) {
  await requireSalesSession();
  return <>{children}</>;
}

