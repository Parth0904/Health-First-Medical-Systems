"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">
        {/* ====================================================== */}
        {/* CTA SECTION */}
        {/* ====================================================== */}
        <div className="mb-16 pb-12 border-b border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Looking for the right
              <span className="block text-blue-500">Medical Solution?</span>
            </h2>

            <p className="mt-3 text-slate-400 max-w-2xl text-sm leading-relaxed">
              Browse our medical systems or contact us. Our team will help you
              identify the right equipment for your requirements.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* ====================================================== */}
        {/* MAIN FOOTER GRID (5 columns) */}
        {/* ====================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* COLUMN 1: BRAND INFORMATION */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-extrabold text-white">
              Health<span className="text-blue-500">First</span>
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs font-semibold">
              Delivering reliable medical systems, diagnostic equipment and
              healthcare technology solutions for hospitals, clinics and
              healthcare providers across India.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-sm bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Trusted Supplier
              </span>
              <span className="px-2.5 py-1 rounded-sm bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Certified Quality
              </span>
            </div>
          </div>

          {/* COLUMN 2: PRODUCTS */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-5">
              Products
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Categories Index
                </Link>
              </li>
              <li>
                <Link
                  href="/brand"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Brands Index
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: REACH US */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">
              Reach Us
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  Titwala East, Thane, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a
                  href="tel:+919920986401"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +91 99209 86401
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a
                  href="mailto:sales@healthfirstmed.in"
                  className="text-slate-400 hover:text-white transition-colors break-all"
                >
                  sales@healthfirstmed.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ====================================================== */}
        {/* BOTTOM BAR */}
        {/* ====================================================== */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Health First Medical Systems. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="font-semibold text-slate-600">
              B2B Distributor
            </span>
            <span className="font-semibold text-slate-600">
              IndiaMART Trust Seal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
