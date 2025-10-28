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

const PrimaryButton = ({ text, link }) => (
  <Link href={link}>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md m-2 cursor-pointer">
      {text}
    </button>
  </Link>
);

export default function HomePage() {
  // =================== DATA ===================
  const platforms = [
    {
      name: "IndiaMart",
      logo: "/indiamart.webp",
      rating: 4.7,
      reviews: "14+ products",
      link: "https://www.indiamart.com/health-first-medicalsystems/",
    },
  ];

  const systems = [
    {
      name: "Tricog ECG Machine",
      price: "₹75,000/Piece",
      desc: "Compact and accurate ECG machine ideal for cardiac diagnostics.",
      link: "https://www.indiamart.com/proddetail/tricog-ecg-machine-2853725495512.html",
      img: "https://5.imimg.com/data5/ANDROID/Default/2024/3/404768626/CG/RW/QV/21897455/product-jpeg-500x500.jpg",
      category: "ECG Machine",
    },
    {
      name: "BPL Cardiart 108T DIGI Single Channel ECG Machine",
      price: "₹22,000/Piece",
      desc: "Portable single-channel ECG machine offering quick and precise readings.",
      link: "https://www.indiamart.com/proddetail/bpl-cardiart-108t-digi-single-channel-ecg-machine-23537612991.html",
      img: "https://5.imimg.com/data5/SELLER/Default/2021/6/HD/EA/RJ/21897455/bpl-cardiart-108t-digi-ecg-machine-500x500.jpg",
      category: "ECG Machine",
    },
    {
      name: "BPL 12 Channel ECG Machine",
      price: "₹1,10,000/Piece",
      desc: "Advanced 12-channel ECG system with detailed cardiac analysis.",
      link: "https://www.indiamart.com/proddetail/bpl-12-channel-ecg-machine-2853725492830.html",
      img: "https://5.imimg.com/data5/ANDROID/Default/2024/3/404768261/JW/IR/WM/21897455/product-jpeg-500x500.jpg",
      category: "ECG Machine",
    },
  ];

  const reasons = [
    { title: "Expert Technical Support", desc: "Dedicated team for installation and maintenance." },
    { title: "Quality Assurance", desc: "All systems are tested for performance and safety." },
    { title: "Nationwide Delivery", desc: "Fast and reliable logistics across India." },
    { title: "After-Sales Support", desc: "We stay with you long after purchase." },
  ];

  const reviews = [
    { name: "Alveofit", product: "Contec Spirometer", place: "Indore, Madhya Pradesh" },
    { name: "Sattu Morey", product: "Fetal Chart Paper", place: "Aurangabad, Maharashtra" },
    { name: "Narendra Kothari", product: "ECG Paper", place: "Belagavi, Karnataka" },
  ];

  const details = [
    { Icon: FaStore, title: "Nature of Business", text: "Trader - Retailer" },
    { Icon: FaBalanceScale, title: "Legal Status of Firm", text: "Proprietorship" },
    { Icon: AiOutlineLineChart, title: "Annual Turnover", text: "0 - 40 L" },
    { Icon: MdDateRange, title: "GST Registration Date", text: "30-03-2021" },
    { Icon: FiUsers, title: "Total Number of Employees", text: "Upto 10 People" },
    { Icon: RiFilePaper2Line, title: "GST Number", text: "27BYEPS1664K1ZY" },
  ];

  const images = ["/hero.webp", "/logo.webp",];

  // =================== SLIDESHOW ===================
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // =================== RETURN ===================
  return (
    <main className="overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-linear-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 m-4 mt-20 rounded-3xl">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Health First Medical Systems
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
            Health First Medical Systems is Established as a Proprietor firm in the year 2020 at Kalyan (Maharashtra, India), We “Shree Digamber Chemicals” are a leading Wholesale Trader, Service Provider and Retailer of a wide range of ECG Machine, Pulse Oximeter, X Ray Machine, etc.
          </p>

          <PrimaryButton text="View Products" link="/products" />
          <PrimaryButton text="Contact Us" link="/contact" />

          {/* Ratings */}
          <div className="flex flex-wrap gap-6 mt-10">
            {platforms.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-3 bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg"
                onClick={() => window.open(p.link, "_blank")}
              >
                <Image src={p.logo} alt={p.name} width={40} height={40} />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.rating} ⭐ | {p.reviews}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Slideshow */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-0 p-14"
        >
          <Image
            src={images[currentImage]}
            alt="Health First Medical Systems"
            loading="eager"
            width={1000}
            height={500}
            className="rounded-2xl shadow-lg transition-all duration-700"
          />
        </motion.div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section
        className="flex flex-col justify-center items-center bg-gray-50 py-12 px-6 md:px-16 m-4 rounded-3xl"
        id="about"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">About</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {details.map(({ Icon, title, text }, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <Icon className="text-blue-600 text-4xl mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <PrimaryButton text="Read more about us" link="/about" />
        </div>
      </section>
        

      {/* ================= SYSTEMS SECTION ================= */}
      <section id="systems" className="bg-blue-50 py-20 px-8 m-4 md:px-20 text-center rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Systems</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((sys, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-left"
            >
              <img src={sys.img} alt={sys.name} width={400} height={250} className="rounded-lg mb-4 h-64 w-full object-cover" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{sys.name}</h3>
              <p className="text-gray-600 text-sm">{sys.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <PrimaryButton text="View More Products" link="/products" />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 m-4 px-8 md:px-20 bg-gray-50 text-center rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-blue-50 rounded-2xl shadow-md"
            >
              <h3 className="font-semibold text-gray-800 mb-2">{r.title}</h3>
              <p className="text-gray-600 text-sm">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 m-4 px-8 md:px-20 bg-blue-50 text-center rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-2xl shadow-md"
            >
              <p className="text-gray-600 italic mb-4">“{r.product}”</p>
              <h3 className="font-semibold text-gray-800">{r.name}</h3>
              <p className="text-gray-500 text-sm">{r.place}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}




