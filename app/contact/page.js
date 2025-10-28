"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        e.target.reset();
      } else {
        setStatus(`❌ ${data.error}`);
      }
    } catch (err) {
      setStatus("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-white py-20 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10"
    >
      {/* Left Side - Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions or need more information about our medical systems?
          Fill out the form, and our team will get back to you promptly.
        </p>

        <div className="text-gray-700 space-y-2">
          <p>📞 Call 08046074634</p>
          <p>👨‍💻 Shankar Dattatraya Shinde (Proprietor)</p>
          <p>
            📍 Health First Medical Systems A304, Madhuban Society, Railway
            Power House Road Mataji Mandir Road, Titwala, Kalyan, Thane-421605,
            Maharashtra, India
          </p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 bg-blue-50 rounded-2xl p-8 shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 w-full`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className="text-center text-sm mt-4 font-medium">{status}</p>
        )}
      </motion.form>
    </section>
  );
}
