import React from 'react'
import Link from 'next/link'

   const PrimaryButton = ({ text, link }) => (
  <Link href={link}>
    <button className="bg-linear-to-r from-yellow-400 to-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md m-2 cursor-pointer flex items-center gap-2 group">
      {text}
      <svg
        xmlns="www.w3.org"
        className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </button>
  </Link>
);

export default PrimaryButton
