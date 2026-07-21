"use client";

export default function MobileContactBar({ productName, productUrl }) {
  const handleWhatsApp = () => {
    const message = `Hello,

I am interested in:

${productName}

${productUrl}

My Name:
My Location:`;

    window.open(
      `https://wa.me/919920986401?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 p-3">
      <div className="grid grid-cols-2 gap-3">
        <a
          href="tel:+919920986401"
          className="py-4 rounded-2xl bg-blue-600 text-white text-center font-semibold"
        >
          📞 Call Now
        </a>

        <button
          onClick={handleWhatsApp}
          className="py-4 rounded-2xl bg-[#25D366] text-white font-semibold"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}
