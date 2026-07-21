"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandCard({ brand }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = `/brands/${brand.slug}.webp`;

  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="group block p-6 bg-white border border-slate-200/80 rounded-xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:-translate-y-0.5 focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
      aria-label={`Browse products from ${brand.name}. Contains ${brand.count} ${brand.count === 1 ? "product" : "products"}`}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        <div className="flex items-center space-x-4">
          {!imgError ? (
            <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 overflow-hidden shrink-0">
              <Image
                src={logoUrl}
                alt={`${brand.name} logo`}
                width={56}
                height={56}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50 flex items-center justify-center font-bold text-lg uppercase shrink-0">
              {brand.name.substring(0, 2)}
            </div>
          )}
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
              {brand.name}
            </h3>
            <p className="text-[11px] font-semibold text-slate-400">
              {brand.count} {brand.count === 1 ? "Product" : "Products"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs font-bold text-blue-600">
          <span>View Inventory</span>
          <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
