"use client";

import {
  Search,
  X,
  Package,
  Plus,
  Check,
  Trash2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import ProductThumbnail from "./ProductThumbnail";

function CatalogLoadingState() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading products"
      className="space-y-2.5 animate-pulse"
    >
      {[1, 2, 3, 4].map((row) => (
        <div
          key={row}
          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200/80 p-3"
        >
          <div className="w-11 h-11 rounded-lg bg-slate-200 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-2/3 bg-slate-200 rounded" />
            <div className="h-3 w-1/3 bg-slate-100 rounded" />
          </div>
          <div className="h-8 w-20 bg-slate-200 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function ProductMetaLine({ manufacturer, modelNumber, category }) {
  const parts = [];
  if (manufacturer) parts.push(manufacturer);
  if (modelNumber) parts.push(`Model: ${modelNumber}`);
  if (category) parts.push(category);

  if (parts.length === 0) return null;

  return (
    <p className="text-xs text-slate-500 truncate mt-0.5">
      {parts.join(" · ")}
    </p>
  );
}

export default function ProductSelectionCard({
  searchQuery,
  onSearchChange,
  catalogProducts = [],
  totalCatalogCount = 0,
  selectedProducts = [],
  isLoadingCatalog = false,
  catalogError = "",
  onRetryCatalog,
  onToggleProduct,
  onRemoveProduct,
  onClearSelected,
}) {
  const selectedIds = new Set(selectedProducts.map((item) => item.id));

  function handleSearchKeyDown(event) {
    if (event.key === "Escape" && searchQuery) {
      event.preventDefault();
      onSearchChange("");
    }
  }

  return (
    <section
      aria-labelledby="product-selection-heading"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2
            id="product-selection-heading"
            className="text-base font-bold text-slate-900"
          >
            Product Selection
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Search published products by name, manufacturer, model number, or
            category.
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
          {selectedProducts.length} selected
        </span>
      </div>

      {/* Selected Products Tray */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Selected Products
          </h3>
          {selectedProducts.length > 0 && onClearSelected && (
            <button
              type="button"
              onClick={onClearSelected}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all</span>
            </button>
          )}
        </div>

        {selectedProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 px-4 py-5 text-center">
            <p className="text-xs font-medium text-slate-600">
              No products selected yet.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Select one or more products below to attach their details and
              public links.
            </p>
          </div>
        ) : (
          <ul
            aria-label="Selected products"
            className="space-y-2.5"
          >
            {selectedProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50/50 p-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <ProductThumbnail
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    sizeClass="w-11 h-11"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {product.name}
                    </p>
                    <ProductMetaLine
                      manufacturer={product.manufacturer}
                      modelNumber={product.modelNumber}
                    />
                    <a
                      href={product.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 hover:text-blue-800 hover:underline break-all"
                    >
                      <span>{product.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveProduct?.(product.id)}
                  aria-label={`Remove ${product.name}`}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Catalog Search Input */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <label
            htmlFor="sales-product-search"
            className="block text-xs font-semibold text-slate-700"
          >
            Search Product Catalog
          </label>
          {totalCatalogCount > 0 && !catalogError && (
            <span className="text-[11px] font-medium text-slate-500">
              Showing {catalogProducts.length} of {totalCatalogCount}
            </span>
          )}
        </div>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            id="sales-product-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search by product name, brand, model number, or category..."
            aria-describedby="sales-product-search-help"
            className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear product search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p
          id="sales-product-search-help"
          className="mt-1.5 text-[11px] text-slate-500"
        >
          Press Escape to clear your search query.
        </p>
      </div>

      {/* Catalog Results / States */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Catalog Results
        </h3>

        {isLoadingCatalog ? (
          <CatalogLoadingState />
        ) : catalogError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50/70 p-6 text-center"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-red-900">
              Unable to load product catalog
            </p>
            <p className="text-xs text-red-700 max-w-md mx-auto mt-1">
              {catalogError}
            </p>
            {onRetryCatalog && (
              <button
                type="button"
                onClick={onRetryCatalog}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-xs font-semibold text-red-700 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        ) : totalCatalogCount === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <Package className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-slate-800">
              No published products available
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              No published products were returned from the catalog.
            </p>
          </div>
        ) : catalogProducts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 text-center">
            <p className="text-sm font-semibold text-slate-800">
              No matching products found
            </p>
            <p className="text-xs text-slate-500 mt-1">
              No published products matched &ldquo;{searchQuery.trim()}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="mt-4 inline-flex items-center px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul
            aria-label="Catalog search results"
            className="divide-y divide-slate-100 rounded-xl border border-slate-200 max-h-[460px] overflow-y-auto"
          >
            {catalogProducts.map((product) => {
              const isSelected = selectedIds.has(product.id);
              return (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 p-3.5 bg-white hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ProductThumbnail
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      sizeClass="w-11 h-11"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {product.name}
                      </p>
                      <ProductMetaLine
                        manufacturer={product.manufacturer}
                        modelNumber={product.modelNumber}
                        category={product.category}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleProduct?.(product)}
                    aria-pressed={isSelected}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition cursor-pointer ${
                      isSelected
                        ? "bg-blue-700 text-white hover:bg-blue-800"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select</span>
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
