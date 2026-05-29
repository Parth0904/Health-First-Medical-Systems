"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, Filter } from "lucide-react";
import PageHero from "../components/Pagehero";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const searchInputRef = useRef(null);
  const productsGridRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  /*                                   FETCH                                    */
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
  /*                                FILTER LOGIC                                */
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
  /*                              SCROLL TO SECTION                             */
  /* -------------------------------------------------------------------------- */

 useEffect(() => {
  setSearchQuery("");

  productsGridRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, [selectedCategory]);

  /* -------------------------------------------------------------------------- */
  /*                             CLOSE ON ESCAPE                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (selectedProduct) setSelectedProduct(null);

        if (isMobileFilterOpen) {
          setIsMobileFilterOpen(false);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct, isMobileFilterOpen]);

  /* -------------------------------------------------------------------------- */
  /*                              LOCK BODY SCROLL                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (selectedProduct || isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct, isMobileFilterOpen]);

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
      {/*                               HEADING                               */}
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
      {/*                              LOADING                                */}
      {/* ------------------------------------------------------------------- */}

      {loading ? (
        <div className="
          flex justify-center items-center
          min-h-[40vh]
        ">
          <div className="
            w-12 h-12
            border-4 border-blue-200
            border-t-blue-600
            rounded-full
            animate-spin
          " />
        </div>
      ) : (
        <div className="
          relative
          flex flex-col lg:flex-row
          gap-8
          max-w-[1400px]
          mx-auto
        ">

          {/* =============================================================== */}
          {/*                      MOBILE FILTER DRAWER                      */}
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
          {/*                          DESKTOP SIDEBAR                       */}
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
          {/*                           RIGHT SIDE                            */}
          {/* =============================================================== */}

          <div
  ref={productsGridRef}
  className="
    flex-1 flex flex-col
    min-w-0
  "
>

            {/* ----------------------------------------------------------- */}
            {/*                         SEARCH BAR                         */}
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
            {/*                         PRODUCT GRID                       */}
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
                  <motion.div
                    key={prod.Name + idx}
                    onClick={() =>
                      setSelectedProduct(prod)
                    }
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
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
                    "
                  >
                    {/* IMAGE */}

                    <div className="
                      relative overflow-hidden
                      rounded-2xl
                      mb-4

                      bg-gray-50
                    ">
                      <img
                        src={prod["Image URL"]}
                        alt={prod.Name}
                        className="
                          object-cover
                          w-full h-[220px]

                          group-hover:scale-105

                          transition-transform duration-500
                        "
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='16' font-family='sans-serif'%3EImage not found%3C/text%3E%3C/svg%3E";
                        }}
                      />

                      <span className="
                        absolute top-3 left-3

                        bg-white/95
                        backdrop-blur-sm

                        px-3 py-1

                        text-xs font-bold
                        text-blue-700

                        rounded-full

                        shadow-sm
                      ">
                        {prod.Category}
                      </span>
                    </div>

                    {/* CONTENT */}

                    <h2 className="
                      text-xs font-bold
                      text-gray-400

                      uppercase tracking-wider

                      mb-1
                    ">
                      {prod.Manufacturer || "BRAND"}
                    </h2>

                    <h3 className="
                      text-lg font-bold
                      text-gray-900

                      leading-tight

                      mb-2
                    ">
                      {prod.Name}
                    </h3>

                    <p className="
                      text-sm text-gray-500

                      line-clamp-2

                      mb-4 grow
                    ">
                      {prod.Description}
                    </p>

                    <div className="
                      mt-auto pt-4

                      border-t border-gray-100

                      flex items-center justify-between
                    ">
                      <span className="
                        font-semibold
                        text-blue-600

                        group-hover:text-blue-700
                      ">
                        View Details →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
      <AnimatePresence>
  {selectedProduct && (
    <>
      {/* BACKDROP */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProduct(null)}
        className="
          fixed inset-0
          bg-black/50
          backdrop-blur-sm
          z-100
        "
      />

      {/* MODAL */}

      <motion.div
       initial={{
  opacity: 0,
  y: 20,
}}
animate={{
  opacity: 1,
  y: 0,
}}
exit={{
  opacity: 0,
  y: 20,
}}
transition={{
  duration: 0.2,
}}
        className="
          fixed

          inset-x-4
          top-1/2

          -translate-y-1/2

          max-w-4xl
          mx-auto

          z-101
        "
      >
       <div
  className="
    bg-white

    rounded-4xl

    shadow-[0_25px_80px_rgba(0,0,0,0.18)]

    border border-blue-100/50

    overflow-hidden

    max-h-[90vh]
    overflow-y-auto
  "
>
  {/* CLOSE */}

  <button
    onClick={() => setSelectedProduct(null)}
    className="
      absolute
      top-5
      right-5

      z-20

      w-11
      h-11

      rounded-full

      bg-white/95
      backdrop-blur-xl

      border border-gray-200

      flex items-center justify-center

      shadow-md

      hover:bg-gray-50

      transition-all duration-300
    "
  >
    <X size={18} />
  </button>

  <div
    className="
      grid
      lg:grid-cols-2
    "
  >
    {/* LEFT IMAGE */}

    <div
      className="
        bg-linear-to-br
        from-blue-50
        via-white
        to-cyan-50

        flex items-center justify-center

        p-8 lg:p-12

        min-h-80
      "
    >
      <img
        src={selectedProduct["Image URL"]}
        alt={selectedProduct.Name}
        className="
          max-h-[420px]
          w-full

          object-contain

          drop-shadow-xl
        "
      />
    </div>

    {/* RIGHT CONTENT */}

    <div
      className="
        p-8 lg:p-10

        flex flex-col
      "
    >
      {/* CATEGORY */}

      <div
        className="
          inline-flex
          items-center

          self-start

          px-4 py-2

          rounded-full

          bg-blue-50

          border border-blue-100

          text-blue-700
          text-sm
          font-semibold
        "
      >
        {selectedProduct.Category}
      </div>

      {/* NAME */}

      <h2
        className="
          mt-5

          text-3xl
          lg:text-4xl

          font-extrabold

          text-gray-900

          leading-tight
        "
      >
        {selectedProduct.Name}
      </h2>

      {/* MANUFACTURER */}

      {selectedProduct.Manufacturer && (
        <div
          className="
            mt-3

            text-sm

            text-gray-500
          "
        >
          Manufacturer
          <span className="ml-2 font-semibold text-gray-800">
            {selectedProduct.Manufacturer}
          </span>
        </div>
      )}

      {/* DESCRIPTION */}

      <div
        className="
          mt-8

          pt-8

          border-t border-gray-100
        "
      >
        <h3
          className="
            text-sm

            font-bold

            uppercase

            tracking-wider

            text-gray-400

            mb-3
          "
        >
          Product Overview
        </h3>

        <p
          className="
            text-gray-600

            leading-relaxed
          "
        >
          {selectedProduct.Description ||
            "Detailed product information available upon request."}
        </p>
      </div>

      {/* CTA */}

      <div
        className="
          mt-auto

          pt-10
        "
      >
        <button
          onClick={() => {
            const params = new URLSearchParams({
              product: selectedProduct.Name,
              category: selectedProduct.Category || "",
              brand:
                selectedProduct.Manufacturer || "",
            });

            window.location.href =
              `/inquiry?${params.toString()}`;
          }}
          className="
            w-full

            py-4

            rounded-2xl

            bg-linear-to-r
            from-blue-600
            to-cyan-500

            text-white

            font-semibold

            shadow-lg
            shadow-blue-500/20

            hover:shadow-xl

            transition-all duration-300
          "
        >
          Send Inquiry
        </button>

        <p
          className="
            text-center

            text-xs

            text-gray-400

            mt-3
          "
        >
          Our team will assist you with specifications,
          pricing and availability.
        </p>
      </div>
    </div>
  </div>
</div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </section>
  );
}