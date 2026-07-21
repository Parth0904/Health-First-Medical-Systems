import React from "react";
import {
  FaStore,
  FaBalanceScale,
  FaArrowRight,
  FaCheckCircle,
  FaAward,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import ProductCard from "./components/ProductCard";
import TelemetryMonitor from "./components/TelemetryMonitor";
import { FadeIn, ScaleIn, FadeInOnView } from "./components/AnimateIn";
import { createCategorySlug } from "@/lib/createCategorySlug";
import { createBrandSlug } from "@/lib/createBrandSlug";
import BrandCard from "./components/BrandCard";

const PrimaryButton = ({ text, link, variant = "primary" }) => (
  <Link
    href={link}
    className={`inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${variant === "primary" ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"}`}
  >
    {text}
  </Link>
);

export default async function HomePage() {
  const products = await getProducts();

  // Filter, sort by spreadsheet ID order, and slice to max 6 featured products
  const featuredProducts = products
    .filter((p) => p.featured)
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(0, 6);

  // Calculate dynamic categories and count the number of published products
  const uniqueCategoriesMap = {};
  products.forEach((p) => {
    if (!uniqueCategoriesMap[p.Category]) {
      uniqueCategoriesMap[p.Category] = {
        name: p.Category,
        slug: createCategorySlug(p.Category),
        count: 0,
      };
    }
    uniqueCategoriesMap[p.Category].count += 1;
  });

  const categories = Object.values(uniqueCategoriesMap)
    .filter((cat) => cat.count >= 10)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Calculate dynamic brands and count the number of products
  const uniqueBrandsMap = {};
  products.forEach((p) => {
    if (
      p.Manufacturer &&
      p.Manufacturer.trim() !== "" &&
      p.Manufacturer.toUpperCase() !== "N/A" &&
      p.Manufacturer !== "-"
    ) {
      if (!uniqueBrandsMap[p.Manufacturer]) {
        uniqueBrandsMap[p.Manufacturer] = {
          name: p.Manufacturer,
          slug: createBrandSlug(p.Manufacturer),
          count: 0,
        };
      }
      uniqueBrandsMap[p.Manufacturer].count += 1;
    }
  });

  const brands = Object.values(uniqueBrandsMap)
    .filter((brand) => brand.count >= 10)
    .sort((a, b) => a.name.localeCompare(b.name));

  const reasons = [
    {
      title: "Expert Technical Support",
      desc: "Comprehensive installation, structured clinical training, and precision periodic maintenance support cycles.",
    },
    {
      title: "Quality-Tested Equipment",
      desc: "Every diagnostic framework undergoes mandatory certification verification protocols before delivery tracking.",
    },
    {
      title: "Nationwide Delivery",
      desc: "Robust supply chain logistics ensuring safe transit to healthcare facilities anywhere across India.",
    },
    {
      title: "After-Sales Reliability",
      desc: "Dedicated long-term product lifecycle maintenance support to completely eliminate clinical downtime.",
    },
  ];

  const details = [
    { Icon: FaStore, title: "Nature of Business", text: "Trader / Retailer" },
    { Icon: FaBalanceScale, title: "Legal Status", text: "Proprietorship" },
    { Icon: AiOutlineLineChart, title: "Annual Turnover", text: "₹0 – ₹1cr" },
    { Icon: MdDateRange, title: "GST Since", text: "30-03-2021" },
    { Icon: FiUsers, title: "Employees", text: "Up to 10 People" },
    { Icon: RiFilePaper2Line, title: "GST Number", text: "27BYEPS1664K1ZY" },
  ];

  return (
    <main className="overflow-x-hidden bg-white text-gray-900 selection:bg-blue-500 selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-20 pb-28 max-w-7xl mx-auto min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT – CONTENT PANEL */}
        <FadeIn className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Trusted Medical Systems
            <span className="block text-blue-700">
              {" "}
              for Clinics & Hospitals
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Certified ECG machines, multi-channel diagnostic systems, and
            specialized consumables—distributed nationwide with unyielding
            technical backup.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <PrimaryButton text="Browse Products" link="/products" />
            <PrimaryButton
              text="Talk to an Expert"
              link="/contact"
              variant="secondary"
            />
          </div>

          {/* Micro metrics segment anchors left layout flow */}
          <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center lg:justify-start gap-1.5">
                <FaAward className="text-sm text-blue-500" /> 100%
              </div>
              <div className="text-xs text-gray-500 font-bold tracking-wide uppercase">
                Certified Devices
              </div>
            </div>
            <div className="border-l border-r border-gray-100 px-4 space-y-1">
              <div className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center lg:justify-start gap-1.5">
                <FaTruck className="text-sm text-blue-500" /> PAN-India
              </div>
              <div className="text-xs text-gray-500 font-bold tracking-wide uppercase">
                Direct Logistics
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center lg:justify-start gap-1.5">
                <FaShieldAlt className="text-sm text-blue-500" /> Direct
              </div>
              <div className="text-xs text-gray-500 font-bold tracking-wide uppercase">
                Expert Support
              </div>
            </div>
          </div>
        </FadeIn>

        {/* RIGHT – MEDICAL TELEMETRY SCREEN */}
        <ScaleIn className="lg:col-span-5 w-full flex flex-col items-center lg:items-end gap-4">
          <TelemetryMonitor />
        </ScaleIn>
      </section>

      {/* ================= EXECUTIVE OVERVIEW SECTION ================= */}
      <section className="bg-gray-50/70 border-t border-b border-gray-100 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Corporate Architecture
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              Transparency in baseline operations, legal structures, and
              registry endpoints.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {details.map(({ Icon, title, text }, i) => (
              <div key={i} className="group rounded-xl transition duration-300">
                <Link
                  href="/about"
                  className="block h-full bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs transition duration-300 hover:shadow-md hover:border-blue-600"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-blue-700 flex items-center justify-center text-xl transition duration-300">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 transition duration-200 text-sm">
                        {title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        {text}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS SECTION ================= */}
      {featuredProducts.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-200/60 pb-8">
              <div className="space-y-3 max-w-xl">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Handpicked Selection
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group"
              >
                View Entire Catalog{" "}
                <span className="transform group-hover:translate-x-1 transition duration-200">
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((prod, idx) => (
                <ProductCard key={idx} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= BROWSE BY CATEGORY SECTION ================= */}
      {categories.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50/40 border-b border-gray-100">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-200/60 pb-8">
              <div className="space-y-3 max-w-xl">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Hardware Classification
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Browse by Category
                </h2>
              </div>
              <Link
                href="/category"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group"
              >
                Explore All Categories{" "}
                <span className="transform group-hover:translate-x-1 transition duration-200">
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/category/${cat.slug}`}
                  className="group block p-6 bg-white border border-slate-200/80 rounded-xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-blue-600 hover:-translate-y-0.5 focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
                  aria-label={`Browse products in ${cat.name} category. Contains ${cat.count} ${cat.count === 1 ? "product" : "products"}`}
                >
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400">
                        {cat.count} {cat.count === 1 ? "Product" : "Products"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs font-bold text-blue-600">
                      <span>Explore Catalog</span>
                      <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= BROWSE BY BRAND SECTION ================= */}
      {brands.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-200/60 pb-8">
              <div className="space-y-3 max-w-xl">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Manufacturer Alliances
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Browse by Brand
                </h2>
              </div>
              <Link
                href="/brand"
                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group"
              >
                Explore All Brands{" "}
                <span className="transform group-hover:translate-x-1 transition duration-200">
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brands.map((brand, idx) => (
                <BrandCard key={idx} brand={brand} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= QUALITY CORE VALUES ================= */}
      <section className="bg-slate-50/50 border-t border-b border-slate-100 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Service Standards
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Medical Centers Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <FadeInOnView
                key={i}
                delay={i * 0.05}
                className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-xs space-y-4"
              >
                <div className="text-blue-700 text-xl">
                  <FaCheckCircle />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 tracking-tight text-sm">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </FadeInOnView>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Health First Medical Systems",
            url: "https://healthfirstmed.in",
            telephone: "+919920986401",
            areaServed: "India",
          }),
        }}
      />
    </main>
  );
}
