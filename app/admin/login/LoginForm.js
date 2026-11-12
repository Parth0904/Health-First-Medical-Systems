"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      setError("Please enter your username or email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: trimmedIdentifier,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error || "Unable to sign in. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.replace("/admin/sales");
      router.refresh();
    } catch {
      setError("Network error while signing in. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Sales Assistant Sign In
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorized Health First Medical Systems staff only
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-medium text-red-700"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="sales-identifier"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Username or Email
          </label>
          <input
            id="sales-identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            disabled={isSubmitting}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="sales@healthfirstmed.in"
            className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="sales-password"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="sales-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={isSubmitting}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-11 pl-3.5 pr-11 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition disabled:bg-slate-50 disabled:text-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 mt-2 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      <p className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-500 text-center">
        Internal access only. Contact an administrator to provision or disable
        sales credentials.
      </p>
    </div>
  );
}

