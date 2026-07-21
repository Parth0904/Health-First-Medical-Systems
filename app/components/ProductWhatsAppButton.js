"use client";

export default function ProductWhatsAppButton({ productName, productUrl }) {
  const handleClick = () => {
    const fullUrl = window.location.origin + productUrl;

    const message = `Hello,

I am interested in the following product:

Product: ${productName}

Product Link:
${fullUrl}

Could you please provide more information about this product, including pricing, specifications, and availability?

Thank you!`;

    window.open(
      `https://wa.me/919920986401?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex mt-10 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-semibold"
    >
      Contact on WhatsApp
    </button>
  );
}
