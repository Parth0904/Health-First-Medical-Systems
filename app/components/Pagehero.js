"use client";
import { motion } from "framer-motion";

export default function PageHero({ badge, title, description }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20 px-6 md:px-12 lg:px-24 bg-slate-50 border-b border-slate-200/60">
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200/80 shadow-xs text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          {badge}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-5xl mx-auto"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-5 max-w-3xl mx-auto text-sm md:text-base leading-relaxed text-slate-500 font-semibold"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
