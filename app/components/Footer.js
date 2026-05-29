"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-linear-to-b from-blue-950 to-slate-950 text-gray-300">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

        {/* ====================================================== */}
        {/* CTA SECTION */}
        {/* ====================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            mb-16
            pb-12
            border-b border-blue-900/50

            flex flex-col lg:flex-row
            items-center justify-between
            gap-8
          "
        >
          <div>
            <h2 className="
              text-3xl md:text-4xl
              font-bold
              text-white
              leading-tight
            ">
              Looking for the right
              <span className="block text-cyan-400">
                Medical Solution?
              </span>
            </h2>

            <p className="
              mt-3
              text-blue-200
              max-w-2xl
              leading-relaxed
            ">
              Browse our medical systems or submit an inquiry.
              Our team will help you identify the right equipment
              for your requirements.
            </p>
          </div>

          <Link
            href="/inquiry"
            className="
              shrink-0

              px-8 py-4

              rounded-2xl

              bg-linear-to-r
              from-blue-500
              to-cyan-500

              text-white
              font-semibold

              shadow-lg shadow-cyan-500/20

              hover:shadow-xl
              hover:scale-[1.02]

              transition-all duration-300
            "
          >
            Send inquiry
          </Link>
        </motion.div>

        {/* ====================================================== */}
        {/* MAIN FOOTER GRID */}
        {/* ====================================================== */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-12
        ">

          {/* BRAND */}

          <div className="lg:col-span-2">

            <h3 className="
              text-3xl
              font-extrabold
              text-white
              mb-4
            ">
              Health
              <span className="text-cyan-400">
                First
              </span>
            </h3>

            <p className="
              text-gray-400
              leading-relaxed
              max-w-md
            ">
              Delivering reliable medical systems, diagnostic
              equipment and healthcare technology solutions for
              hospitals, clinics and healthcare providers across India.
            </p>

            {/* TRUST BADGES */}

            <div className="
              flex flex-wrap
              gap-3
              mt-6
            ">
              <span className="
                px-3 py-1.5
                rounded-full
                bg-blue-900/50
                border border-blue-800
                text-xs
                font-medium
                text-blue-200
              ">
                Trusted Supplier
              </span>

              <span className="
                px-3 py-1.5
                rounded-full
                bg-blue-900/50
                border border-blue-800
                text-xs
                font-medium
                text-blue-200
              ">
                Medical Systems
              </span>

              <span className="
                px-3 py-1.5
                rounded-full
                bg-blue-900/50
                border border-blue-800
                text-xs
                font-medium
                text-blue-200
              ">
                Fast Support
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h4 className="
              text-lg
              font-semibold
              text-white
              mb-5
            ">
              Quick Links
            </h4>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-300 transition-colors"
                >
                  → Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-cyan-300 transition-colors"
                >
                  → About
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="hover:text-cyan-300 transition-colors"
                >
                  → Products
                </Link>
              </li>

              <li>
                <Link
                  href="/inquiry"
                  className="hover:text-cyan-300 transition-colors"
                >
                  → inquiry
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-cyan-300 transition-colors"
                >
                  → Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}

          <div>
            <h4 className="
              text-lg
              font-semibold
              text-white
              mb-5
            ">
              Reach Us
            </h4>

            <div className="space-y-5 text-sm">

              <div>
                <p className="font-medium text-white mb-1">
                  Address
                </p>

                <p className="text-gray-400 leading-relaxed">
                  Shop No. 7,
                  E11 Building,
                  Madhuban Co-operative Society,
                  Titwala,
                  Thane,
                  Maharashtra 421605
                </p>
              </div>

              <div>
                <p className="font-medium text-white mb-1">
                  Proprietor
                </p>

                <p className="text-gray-400">
                  Shankar Dattatraya Shinde
                </p>
              </div>

              <div>
                <p className="font-medium text-white mb-1">
                  Phone
                </p>

                <a
                  href="tel:+919920986401"
                  className="
                    text-gray-400
                    hover:text-cyan-300
                    transition-colors
                  "
                >
                  +91 99209 86401
                </a>
              </div>

              <div>
                <p className="font-medium text-white mb-1">
                  Email
                </p>

                <a
                  href="mailto:info@healthfirst.com"
                  className="
                    text-gray-400
                    hover:text-cyan-300
                    transition-colors
                  "
                >
                  sales@healthfirstmed.in
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* BOTTOM BAR */}
        {/* ====================================================== */}

        <div className="
          mt-14
          pt-6

          border-t border-blue-900/50

          flex flex-col md:flex-row
          items-center justify-between

          gap-4

          text-sm
          text-gray-500
        ">

          <p>
            © {new Date().getFullYear()} Health First Medical Systems.
            All rights reserved.
          </p>

          <div className="
            flex flex-wrap
            items-center
            gap-6
          ">
            <Link
              href="/privacy"
              className="hover:text-cyan-300 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/inquiry"
              className="hover:text-cyan-300 transition-colors"
            >
              inquiry
            </Link>

            <Link
              href="/products"
              className="hover:text-cyan-300 transition-colors"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}