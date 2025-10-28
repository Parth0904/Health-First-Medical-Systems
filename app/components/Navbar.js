"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white text-gray-800 fixed w-full z-50 shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-blue-700">
              Health<span className="text-blue-500">First</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-base font-medium">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`relative transition-colors duration-300 hover:text-blue-600 ${
                  pathname === link.href
                    ? "text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
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

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-blue-50 border-t border-blue-100">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`block px-6 py-3 text-gray-800 font-medium transition-colors duration-200 hover:bg-blue-100 ${
                pathname === link.href ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
