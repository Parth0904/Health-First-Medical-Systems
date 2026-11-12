"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 text-xs font-semibold text-slate-700 transition cursor-pointer disabled:cursor-not-allowed"
    >
      {isLoggingOut ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
}

