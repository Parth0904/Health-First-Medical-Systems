"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion,AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const menuRef = useRef();

  // ✅ Scroll progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      className="
  bg-white/95
  backdrop-blur-xl

  text-gray-800

  fixed w-full z-50 top-0

  border-b border-blue-100/50

  shadow-[0_4px_30px_rgba(37,99,235,0.05)]
"
    >
      {/* ✅ Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-blue-700">
              Health<span className="text-cyan-500">First</span>
            </Link>
          </div>

         {/* Desktop Links */}
<div className="hidden md:flex items-center gap-3">

  {/* NAV LINKS */}
  <div className="
    flex items-center gap-1
    bg-slate-50 border border-slate-200
    rounded-full px-2 py-2
  ">
    {links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={`
          relative px-4 py-2 rounded-full
          text-sm font-medium
          transition-all duration-300
          ${
            pathname === link.href
              ? "bg-blue-50 text-blue-700 border border-blue-100"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
          }
        `}
      >
        {link.name}
      </Link>
    ))}
  </div>
</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
           <button
  onClick={toggleMenu}
  className="
    relative w-11 h-11
    rounded-2xl
    bg-gray-100 hover:bg-gray-200
    flex items-center justify-center
    transition-all duration-300
  "
              aria-label={isOpen ? "Close menu" : "Open menu"}
              title={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

     {/* MOBILE MENU */}
<AnimatePresence>
  {isOpen && (
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="
          md:hidden fixed inset-0
          bg-slate-900/40 backdrop-blur-sm
          z-40
        "
      />

      {/* MENU PANEL */}
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="
          md:hidden fixed top-[72px] left-4 right-4
          z-50
        "
      >

        <div className="
          overflow-hidden rounded-3xl
          border border-white/40
          bg-white/90 backdrop-blur-2xl
          shadow-2xl
          p-4
        ">

          {/* LINKS */}
          <div className="space-y-2">

            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center justify-between
                  px-4 py-4 rounded-2xl
                  text-sm font-medium
                  transition-all duration-300
                  ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span>{link.name}</span>

                <span className="text-gray-400">→</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </motion.nav>
  );
}
