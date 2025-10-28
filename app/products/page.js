"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import { ChevronDown, X, ArrowUp } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const wrapperRef = useRef(null);

  // Fetch data from Google Sheets
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSquIBj5dT4sJTc2h_a1spd8o_thibULUFy2MQfCWOEb1A90oYEk7Q60kxMorJj8VY4SRc5vZppTb1o/pub?output=csv"
    )
      .then((res) => res.text())
      .then((csv) => {
        const data = Papa.parse(csv, { header: true }).data;
        const validProducts = data.filter((p) => p?.Name && p?.Category);
        setProducts(validProducts);
        const uniqueCategories = [
          "All",
          ...new Set(validProducts.map((p) => (p.Category || "").trim())),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtered products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.Category === selectedCategory);

  // Scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
    document.body.style.overflow = isOpen || selectedProduct ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, selectedProduct]);

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
          {/* Category Filter */}
          <div className="mb-10 relative">
            {/* Desktop */}
            <div className="hidden md:flex justify-center flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden relative" ref={wrapperRef}>
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="flex items-center justify-between w-full bg-white px-4 py-3 rounded-lg shadow"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-gray-700">
                  {selectedCategory}
                </span>
                {isOpen ? <X size={18} /> : <ChevronDown size={18} />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.div
                      key="backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"
                    />
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-lg"
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
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

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
              className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={22} />
              </button>

              <img
                src={selectedProduct["Image URL"]}
                alt={selectedProduct.Name}
                width={400}
                height={250}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {selectedProduct.Name}
              </h2>

              <p className="text-gray-700 mb-4">
                {selectedProduct.Description}
              </p>

              <div className="text-gray-700 text-sm space-y-2">
                <p>
                  <strong>Manufacturer:</strong> {selectedProduct.Manufacturer}
                </p>
                <p>
                  <strong>Model Number:</strong>{" "}
                  {selectedProduct["Model Number"]}
                </p>
                <p>
                  <strong>Category:</strong> {selectedProduct.Category}
                </p>
                <p>
                  <strong>Regulatory Approval:</strong>{" "}
                  {selectedProduct["Regulatory Approval"]}
                </p>
                <p>
                  <strong>Key Features:</strong>{" "}
                  {selectedProduct["Key Features"]}
                </p>
                <p>
                  <strong>Warranty:</strong> {selectedProduct.Warranty}
                </p>
                <p>
                  <strong>Price:</strong> {selectedProduct.Price}
                </p>
              </div>

              <button
                className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition cursor-pointer"
                onClick={() => {
                  const message = `Hi, I'm interested in the product "${selectedProduct.Name}" from category ${selectedProduct.Category}. Can you please share more details?`;
                  const url = `https://wa.me/9920986401?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(url, "_blank");
                }}
              >
                Enquire Now on WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
