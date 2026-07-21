"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import PageHero from "../components/Pagehero";

function ProductSkeleton() {
  return (
    <div className="relative flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto animate-pulse">
      <div className="w-full lg:w-[280px] bg-white rounded-3xl p-6 border">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
      </div>

      <div className="flex-1">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border p-4">
              <div className="h-[220px] bg-gray-200 rounded-2xl" />
              <div className="h-4 bg-gray-200 rounded mt-4" />
              <div className="h-4 bg-gray-200 rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const searchInputRef = useRef(null);
  const productsGridRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  /* FETCH                                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(({ products, categories }) => {
        setProducts(products);
        setCategories(categories);
      })
      .finally(() => setLoading(false));
  }, []);

  /* -------------------------------------------------------------------------- */
  /* FILTER LOGIC & WEIGHTED SEARCH             */
  /* -------------------------------------------------------------------------- */

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products.filter(
        (p) => selectedCategory === "All" || p.Category === selectedCategory,
      );
    }

    const queryWords = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" || p.Category === selectedCategory;
        if (!matchesCategory) return false;

        const fields = {
          name: p.Name?.toLowerCase() || "",
          model: p["Model Number"]?.toLowerCase() || "",
          manufacturer: p.Manufacturer?.toLowerCase() || "",
          category: p.Category?.toLowerCase() || "",
          description: p.Description?.toLowerCase() || "",
        };

        // Ensure every query word matches at least one field (Multi-word search / Partial matching)
        return queryWords.every((word) => {
          return (
            fields.name.includes(word) ||
            fields.model.includes(word) ||
            fields.manufacturer.includes(word) ||
            fields.category.includes(word) ||
            fields.description.includes(word)
          );
        });
      })
      .map((p) => {
        const fields = {
          name: p.Name?.toLowerCase() || "",
          model: p["Model Number"]?.toLowerCase() || "",
          manufacturer: p.Manufacturer?.toLowerCase() || "",
          category: p.Category?.toLowerCase() || "",
          description: p.Description?.toLowerCase() || "",
        };

        // Calculate relevance score
        let score = 0;
        queryWords.forEach((word) => {
          if (fields.name.includes(word)) score += 5;
          if (fields.model.includes(word)) score += 4;
          if (fields.manufacturer.includes(word)) score += 3;
          if (fields.category.includes(word)) score += 2;
          if (fields.description.includes(word)) score += 1;
        });

        return { product: p, score };
      })
      .sort(
        (a, b) =>
          b.score - a.score || a.product.Name.localeCompare(b.product.Name),
      )
      .map((item) => item.product);
  }, [products, searchQuery, selectedCategory]);

  /* -------------------------------------------------------------------------- */
  /* SCROLL TO SECTION                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    productsGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedCategory]);

  /* -------------------------------------------------------------------------- */
  /* CLOSE ON ESCAPE                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (isMobileFilterOpen) {
          setIsMobileFilterOpen(false);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileFilterOpen]);

  /* -------------------------------------------------------------------------- */
  /* LOCK BODY SCROLL                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileFilterOpen]);

  return (
    <section
      id="products"
      className="relative min-h-screen bg-[#f5f9ff] py-20 px-6 md:px-12 lg:px-20 mt-4"
    >
      {/* ------------------------------------------------------------------- */}
      {/* HEADING                               */}
      {/* ------------------------------------------------------------------- */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <PageHero
          badge="Our Products"
          title="Medical Systems & Diagnostic Equipment"
          description="Explore our range of certified medical systems designed to support accurate diagnostics and better patient care."
        />
      </motion.div>

      {/* ------------------------------------------------------------------- */}
      {/* LOADING                                */}
      {/* ------------------------------------------------------------------- */}

      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className="relative flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto">
          {/* =============================================================== */}
          {/* MOBILE FILTER DRAWER                      */}
          {/* =============================================================== */}

          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                {/* BACKDROP */}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                />

                {/* DRAWER */}

                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white border-r border-slate-200 z-50 overflow-hidden lg:hidden"
                >
                  {/* HEADER */}

                  <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-white/95 backdrop-blur-xl border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">
                      Categories
                    </h3>

                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-300"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* LIST */}

                  <div className="overflow-y-auto h-full p-4">
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat}>
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setSearchQuery("");
                              setIsMobileFilterOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-4 rounded-lg text-left text-sm font-medium transition-all duration-300 ${selectedCategory === cat ? "bg-blue-50 text-blue-700 border border-blue-100" : "text-gray-600 hover:bg-gray-50"}`}
                          >
                            <span>{cat}</span>

                            {selectedCategory === cat && (
                              <Check size={18} className="text-blue-600" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* =============================================================== */}
          {/* DESKTOP SIDEBAR                       */}
          {/* =============================================================== */}

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* SIDEBAR HEADER */}

              <div className="sticky top-0 z-20 bg-white px-6 pt-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Categories</h3>
              </div>

              {/* CATEGORY LIST */}

              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-4">
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${selectedCategory === cat ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{cat}</span>

                          <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold">
                            {
                              products.filter(
                                (p) => cat === "All" || p.Category === cat,
                              ).length
                            }
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* =============================================================== */}
          {/* RIGHT SIDE                            */}
          {/* =============================================================== */}

          <div ref={productsGridRef} className="flex-1 flex flex-col min-w-0">
            {/* ----------------------------------------------------------- */}
            {/* SEARCH BAR                         */}
            {/* ----------------------------------------------------------- */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="sticky top-16 z-30 pt-4 pb-6 bg-[#f5f9ff]/95 backdrop-blur-xl"
            >
              <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs p-4">
                {/* SEARCH ROW */}

                <div className="flex items-center gap-3">
                  {/* MOBILE FILTER BTN */}

                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden w-14 h-14 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300 shrink-0"
                  >
                    <Filter size={22} />
                  </button>

                  {/* SEARCH INPUT */}

                  <div className="relative flex-1">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Search size={22} />
                    </div>

                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products, brands, model numbers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 pl-14 pr-12 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 outline-none text-gray-800 text-sm placeholder:text-gray-400 transition-all duration-300"
                    />

                    {/* CLEAR BUTTON */}

                    <AnimatePresence>
                      {searchQuery && (
                        <motion.button
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          onClick={() => {
                            setSearchQuery("");

                            searchInputRef.current?.focus();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-all duration-300"
                        >
                          <X size={15} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* ACTIVE FILTER */}

                {selectedCategory !== "All" && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20">
                      {selectedCategory}

                      <button
                        onClick={() => {
                          setSelectedCategory("All");
                          setSearchQuery("");
                        }}
                        className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* SEARCH RESULTS COUNTER */}
            <div className="mb-6 px-2 text-xs font-semibold text-gray-400 tracking-wider uppercase">
              {searchQuery || selectedCategory !== "All" ? (
                <span>
                  Showing{" "}
                  <span className="text-blue-600 font-bold">
                    {filteredProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-gray-900 font-bold">
                    {products.length}
                  </span>{" "}
                  products
                </span>
              ) : (
                <span>
                  Showing{" "}
                  <span className="text-gray-900 font-bold">
                    {products.length}
                  </span>{" "}
                  products
                </span>
              )}
            </div>

            {/* ----------------------------------------------------------- */}
            {/* PRODUCT GRID                       */}
            {/* ----------------------------------------------------------- */}

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {/* EMPTY STATE */}

                {filteredProducts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-16 px-6 bg-white border border-gray-100/70 rounded-3xl shadow-xs flex flex-col items-center justify-center text-center max-w-md mx-auto mt-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100/50">
                      <Search size={28} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs mb-6">
                      Try searching by:
                    </p>

                    <ul className="text-xs text-left text-gray-500 space-y-2.5 bg-gray-50/60 border border-gray-100/50 px-6 py-4 rounded-2xl mb-8 w-full max-w-xs">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Product Name
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Model Number
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Manufacturer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Category
                      </li>
                    </ul>

                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-blue-600/10 active:scale-95 cursor-pointer"
                    >
                      Clear search
                    </button>
                  </motion.div>
                )}

                {/* PRODUCTS */}

                {filteredProducts.map((prod, idx) => (
                  <ProductCard key={idx} product={prod} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
