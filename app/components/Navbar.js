"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const menuPanelRef = useRef(null);
  const triggerRef = useRef(null);

  // Scroll progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuPanelRef.current &&
        !menuPanelRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Focus trap inside the menu panel
  useEffect(() => {
    if (!isOpen || !menuPanelRef.current) return;
    const focusableElements = menuPanelRef.current.querySelectorAll(
      "a[href], button:not([disabled])",
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    const currentMenuPanel = menuPanelRef.current;
    currentMenuPanel.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => {
      currentMenuPanel.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/category" },
    { name: "Brands", href: "/brand" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      className="bg-white/95 backdrop-blur-xl text-gray-800 fixed w-full z-50 top-0 border-b border-blue-100/50 shadow-[0_4px_30px_rgba(37,99,235,0.05)]"
    >
      {/* Scroll progress bar */}
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

          {/* Desktop Links (Visible at lg breakpoint) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full px-2 py-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${pathname === link.href ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" : "text-gray-600 hover:text-gray-900 hover:bg-white/70"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Trigger Button (Visible below lg breakpoint) */}
          <div className="lg:hidden flex items-center">
            <button
              ref={triggerRef}
              onClick={toggleMenu}
              className="relative w-11 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              title={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-gray-800" />
              ) : (
                <Menu className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
            />

            {/* Slide-down Menu Panel */}
            <motion.div
              ref={menuPanelRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed top-[72px] left-4 right-4 z-50"
            >
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md p-4">
                {/* Links */}
                <div className="space-y-1.5">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-5 py-4 rounded-lg text-sm font-semibold transition-all duration-300 ${pathname === link.href ? "bg-blue-700 text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      <span>{link.name}</span>
                      <span
                        className={
                          pathname === link.href
                            ? "text-white/80"
                            : "text-gray-400"
                        }
                      >
                        →
                      </span>
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
