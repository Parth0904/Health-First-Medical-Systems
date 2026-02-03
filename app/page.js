"use client";
import React, { useState, useEffect } from "react";
import { FaStore, FaBalanceScale } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ---------- Reusable Button ---------- */
const PrimaryButton = ({ text, link, variant = "primary" }) => (
  <Link href={link}>
    <button
      className={`px-8 py-4 rounded-full font-semibold transition-all shadow-md
        ${
          variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-blue-600 text-blue-600 hover:bg-blue-50"
        }`}
    >
      {text}
    </button>
  </Link>
);

export default function HomePage() {
  /* ---------- DATA ---------- */
  const platforms = [
    {
      name: "IndiaMart",
      logo: "/indiamart.webp",
      rating: "4.7★",
      reviews: "14+ verified reviews",
      link: "https://www.indiamart.com/health-first-medicalsystems/",
    },
  ];

  const systems = [
    {
      name: "Tricog ECG Machine",
      desc: "Compact and accurate ECG machine ideal for cardiac diagnostics.",
      img: "https://5.imimg.com/data5/ANDROID/Default/2024/3/404768626/CG/RW/QV/21897455/product-jpeg-500x500.jpg",
    },
    {
      name: "BPL Cardiart 108T DIGI ECG",
      desc: "Portable single-channel ECG machine for quick diagnostics.",
      img: "https://5.imimg.com/data5/SELLER/Default/2021/6/HD/EA/RJ/21897455/bpl-cardiart-108t-digi-ecg-machine-500x500.jpg",
    },
    {
      name: "BPL 12 Channel ECG Machine",
      desc: "Advanced 12-channel ECG system with detailed cardiac analysis.",
      img: "https://5.imimg.com/data5/ANDROID/Default/2024/3/404768261/JW/IR/WM/21897455/product-jpeg-500x500.jpg",
    },
  ];

  const reasons = [
    { title: "Expert Technical Support", desc: "Installation, training, and maintenance support." },
    { title: "Quality-Tested Equipment", desc: "All systems verified before delivery." },
    { title: "Nationwide Delivery", desc: "Fast logistics across India." },
    { title: "After-Sales Reliability", desc: "Support even after purchase." },
  ];

  const details = [
    { Icon: FaStore, title: "Nature of Business", text: "Trader / Retailer" },
    { Icon: FaBalanceScale, title: "Legal Status", text: "Proprietorship" },
    { Icon: AiOutlineLineChart, title: "Annual Turnover", text: "₹0 – ₹40L" },
    { Icon: MdDateRange, title: "GST Since", text: "30-03-2021" },
    { Icon: FiUsers, title: "Employees", text: "Up to 10 People" },
    { Icon: RiFilePaper2Line, title: "GST Number", text: "27BYEPS1664K1ZY" },
  ];

  const images = ["/hero.webp", "/logo.webp"];

  /* ---------- HERO SLIDESHOW ---------- */
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const i = setInterval(
      () => setCurrentImage((p) => (p + 1) % images.length),
      4000
    );
    return () => clearInterval(i);
  }, [images.length]);

  return (
    <main className="overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="m-4 bg-linear-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-8 md:mt-20 rounded-3xl">

        {/* LEFT – CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl m-4"
        >
          <p className="text-blue-600 font-semibold mb-2">
            Trusted Medical Equipment Supplier
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Reliable Medical Equipment for Clinics & Hospitals
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Certified ECG machines, diagnostic systems, and consumables —
            delivered across India with dependable after-sales support.
          </p>

          <div className="flex flex-wrap gap-4">
            <PrimaryButton text="Browse Products" link="/products" />
            <PrimaryButton text="Talk to an Expert" link="/contact" variant="secondary" />
          </div>

          {/* Trust */}
          <div className="my-4 flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 w-fit">
            <Image src="/indiamart.webp" alt="IndiaMart" width={40} height={40} />
            <div>
              <p className="font-semibold text-gray-800">4.7⭐ on IndiaMart</p>
              <p className="text-sm text-gray-600">Verified supplier</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT – IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="p-10"
        >
          <Image
            src={images[currentImage]}
            alt="Medical Equipment"
            priority
            width={600}
            height={300}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-gray-50 py-16 px-6 m-4 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-10">About Health First</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {details.map(({ Icon, title, text }, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
              <Icon className="text-blue-600 text-4xl m-auto mb-4" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SYSTEMS ================= */}
      <section className="bg-blue-50 py-20 px-8 m-4 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-10">Popular Systems</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <img src={s.img} alt={s.name} className="h-64 w-full object-cover rounded-lg mb-4" />
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <PrimaryButton text="View Full Product Range" link="/products" />
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-20 px-8 m-4 bg-gray-50 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="bg-blue-50 p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
