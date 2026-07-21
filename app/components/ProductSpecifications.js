import Link from "next/link";
import { isFieldEmpty } from "@/lib/isFieldEmpty";
import { createBrandSlug } from "@/lib/createBrandSlug";

export default function ProductSpecifications({ product }) {
  const specs = [
    { label: "Manufacturer", value: product.Manufacturer },
    { label: "Model Number", value: product["Model Number"] },
    { label: "Category", value: product.Category },
    { label: "Warranty", value: product.Warranty },
    { label: "Regulatory Approval", value: product["Regulatory Approval"] },
    { label: "Price", value: product.Price },
  ].filter((spec) => !isFieldEmpty(spec.value));

  if (specs.length === 0) return null;

  return (
    <section className="mt-16 bg-white rounded-xl border border-slate-200/80 p-8 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Specifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between items-baseline border-b border-slate-100 pb-3 text-sm"
          >
            <span className="text-slate-500 font-semibold">{spec.label}</span>
            <span className="hidden sm:inline grow border-b border-dotted border-slate-200 mx-4 self-center h-1" />
            <span className="text-slate-950 font-bold text-right max-w-[60%] sm:max-w-none break-words">
              {spec.label === "Manufacturer" ? (
                <Link
                  href={`/brand/${createBrandSlug(spec.value)}`}
                  className="text-blue-700 hover:text-blue-800 hover:underline transition duration-200"
                >
                  {spec.value}
                </Link>
              ) : (
                spec.value
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
