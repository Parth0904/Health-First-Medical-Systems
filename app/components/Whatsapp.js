import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9920986401"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-[0_10px_35px_rgba(37,211,102,0.35)] flex items-center justify-center hover:scale-105 transition-all duration-300"
    >
      <span
        className="absolute right-16 whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        Chat on WhatsApp
      </span>
      <FaWhatsapp size={28} />
    </a>
  );
}
