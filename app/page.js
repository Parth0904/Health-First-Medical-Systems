"use client";
import PrimaryButton from "./components/PrimaryButton";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-blue-200 ">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg.webp')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Content */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center max-w-3xl text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Health First Medical Systems
            </h1>

            <p className="mt-6 text-lg text-gray-400">
              Health First Medical Systems is Established as a Proprietor firm
              in the year 2020 at Kalyan (Maharashtra, India), We “Shree
              Digamber Chemicals” are a leading Wholesale Trader, Service
              Provider and Retailer of a wide range of ECG Machine, Pulse
              Oximeter, X Ray Machine, etc.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-6 mt-10 z-10">
            <PrimaryButton text="View Products" link="/products" />
            <PrimaryButton text="Contact Us" link="/contact" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <h1 className="sm:pr-16 text-2xl font-medium title-font text-black">
              This is the official site owned by Shankar Dattatraya Shinde this site is designed to get a ease of acess to all of the products of Health First Medical Systems
            </h1>
              <PrimaryButton text="View Products" link="/products" />
          </div>
        </div>
      </section>
    </main>
  );
}
