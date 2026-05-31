"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, Filter } from "lucide-react";
import { createSlug } from "@/lib/createSlug";
import Link from "next/link";
import PageHero from "../components/Pagehero";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const searchInputRef = useRef(null);
  const productsGridRef = useRef(null);

  function ProductSkeleton() {
  return (
    <div className="
      relative
      flex flex-col lg:flex-row
      gap-8
      max-w-[1400px]
      mx-auto
      animate-pulse
    ">
      <div className="w-full lg:w-[280px] bg-white rounded-3xl p-6 border">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
      </div>

      <div className="flex-1">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border p-4"
            >
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
  /* FILTER LOGIC                                */
  /* -------------------------------------------------------------------------- */

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.Category === selectedCategory;

    const q = searchQuery.toLowerCase();

    const matchesSearch =
      !q ||
      p.Name?.toLowerCase().includes(q) ||
      p.Category?.toLowerCase().includes(q) ||
      p.Manufacturer?.toLowerCase().includes(q) ||
      p["Model Number"]?.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  /* -------------------------------------------------------------------------- */
  /* SCROLL TO SECTION                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    setSearchQuery("");

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

    return () =>
      document.removeEventListener("keydown", handleKeyDown);
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
      className="
        relative min-h-screen
        bg-[#f5f9ff]
        py-20
        px-6 md:px-12 lg:px-20
        mt-4
      "
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
  <div
    className="
      relative
      flex flex-col lg:flex-row
      gap-8
      max-w-[1400px]
      mx-auto
    "
  >

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
                  className="
                    fixed inset-0
                    bg-slate-900/60
                    backdrop-blur-sm
                    z-40 lg:hidden
                  "
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
                  className="
                    fixed top-0 left-0 bottom-0
                    w-[85%] max-w-[340px]

                    bg-white/95
                    backdrop-blur-2xl

                    border-r border-white/40

                    z-50
                    overflow-hidden
                    lg:hidden
                  "
                >
                  {/* HEADER */}

                  <div className="
                    sticky top-0 z-20

                    flex items-center justify-between

                    px-6 py-5

                    bg-white/95
                    backdrop-blur-xl

                    border-b border-gray-100
                  ">
                    <h3 className="
                      text-xl font-bold text-gray-900
                    ">
                      Categories
                    </h3>

                    <button
                      onClick={() =>
                        setIsMobileFilterOpen(false)
                      }
                      className="
                        w-10 h-10 rounded-full

                        bg-gray-100 hover:bg-gray-200

                        flex items-center justify-center

                        text-gray-600

                        transition-all duration-300
                      "
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* LIST */}

                  <div className="
                    overflow-y-auto
                    h-full
                    p-4
                  ">
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat}>
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsMobileFilterOpen(false);
                            }}
                            className={`
                              w-full

                              flex items-center justify-between

                              px-4 py-4
                              rounded-2xl

                              text-left text-sm font-medium

                              transition-all duration-300

                              ${selectedCategory === cat
                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                : "text-gray-600 hover:bg-gray-50"
                              }
                            `}
                          >
                            <span>{cat}</span>

                            {selectedCategory === cat && (
                              <Check
                                size={18}
                                className="text-blue-600"
                              />
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

          <aside className="
            hidden lg:block
            w-64 shrink-0
          ">
            <div className="
              sticky top-28

              bg-white

              rounded-3xl

              border border-blue-100/60

              shadow-[0_10px_40px_rgba(0,0,0,0.05)]

              overflow-hidden
            ">

              {/* SIDEBAR HEADER */}

              <div className="
                sticky top-0 z-20

                bg-white

                px-6 pt-6 pb-4

                border-b border-gray-100
              ">
                <h3 className="
                  text-lg font-bold text-gray-900
                ">
                  Categories
                </h3>
              </div>

              {/* CATEGORY LIST */}

              <div className="
                max-h-[calc(100vh-12rem)]
                overflow-y-auto
                p-4
              ">
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() =>
                          setSelectedCategory(cat)
                        }
                        className={`
                          w-full

                          flex items-center justify-between

                          px-4 py-3
                          rounded-2xl

                          text-sm

                          transition-all duration-300

                          ${selectedCategory === cat
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "text-gray-600 hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="
                          flex items-center justify-between
                          w-full
                        ">
                          <span className="font-medium">
                            {cat}
                          </span>

                          <span className="
                            text-[11px]
                            px-2 py-1
                            rounded-full

                            bg-gray-100

                            text-gray-500
                            font-semibold
                          ">
                            {
                              products.filter(
                                (p) =>
                                  cat === "All" ||
                                  p.Category === cat
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

          <div
            ref={productsGridRef}
            className="
              flex-1 flex flex-col
              min-w-0
            "
          >

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
              className="
                sticky top-16 z-30

                pt-4 pb-6

                bg-[#f5f9ff]/95
                backdrop-blur-xl
              "
            >
              <div className="
                rounded-[28px]

                border border-blue-100/60

                bg-white

                shadow-[0_12px_40px_rgba(37,99,235,0.08)]

                p-5
              ">

                {/* SEARCH ROW */}

                <div className="
                  flex items-center
                  gap-3
                ">

                  {/* MOBILE FILTER BTN */}

                  <button
                    onClick={() =>
                      setIsMobileFilterOpen(true)
                    }
                    className="
                      lg:hidden

                      w-16 h-16
                      rounded-2xl

                      bg-slate-900

                      text-white

                      flex items-center justify-center

                      shadow-lg

                      active:scale-95

                      transition-all duration-300

                      shrink-0
                    "
                  >
                    <Filter size={22} />
                  </button>

                  {/* SEARCH INPUT */}

                  <div className="
                    relative flex-1
                  ">
                    <div className="
                      absolute left-5 top-1/2
                      -translate-y-1/2

                      text-gray-400

                      pointer-events-none
                    ">
                      <Search size={22} />
                    </div>

                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products, brands, model numbers..."
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      className="
                        w-full h-16

                        pl-14 pr-12

                        rounded-2xl

                        bg-linear-to-b
                        from-white
                        to-blue-50/40

                        border border-blue-100

                        shadow-inner

                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-500/10

                        outline-none

                        text-gray-800
                        text-[15px]

                        placeholder:text-gray-400

                        transition-all duration-300
                      "
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
                          className="
                            absolute right-4 top-1/2
                            -translate-y-1/2

                            w-8 h-8 rounded-full

                            bg-gray-200 hover:bg-gray-300

                            flex items-center justify-center

                            text-gray-600

                            transition-all duration-300
                          "
                        >
                          <X size={15} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* ACTIVE FILTER */}

                {selectedCategory !== "All" && (
                  <div className="
                    mt-4
                    flex items-center gap-2
                  ">
                    <div className="
                      inline-flex items-center gap-2

                      px-4 py-2
                      rounded-full

                      bg-linear-to-r
                      from-blue-600
                      to-cyan-500

                      text-white
                      text-sm font-semibold

                      shadow-lg
                      shadow-blue-500/20
                    ">
                      {selectedCategory}

                      <button
                        onClick={() =>
                          setSelectedCategory("All")
                        }
                        className="
                          w-5 h-5 rounded-full

                          bg-white/20
                          hover:bg-white/30

                          flex items-center justify-center

                          transition-all duration-200
                        "
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ----------------------------------------------------------- */}
            {/* PRODUCT GRID                       */}
            {/* ----------------------------------------------------------- */}

            <motion.div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >
              <AnimatePresence>

                {/* EMPTY STATE */}

                {filteredProducts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                      col-span-full

                      py-20

                      flex flex-col
                      items-center justify-center

                      text-center
                    "
                  >
                    <Search
                      size={48}
                      className="text-gray-300 mb-4"
                    />

                    <p className="
                      text-lg text-gray-500
                    ">
                      No products found matching
                      {" "}
                      "{searchQuery}"
                    </p>

                    <button
                      onClick={() =>
                        setSearchQuery("")
                      }
                      className="
                        mt-4

                        text-blue-600
                        font-medium

                        hover:underline
                      "
                    >
                      Clear search
                    </button>
                  </motion.div>
                )}

                {/* PRODUCTS */}

               {filteredProducts.map((prod, idx) => (
  <Link
    key={idx}
    href={`/products/${createSlug(prod.Name)}`}
  >
    <div
      className="
        group
        bg-white
        rounded-3xl
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        hover:border-blue-100
        transition-all duration-300
        p-4
        cursor-pointer
        flex flex-col
        h-full
      "
    >
      <div
        className="
          relative overflow-hidden
          rounded-2xl
          mb-4
          bg-gray-50
        "
      >
        <img
          src={prod["Image URL"]}
          alt={prod.Name}
          className="
            object-cover
            w-full
            h-[220px]
            group-hover:scale-105
            transition-transform duration-500
          "
        />

        <span
  className="
    absolute top-3 left-3
    bg-white/95
    px-3 py-1
    text-xs font-bold
    text-blue-700
    rounded-full
  "
>
  {prod.Category}
</span>
      </div>

      <h2 className="text-xs font-bold text-gray-400 uppercase mb-1">
        {prod.Manufacturer || "BRAND"}
      </h2>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {prod.Name}
      </h3>

      <p className="text-sm text-gray-500 line-clamp-2 grow">
        {prod.Description}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <span className="font-semibold text-blue-600">
          View Specifications →
        </span>
      </div>
    </div>
  </Link>
))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}