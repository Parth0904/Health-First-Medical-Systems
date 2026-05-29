"use client";

import { motion } from "framer-motion";

export default function PageHero({
  badge,
  title,
  description,
}) {
  return (
    <section
      className="
        relative
        overflow-hidden

        pt-28 md:pt-36
        pb-16 md:pb-24

        px-6
        md:px-12
        lg:px-24
      "
    >
      {/* Background */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-blue-50
          via-[#f5f9ff]
          to-transparent
        "
      />

      {/* Glow */}

      <div
        className="
          absolute

          top-0
          left-1/2

          -translate-x-1/2

          w-[700px]
          h-[400px]

          bg-blue-500/10

          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          relative

          max-w-6xl
          mx-auto

          text-center
        "
      >
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            inline-flex
            items-center

            gap-2

            px-5
            py-2.5

            rounded-full

            bg-white

            border
            border-blue-100

            shadow-sm

            text-blue-700
            text-sm
            font-semibold

            mb-8
          "
        >
          <span
            className="
              w-2
              h-2

              rounded-full

              bg-blue-600
            "
          />

          {badge}
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="
            text-4xl
            md:text-5xl
            lg:text-6xl

            font-extrabold

            tracking-tight

            text-gray-900

            leading-[1.05]

            max-w-5xl
            mx-auto
          "
        >
          {title}
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="
            mt-6

            max-w-3xl
            mx-auto

            text-base
            md:text-lg

            leading-relaxed

            text-gray-600
          "
        >
          {description}
        </motion.p>

        {/* Bottom Divider */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="
            mt-10

            w-32
            h-1

            mx-auto

            rounded-full

            bg-gradient-to-r
            from-blue-600
            to-cyan-500
          "
        />
      </div>
    </section>
  );
}