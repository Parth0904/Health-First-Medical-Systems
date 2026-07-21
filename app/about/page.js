"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import PageHero from "../components/Pagehero";

export default function AboutSection() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ================= HERO INTRO SECTION ================= */}
      <section
        id="about-intro"
        className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
      >
        <PageHero
          badge="About Health First"
          title="Building Better Healthcare Infrastructure Across India"
          description="Health First Medical Systems supplies trusted diagnostic equipment and medical systems to clinics, hospitals and healthcare providers with a focus on reliability, support and long-term partnerships."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Enterprise Metrics Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-12 space-y-6"
          >
            <div className="bg-white p-8 rounded-xl border border-slate-200/80 relative overflow-hidden shadow-xs">
              <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>{" "}
                Operational Overview
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Metric 1 */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="text-3xl font-extrabold text-slate-900">
                    2020
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    Incorporation Year
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="text-3xl font-extrabold text-blue-700">
                    Pan-India
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    Supply & Distribution Network
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="border-b border-slate-100 pb-4 lg:border-none lg:pb-0">
                  <div className="text-3xl font-extrabold text-slate-900">
                    Tier-1 & 2
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    Clinical Support Coverage
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="lg:hidden sm:border-none sm:pb-0 pb-4">
                  <div className="text-3xl font-extrabold text-slate-900">
                    ₹0 – ₹1 Cr
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    Annual Volume Traded
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Mandate Callout */}
            <div className="p-6 bg-slate-900 rounded-xl text-white">
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1.5">
                Corporate Mandate
              </p>
              <p className="text-xs font-semibold leading-relaxed text-slate-200">
                Advancing clinical outcomes across India through genuine ideas
                and technical engineering precision.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Architecture */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
                Corporate Profile
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Strengthening Healthcare Providers
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We bring genuine and innovative ideas to the table, helping
                solidify and strengthen the capacity of modern healthcare
                providers.
              </p>
              <div className="h-px bg-slate-200 w-2/3"></div>
              <p className="text-slate-500 text-sm leading-relaxed">
                By pairing highly certified medical devices with our
                forward-thinking support model, we ensure doctors and medical
                staff can focus entirely on saving lives. Backed by an
                increasingly strong infrastructure and an expanding sales and
                service footprint, we are scaling our reach strategically to
                ensure no medical institution is left without top-tier technical
                support.
              </p>
            </motion.div>

            {/* Strategic Value Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 21l8.954-8.955M21 12h0l-9 9m9-9a9 9 0 10-9 9m9-9H3.75"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  AI-Assisted Patient Care
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  The medical landscape shifts quickly. We are continuously
                  working on the inception of top-tier service delivery in a
                  highly competitive market by adopting the latest technology
                  trends, including, AI-assisted patient care systems.
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-cyan-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Nationwide Expansion Goal
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  By maintaining standard operational controls and deploying
                  reactive service assets locally, our network is proactively
                  built to eliminate down-times for crucial tier-1 and tier-2
                  clinical frameworks.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXECUTIVE DATA FACTSHEET ================= */}
      <section
        id="about-facts"
        className="py-24 px-6 md:px-16 lg:px-24 bg-slate-50/50 border-t border-b border-slate-100"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header Dynamic Block */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Company Factsheet
              </h2>
              <p className="text-slate-500 text-xs">
                Verified statutory operations and industry compliance metrics.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-lg shadow-xs border border-slate-200 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://trustseal.indiamart.com/members/health-first-medicalsystems",
                  "_blank",
                )
              }
            >
              <Image
                src="/trustseal.webp"
                alt="IndiaMART Trust Seal"
                width={32}
                height={32}
              />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Verified Profile
                </div>
                <div className="text-xs font-bold text-slate-800">
                  IndiaMART Trust Seal
                </div>
              </div>
            </motion.div>
          </div>

          {/* Structured Data Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Column 1: Registry Operations */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-700 rounded-xs"></span>{" "}
                  Basic & Statutory Registry
                </h3>
                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">
                      Nature of Business
                    </dt>
                    <dd className="text-slate-900 font-bold">
                      Trader / Retailer
                    </dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">Legal Status</dt>
                    <dd className="text-slate-900 font-bold">Proprietorship</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">Company Head</dt>
                    <dd className="text-slate-900 font-bold">
                      Shankar Dattatraya Shinde
                    </dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">
                      GST Registered Since
                    </dt>
                    <dd className="text-slate-900 font-bold">30-03-2021</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">GSTIN Token</dt>
                    <dd className="text-slate-900 font-mono font-bold text-blue-700">
                      27BYEPS1664K1ZY
                    </dd>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <dt className="text-slate-500 font-medium">
                      Banking Partner
                    </dt>
                    <dd className="text-slate-900 font-bold">
                      State Bank of India
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-700 rounded-xs"></span>{" "}
                  Registered Location
                </h3>
                <p className="text-xs text-slate-500 bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 leading-relaxed font-semibold">
                  Shop No 7, E11 Building, Madhuban Co-operative Society,
                  Titwala, Kalyan, Thane, Maharashtra - 421605
                </p>
              </div>
            </div>

            {/* Column 2: Logistics & Major Enterprise Alliances */}
            <div className="space-y-8">
              {/* Commerce Infrastructure block */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-8 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-cyan-600 rounded-xs"></span>{" "}
                  Logistics & Operations
                </h3>
                <dl className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    <dt className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                      Human Capital
                    </dt>
                    <dd className="text-slate-900 font-bold text-base">
                      Up to 10 People
                    </dd>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    <dt className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                      Annual Turnover
                    </dt>
                    <dd className="text-slate-900 font-bold text-base">
                      ₹0 – ₹1 Cr
                    </dd>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    <dt className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                      Settlement
                    </dt>
                    <dd className="text-slate-900 font-bold text-xs leading-tight mt-1">
                      Cash, Cheque, DD, Online Transfer
                    </dd>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    <dt className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                      Logistics Mode
                    </dt>
                    <dd className="text-slate-900 font-bold text-xs mt-1">
                      Road Transport Network
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Major Portfolio Clients */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-8 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-cyan-600 rounded-xs"></span>{" "}
                  Major Clients
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Larsen & Toubro Ltd",
                    "Taj Hotel Group",
                    "Jaslok Hospital",
                  ].map((client, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center text-center p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700"
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
