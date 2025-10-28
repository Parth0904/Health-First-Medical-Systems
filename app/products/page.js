"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import { ChevronDown, X } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSquIBj5dT4sJTc2h_a1spd8o_thibULUFy2MQfCWOEb1A90oYEk7Q60kxMorJj8VY4SRc5vZppTb1o/pub?output=csv"
    )
      .then((res) => res.text())
      .then((csv) => {
        const data = Papa.parse(csv, { header: true }).data;
        const validProducts = data.filter((p) => p.Name && p.Category);

        setProducts(validProducts);

        const uniqueCategories = [
          "All",
          ...new Set(validProducts.map((p) => p.Category.trim())),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.Category === selectedCategory);

  return (
    <section
      id="products"
      className="bg-blue-50 py-20 px-6 md:px-20 text-center relative min-h-screen mt-4"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
      >
        Our Products
      </motion.h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Explore our comprehensive range of certified and reliable medical
        systems.
      </p>

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
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full bg-white px-4 py-3 rounded-lg shadow"
          >
            <span className="font-medium text-gray-700">
              {selectedCategory}
            </span>
            {isOpen ? <X size={18} /> : <ChevronDown size={18} />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg"
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
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((prod, index) => (
            <motion.div
              key={index}
              layout
              onClick={() => setSelectedProduct(prod)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-left cursor-pointer"
            >
              <img
                src={prod["Image URL"]}
                alt={prod.Name}
                width={400}
                height={250}
                className="rounded-lg mb-4 object-cover w-full h-[250px]"
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
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
    </section>
  );
}
