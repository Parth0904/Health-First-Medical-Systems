"use client";
import Link from "next/link";
import PageHero from "../components/Pagehero";

export default function ContactSection() {
  return (
    <section className="bg-slate-50/50 min-h-screen">
      <PageHero
        badge="Contact Us"
        title="We're Here To Help"
        description="Get in touch with our team for product information, quotations, support or business enquiries."
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="tel:+919920986401"
            className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-blue-600 transition-all duration-300"
          >
            <h3 className="font-bold text-slate-900">Call Us</h3>
            <p className="mt-3 text-blue-700 font-bold text-sm">
              +91 99209 86401
            </p>
          </a>

          <a
            href="mailto:sales@healthfirstmed.in"
            className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-blue-600 transition-all duration-300"
          >
            <h3 className="font-bold text-slate-900">Email</h3>
            <p className="mt-3 text-blue-700 font-bold text-sm break-all">
              sales@healthfirstmed.in
            </p>
          </a>

          <a
            href="https://wa.me/919920986401"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-blue-600 transition-all duration-300"
          >
            <h3 className="font-bold text-slate-900">WhatsApp</h3>
            <p className="mt-3 text-emerald-600 font-bold text-sm">
              Start Conversation
            </p>
          </a>
        </div>

        {/* MAP */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs mb-10">
          <iframe
            title="Health First Medical Systems Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.7810483520675!2d73.19947017498309!3d19.291885531957632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7912b328eb897%3A0xfc39a7b2e20a8685!2sMadhuban%20Complex%2C!5e0!3m2!1sen!2sin!4v1780041236629!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* BUSINESS INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">Address</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">
              Shop No. 7, E11 Building, Madhuban Co-operative Society, Titwala
              East, Thane, Maharashtra 421605
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-6">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">
              Proprietor
            </h3>
            <p className="text-slate-500 text-xs font-semibold">
              Shankar Dattatraya Shinde
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-6">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">
              Business Contact
            </h3>
            <p className="text-slate-500 text-xs font-semibold">
              +91 99209 86401
            </p>
            <p className="text-slate-500 text-xs font-semibold mt-2">
              sales@healthfirstmed.in
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl bg-slate-900 text-white text-center p-10 md:p-14">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Need Help Choosing the Right Equipment?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-xs">
            Visit our product catalog page and explore our certified health
            systems.
          </p>

          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-slate-900 font-bold text-xs hover:bg-slate-50 transition-all duration-300"
            >
              Go To Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
