"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

export default function ProductThumbnail({ src, alt, sizeClass = "w-11 h-11" }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        aria-hidden="true"
        className={`${sizeClass} rounded-lg border border-slate-200 bg-slate-100 text-slate-400 flex items-center justify-center shrink-0`}
      >
        <Package className="w-4 h-4" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${sizeClass} rounded-lg border border-slate-200 bg-white overflow-hidden shrink-0`}
    >
      <Image
        src={src}
        alt={alt || "Product image"}
        fill
        sizes="48px"
        className="object-contain p-1"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

