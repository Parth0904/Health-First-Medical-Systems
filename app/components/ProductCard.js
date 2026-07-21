import Image from "next/image";
import Link from "next/link";
import { createSlug } from "@/lib/createSlug";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${createSlug(product.Name)}`}>
      <div className="group bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-600 transition-all duration-300 p-4 cursor-pointer flex flex-col h-full">
        <div className="relative overflow-hidden rounded-lg mb-4 bg-slate-50">
          <div className="relative w-full h-[220px] overflow-hidden rounded-lg">
            <Image
              src={product["Image URL"]}
              alt={product["Image Alt"] || product.Name || "Product Image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-blue-700 rounded-xs border border-blue-100 uppercase tracking-wider">
            {product.Category}
          </span>
        </div>

        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
          {product.Manufacturer || "BRAND"}
        </h2>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {product.Name}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 grow leading-relaxed">
          {product.Description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
          <span>View Specifications</span>
          <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
