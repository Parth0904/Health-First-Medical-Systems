"use client";
import React, { useState, useEffect } from "react";
import { FaStore, FaBalanceScale, FaArrowRight, FaCheckCircle, FaAward, FaTruck, FaShieldAlt, FaHeartbeat, FaPlay, FaPause } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";

const PrimaryButton = ({ text, link, variant = "primary" }) => (
  <Link
    href={link}
    className={`
      inline-flex items-center justify-center
      px-8 py-4 rounded-full
      font-semibold text-sm tracking-wide
      transition-all duration-300
      hover:-translate-y-0.5
      shadow-sm hover:shadow-md
      cursor-pointer
      ${variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
      }
    `}
  >
    {text}
  </Link>
);

export default function HomePage() {
  const [bpm, setBpm] = useState(72);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time fluctuating heart rate
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setBpm((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // fluctuate by -2 to +2
        const next = prev + delta;
        return next < 60 ? 60 : next > 100 ? 100 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

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
    { title: "Expert Technical Support", desc: "Comprehensive installation, structured clinical training, and precision periodic maintenance support cycles." },
    { title: "Quality-Tested Equipment", desc: "Every diagnostic framework undergoes mandatory certification verification protocols before delivery tracking." },
    { title: "Nationwide Delivery", desc: "Robust supply chain logistics ensuring safe transit to healthcare facilities anywhere across India." },
    { title: "After-Sales Reliability", desc: "Dedicated long-term product lifecycle maintenance support to completely eliminate clinical downtime." },
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

      { }
      {/* ================= HERO SECTION ================= */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-20 pb-28 max-w-7xl mx-auto min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />

        {/* LEFT – CONTENT PANEL (7 columns for deep typography structure) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12]">
            Trusted Medical Systems
            <span className="text-linear-to-r from-blue-600 to-cyan-600 bg-clip-text"> for Clinics & Hospitals</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Certified ECG machines, multi-channel diagnostic systems, and specialized consumables—distributed nationwide with unyielding technical backup.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <PrimaryButton text="Browse Products" link="/products" />
            <PrimaryButton text="Talk to an Expert" link="/contact" variant="secondary" />
          </div>

          {/* Micro metrics segment anchors left layout flow */}
          <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center lg:justify-start gap-1.5">
                <FaAward className="text-sm text-blue-500" /> 100%
              </div>
              <div className="text-xs text-gray-500 font-bold tracking-wide uppercase">Certified Devices</div>
            </div>
            <div className="border-l border-r border-gray-100 px-4 space-y-1">
              <div className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center lg:justify-start gap-1.5">
                <FaTruck className="text-sm text-blue-500" /> PAN-India
              </div>
              <div className="text-xs text-gray-500 font-bold tracking-wide uppercase">Direct Logistics</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center lg:justify-start gap-1.5">
                <FaShieldAlt className="text-sm text-blue-500" /> Direct
              </div>
              <div className="text-xs text-gray-500 font-bold tracking-wide uppercase">Expert Support</div>
            </div>
          </div>
        </motion.div>

        { }
        {/* RIGHT – MEDICAL TELEMETRY SCREEN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 w-full flex flex-col items-center lg:items-end gap-4"
        >
          {/* Top Integrated Trust Pills aligned directly to the dashboard box */}
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3 w-full max-w-[400px]">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/70 text-blue-700 text-xs font-bold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Trusted Partner
            </span>
            <Link
              href="https://www.indiamart.com/health-first-medicalsystems/"
              target="_blank"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold transition hover:bg-amber-100/80 cursor-pointer"
            >
              <span className="text-sm">⭐</span>
              <span>4.7 on IndiaMart</span>
            </Link>
          </div>

          {/* Fully Interactive simulated clinical monitor panel */}
          <div className="relative w-full max-w-[400px] rounded-3xl bg-gray-950 p-6 border border-gray-800 shadow-2xl overflow-hidden group text-emerald-400 font-mono">
            {/* Subtle background scanning grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />

            {/* Header telemetry variables */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4 relative z-10 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
                <span className="font-bold text-white tracking-widest">ECG MONITOR - LEAD II</span>
              </div>
              <div className="text-[10px]">HEALTH FIRST CO.</div>
            </div>

            {/* Simulated Live Sweep Graph Area */}
            <div className="relative h-28 bg-gray-950/80 rounded-lg overflow-hidden border border-gray-900 flex items-center justify-center">
              <svg className="w-full h-full absolute inset-0 text-emerald-500 opacity-95" preserveAspectRatio="none" viewBox="0 0 300 100">
                <path
                  d="M 0,50 L 30,50 L 40,50 L 45,20 L 50,85 L 55,45 L 60,50 L 100,50 L 110,50 L 115,20 L 120,85 L 125,45 L 130,50 L 170,50 L 180,50 L 185,20 L 190,85 L 195,45 L 200,50 L 240,50 L 250,50 L 255,20 L 260,85 L 265,45 L 270,50 L 300,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={isLive ? "animate-[stroke_2s_linear_infinite]" : ""}
                  style={{
                    strokeDasharray: "300",
                    strokeDashoffset: isLive ? "300" : "0",
                  }}
                />
              </svg>
              {/* Scanline element */}
              {isLive && (
                <div className="absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent to-emerald-500/10 border-r border-emerald-500/30 animate-[sweep_2s_linear_infinite] pointer-events-none" />
              )}
            </div>

            {/* Vital Telemetry Parameters */}
            <div className="grid grid-cols-2 gap-4 mt-6 mb-4 relative z-10">
              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-900">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <FaHeartbeat className="text-red-500" /> Heart Rate
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{isLive ? bpm : "--"}</span>
                  <span className="text-xs text-gray-500 font-bold">BPM</span>
                </div>
              </div>

              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-900">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-1">
                  Signal Trace
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-emerald-400">Excellent</span>
                </div>
              </div>
            </div>

            {/* Control Panel Action bar */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-xs text-gray-400">
              <button
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition font-bold cursor-pointer"
              >
                {isLive ? (
                  <>
                    <FaPause className="text-[10px] text-amber-500" /> Pause Sweep
                  </>
                ) : (
                  <>
                    <FaPlay className="text-[10px] text-emerald-500" /> Start Sweep
                  </>
                )}
              </button>
              <div className="text-[10px] uppercase text-right tracking-widest text-gray-500">
                Diagnostic Node Live
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      { }
      {/* ================= EXECUTIVE OVERVIEW SECTION ================= */}
      <section className="bg-gray-50/70 border-t border-b border-gray-100 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Corporate Architecture</h2>
            <p className="text-gray-500 font-medium text-sm">Transparency in baseline operations, legal structures, and registry endpoints.</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {details.map(({ Icon, title, text }, i) => (
              <motion.div
                key={i}
                className="group hover:shadow-md hover:border-blue-200"
              >
                <Link
                  href="/about"
                  className="block h-full bg-white border border-gray-200/70 rounded-2xl p-6 shadow-xs transition duration-300 hover:shadow-md hover:border-blue-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition duration-200 text-base">{title}</h3>
                      <p className="text-sm font-semibold text-gray-500 mt-0.5">{text}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-end text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition duration-300 gap-1">
                    Analyze Parameters <FaArrowRight className="text-[10px]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      { }
      {/* ================= SYSTEMS INFRASTRUCTURE ================= */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-100 pb-8">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Premium Machinery</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Popular Engineering Systems</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group">
            Explore All Hardware <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden group hover:shadow-lg transition duration-300 flex flex-col h-full"
            >
              <Link href="/products" className="block relative h-64 bg-gray-50 overflow-hidden cursor-pointer">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-gray-700 border border-gray-100 z-10">
                  Certified Diagnostic
                </div>
              </Link>

              <div className="p-6 space-y-4 flex flex-col grow justify-between">
                <div className="space-y-1.5">
                  <Link href="/products" className="inline-block cursor-pointer">
                    <h3 className="font-extrabold text-gray-900 text-lg tracking-tight group-hover:text-blue-600 transition duration-200">{s.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{s.desc}</p>
                </div>

                <div className="pt-2">
                  <Link href="/products" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition duration-200 cursor-pointer">
                    View Product Details <FaArrowRight className="text-[9px]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      { }
      {/* ================= QUALITY CORE VALUES ================= */}
      <section className="bg-linear-to-b from-gray-50 to-white border-t border-gray-100 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Service Standards</div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Why Medical Centers Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4"
              >
                <div className="text-blue-600 text-xl">
                  <FaCheckCircle />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-gray-900 tracking-tight text-base">{r.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Telemetry Wave Animation Styles */}
      <style jsx global>{`
        @keyframes stroke {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>

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