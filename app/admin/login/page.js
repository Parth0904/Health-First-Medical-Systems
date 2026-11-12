import { redirect } from "next/navigation";
import { getSalesSession } from "@/lib/auth/session";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sales Assistant Login",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getSalesSession();
  if (session) {
    redirect("/admin/sales");
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <LoginForm />
    </main>
  );
}

