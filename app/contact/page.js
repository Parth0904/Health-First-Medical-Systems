"use client";

import Link from "next/link";
import PageHero from "../components/Pagehero";

export default function ContactSection() {
  return (
    <section className="bg-[#f5f9ff] min-h-screen">
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
            className="
              bg-white
              rounded-3xl
              border border-blue-100
              p-6

              shadow-sm
              hover:shadow-md

              transition-all duration-300
            "
          >
            <h3 className="font-bold text-gray-900">
              Call Us
            </h3>

            <p className="mt-3 text-blue-600 font-medium">
              +91 99209 86401
            </p>
          </a>

          <a
            href="mailto:info@healthfirst.com"
            className="
              bg-white
              rounded-3xl
              border border-blue-100
              p-6

              shadow-sm
              hover:shadow-md

              transition-all duration-300
            "
          >
            <h3 className="font-bold text-gray-900">
              Email
            </h3>

            <p className="mt-3 text-blue-600 font-medium break-all">
              sales@healthfirstmed.in
            </p>
          </a>

          <a
            href="https://wa.me/919920986401"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-white
              rounded-3xl
              border border-blue-100
              p-6

              shadow-sm
              hover:shadow-md

              transition-all duration-300
            "
          >
            <h3 className="font-bold text-gray-900">
              WhatsApp
            </h3>

            <p className="mt-3 text-green-600 font-medium">
              Start Conversation
            </p>
          </a>

        </div>

        {/* MAP */}

        <div
          className="
            overflow-hidden

            rounded-4xl

            border border-blue-100

            bg-white

            shadow-sm

            mb-10
          "
        >
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

          <div
            className="
              bg-white
              rounded-3xl
              border border-blue-100

              p-6
            "
          >
            <h3 className="font-semibold text-gray-900 mb-3">
              Address
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Shop No. 7,
              E11 Building,
              Madhuban Co-operative Society,
              Titwala East,
              Thane,
              Maharashtra 421605
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              border border-blue-100

              p-6
            "
          >
            <h3 className="font-semibold text-gray-900 mb-3">
              Proprietor
            </h3>

            <p className="text-gray-600">
              Shankar Dattatraya Shinde
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              border border-blue-100

              p-6
            "
          >
            <h3 className="font-semibold text-gray-900 mb-3">
              Business Contact
            </h3>

            <p className="text-gray-600">
              +91 99209 86401
            </p>

            <p className="text-gray-600 mt-2">
              info@healthfirst.com
            </p>
          </div>

        </div>

        {/* CTA */}

        <div
          className="
            rounded-4xl

            bg-lineat-to-r
            from-blue-600
            to-cyan-500

            text-white

            text-center

            p-10 md:p-14
          "
        >
          <h2
            className="
              text-3xl
              md:text-4xl

              font-bold
            "
          >
            Need Help Choosing the Right Equipment?
          </h2>

          <p
            className="
              mt-4

              max-w-2xl
              mx-auto

              text-blue-100
            "
          >
            Skip traditional forms. Use our guided inquiry system
            and we'll help you find the right medical solution.
          </p>

          <div className="mt-8">
            <Link
              href="/inquiry"
              className="
                inline-flex items-center

                px-8 py-4

                rounded-2xl

                bg-white

                text-blue-600
                font-semibold

                hover:shadow-xl

                transition-all duration-300
              "
            >
              Go To Inquiry
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}