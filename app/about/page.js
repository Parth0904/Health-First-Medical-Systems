"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="bg-linear-to-r from-blue-50 to-white">
      <section
        id="about"
        className="bg-white py-20 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <Image
            src="/hero.webp"
            alt="About Health First Medical Systems"
            loading="eager"
            fetchPriority="high"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About Us
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            <strong>Health First Medical Systems</strong> is Established as a
            Proprietor firm in the year 2020 at Kalyan (Maharashtra, India), We
            “Shree Digamber Chemicals” are a leading Wholesale Trader, Service
            Provider and Retailer of a wide range of ECG Machine, Pulse
            Oximeter, X Ray Machine, etc.
          </p>
          <ul className="text-gray-700 space-y-3">
            <li>✅ Wide range of advanced medical systems</li>
            <li>✅ Trusted by healthcare professionals and organizations</li>
            <li>✅ Strong commitment to quality, service, and reliability</li>
          </ul>
        </motion.div>
      </section>

      <section id="about" className="py-16 px-8 md:px-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <div className="flex justify-center items-center gap-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Factsheet</h2>
            <Image
              src="/trustseal.webp"
              alt="Trust seal by India Mart"
              width={47}
              height={48}
              className="rounded-2xl shadow-lg mb-4"
              onClick={() =>
                window.open(
                  "https://trustseal.indiamart.com/members/health-first-medicalsystems",
                  "_blank"
                )
              }
              onMouseOver={(e) => (e.target.style.cursor = "pointer")}
            />
          </div>
          <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
            <p className="pt-4 font-bold text-2xl">
              <strong>Basic Information</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Nature of Business:</strong> Trader - Retailer
              </li>
              <li>
                <strong>Additional Business:</strong> Office / Sale Office
              </li>
              <li>
                <strong>Company CEO:</strong> Shankar Dattatraya Shinde
              </li>
              <li>
                <strong>Registered Address:</strong> A304, Madhuban Society,
                Railway Power House Road Mataji Mandir Road, Titwala, Kalyan-
                421605, Maharashtra, India
              </li>
              <li>
                <strong>Total Employees:</strong> Upto 10 People
              </li>
              <li>
                <strong>GST Registration Date:</strong> 30-03-2021
              </li>
              <li>
                <strong>Legal Status:</strong> Proprietorship
              </li>
              <li>
                <strong>Annual Turnover:</strong> 0 - 40 L
              </li>
              <li>
                <strong>GST Partner Name:</strong> Shankar Dattatraya Shinde
              </li>
            </ul>

            <p className="pt-4 font-bold text-2xl">Statutory Profile</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Banker:</strong> State Bank of India
              </li>
              <li>
                <strong>GST No.:</strong> 27BYEPS1664K1ZY
              </li>
            </ul>

            <p className="pt-4 font-bold text-2xl">
              Packaging / Payment / Shipment
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Payment Mode:</strong> Cash, Cheque, DD, Invoice, Online
              </li>
              <li>
                <strong>Shipment Mode:</strong> By Road
              </li>
            </ul>

            <p className="pt-4 font-bold text-2xl">Our Clientele</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Larsen And Toubro Ltd</li>
              <li>Taj Hotel</li>
              <li>Jaslok Hospital</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
