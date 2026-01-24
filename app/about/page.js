"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckIcon from "../components/CheckIcon";

export default function AboutSection() {
  return (
    <div className="bg-linear-to-r from-blue-50 to-white">

      {/* ================= ABOUT INTRO ================= */}
      <section
        id="about-intro"
        className="bg-white py-20 px-8 md:px-20 flex flex-col md:flex-row items-center gap-12"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <Image
            src="/hero.webp"
            alt="Health First Medical Systems"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About Health First Medical Systems
          </h2>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            <strong>Health First Medical Systems</strong> is a Maharashtra-based
            medical equipment supplier serving clinics, hospitals, and healthcare
            organizations across India. We specialize in supplying reliable
            diagnostic systems and medical devices with dependable after-sales
            support.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2">
              <CheckIcon /> Certified and quality-tested medical equipment
            </li>
            <li className="flex gap-2">
              <CheckIcon /> Trusted by hospitals, clinics, and institutions
            </li>
            <li className="flex gap-2">
              <CheckIcon /> Focused on long-term service and reliability
            </li>
          </ul>
        </motion.div>
      </section>

      {/* ================= FACTSHEET ================= */}
      <section
        id="about-facts"
        className="py-16 px-8 md:px-20 flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Company Factsheet
            </h2>
            <Image
              src="/trustseal.webp"
              alt="IndiaMART Trust Seal"
              width={48}
              height={48}
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  "https://trustseal.indiamart.com/members/health-first-medicalsystems",
                  "_blank"
                )
              }
            />
          </div>

          {/* Facts */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-8 text-gray-700">

            {/* Basic Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Basic Information
              </h3>
              <ul className="space-y-2">
                <li><strong>Nature of Business:</strong> Trader / Retailer</li>
                <li><strong>Legal Status:</strong> Proprietorship</li>
                <li><strong>Company Head:</strong> Shankar Dattatraya Shinde</li>
                <li><strong>Employees:</strong> Up to 10 people</li>
                <li><strong>GST Registered Since:</strong> 30-03-2021</li>
                <li><strong>Annual Turnover:</strong> ₹0 – ₹40 Lakhs</li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Registered Address
              </h3>
              <p>
                A304, Madhuban Society, Railway Power House Road,  
                Mataji Mandir Road, Titwala,  
                Kalyan – 421605, Maharashtra, India
              </p>
            </div>

            {/* Statutory */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Statutory Profile
              </h3>
              <ul className="space-y-2">
                <li><strong>GST Number:</strong> 27BYEPS1664K1ZY</li>
                <li><strong>Banker:</strong> State Bank of India</li>
              </ul>
            </div>

            {/* Payment & Shipping */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Payment & Shipment
              </h3>
              <ul className="space-y-2">
                <li><strong>Payment Modes:</strong> Cash, Cheque, DD, Online</li>
                <li><strong>Shipment Mode:</strong> Road transport</li>
              </ul>
            </div>

            {/* Clients */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Major Clients
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Larsen & Toubro Ltd</li>
                <li>Taj Hotel</li>
                <li>Jaslok Hospital</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
