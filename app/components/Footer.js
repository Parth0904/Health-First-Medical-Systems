"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 py-14 px-8 md:px-20 mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Health<span className="text-blue-400">First</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Delivering reliable medical systems and healthcare technology
            solutions to empower better patient care and diagnostics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-300 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Reach Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              📍 Health First Medical Systems A304, Madhuban Society, Railway
              Power House Road Mataji Mandir Road, Titwala, Kalyan,
              Thane-421605, Maharashtra, India
            </li>
            <li>👨‍💻 Shankar Dattatraya Shinde (Proprietor)</li>
            <li>📞 Call 08046074634</li>
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Health First Medical Systems. All rights
        reserved.
      </div>
    </footer>
  );
}
