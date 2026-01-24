"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import {
  ChevronDown,
  X,
  ArrowUp,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const searchInputRef = useRef(null);

  const wrapperRef = useRef(null);

  // Fetch from API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(({ products, categories }) => {
        setProducts(products);
        setCategories(categories);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtered products
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
  useEffect(() => {
    setSearchQuery("");
  }, [selectedCategory]);

  // Close dropdown or modal on outside click / Escape
  useEffect(() => {
    function handlePointerDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        if (isOpen) setIsOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (isOpen) setIsOpen(false);
        if (selectedProduct) setSelectedProduct(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedProduct]);

  // Lock body scroll when dropdown or modal open
  useEffect(() => {
    document.body.style.overflow =
      isOpen || selectedProduct ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, selectedProduct]);

  // ✅ Hide searchbar when scrolling down
  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowSearchBar(false);

      // 🔑 FORCE keyboard to close
      searchInputRef.current?.blur();
    } else {
      setShowSearchBar(true);
    }

    setLastScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);


  return (
    <section
      id="products"
      className="bg-blue-50 py-20 px-6 md:px-20 text-center relative min-h-screen mt-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
      >
        Our Products
      </motion.h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Explore our comprehensive range of certified and reliable medical
        systems.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Filter Bar: Search + Categories */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: showSearchBar ? 0 : -160 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="sticky top-16 z-30 bg-blue-50/90 backdrop-blur border-b border-gray-200 mb-8"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 bg-white/95 rounded-xl shadow-lg">
              <div className="relative flex items-center">
                {/* Search icon */}
                <Search
                  size={20}
                  className="absolute left-4 text-gray-400 pointer-events-none"
                />

                {/* Search input */}
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name, model, brand, category…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Filter icon */}
                <button
                  onClick={() => setIsOpen((v) => !v)}
                  className="absolute right-3 flex items-center justify-center h-9 w-9 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600"
                  aria-label="Filter categories"
                  aria-expanded={isOpen}
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>

              {/* Categories dropdown */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    ref={wrapperRef}
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedCategory === cat
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center text-gray-600">
                  No products found.
                </div>
              )}

              {filteredProducts.map((prod, idx) => (
                <motion.div
                  key={idx}
                  layout
                  onClick={() => setSelectedProduct(prod)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-left cursor-pointer"
                >
                  <img
                    src={prod["Image URL"]}
                    alt={prod.Name}
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover w-full h-[250px]"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23707f8c' font-size='18'%3EImage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {prod.Name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {prod.Description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-2xl shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={22} />
              </button>

              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {/* Left content */}
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {selectedProduct.Manufacturer || "BRAND"}
                  </h2>

                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {selectedProduct.Name}
                  </h1>

                  {/* Tabs (static for now) */}
                  <div className="flex mb-4">
                    <span className=">grow text-blue-600 border-b-2 border-blue-600 py-2 text-lg px-1">
                      Description
                    </span>
                  </div>

                  <p className="leading-relaxed mb-4">
                    {selectedProduct.Description}
                  </p>

                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Model Number</span>
                    <span className="ml-auto text-gray-900">
                      {selectedProduct["Model Number"]}
                    </span>
                  </div>

                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Category</span>
                    <span className="ml-auto text-gray-900">
                      {selectedProduct.Category}
                    </span>
                  </div>

                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Regulatory Approval</span>
                    <span className="ml-auto text-gray-900">
                      {selectedProduct["Regulatory Approval"]}
                    </span>
                  </div>

                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Warranty</span>
                    <span className="ml-auto text-gray-900">
                      {selectedProduct.Warranty}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      {selectedProduct.Price}
                    </span>

                    <button
                      className="flex ml-auto text-white bg-blue-600 border-0 py-2 px-6 hover:bg-blue-700 rounded"
                      onClick={() => {
                        const message = `Hi, I'm interested in the product "${selectedProduct.Name}". Please share more details.`;
                        window.open(
                          `https://wa.me/9920986401?text=${encodeURIComponent(
                            message,
                          )}`,
                          "_blank",
                        );
                      }}
                    >
                      Enquire
                    </button>
                  </div>
                </div>

                {/* Right image */}
                <img
                  alt={selectedProduct.Name}
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={selectedProduct["Image URL"]}
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23707f8c' font-size='18'%3EImage not found%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
