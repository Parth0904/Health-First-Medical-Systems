import { requireSalesSession } from "@/lib/auth/session";

export const metadata = {
  title: "Sales Assistant",
  description: "Internal sales assistant for Health First Medical Systems.",
  manifest: "/admin/sales/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/admin/sales/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/admin/sales/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/admin/sales/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "HF Sales",
    statusBarStyle: "default",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  themeColor: "#2563eb",
};

export const dynamic = "force-dynamic";

export default async function AdminSalesLayout({ children }) {
  await requireSalesSession();
  return <>{children}</>;
}
