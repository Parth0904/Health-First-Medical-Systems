import { CANONICAL_SITE_ORIGIN } from "./catalog.js";

function sanitizeSingleLine(value = "") {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Generate a plain-text WhatsApp enquiry response containing selected product
 * names and canonical URLs in selection order (deduplicated by product id).
 */
export function buildWhatsAppEnquiryMessage({
  customerName = "",
  selectedProducts = [],
}) {
  if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
    throw new Error("At least one product is required to generate a message.");
  }

  const seenIds = new Set();
  const uniqueProducts = [];
  for (const product of selectedProducts) {
    if (!product || !product.id || seenIds.has(product.id)) continue;
    seenIds.add(product.id);
    uniqueProducts.push(product);
  }

  if (uniqueProducts.length === 0) {
    throw new Error("At least one valid product is required.");
  }

  const cleanName = sanitizeSingleLine(customerName);
  const greeting = cleanName ? `Hello ${cleanName},` : "Hello,";

  const introLine =
    uniqueProducts.length === 1
      ? "Here is the product you requested:"
      : "Here are the products you requested:";

  const productBlocks = uniqueProducts.map((product, index) => {
    const cleanProductName = sanitizeSingleLine(product.name) || "Product";
    return `${index + 1}. ${cleanProductName}\n${product.url}`;
  });

  return [
    greeting,
    "",
    "Thank you for your interest in Health First Medical Systems.",
    "",
    introLine,
    "",
    ...productBlocks.flatMap((block, idx) =>
      idx < productBlocks.length - 1 ? [block, ""] : [block],
    ),
    "",
    "Please let us know if you would like more information, pricing, or assistance.",
    "",
    "Health First Medical Systems",
    "Call us at +918047695066",
    CANONICAL_SITE_ORIGIN,
  ].join("\n");
}

/**
 * Build WhatsApp's standard click-to-chat URL with prefilled encoded message.
 */
export function buildWhatsAppClickToChatUrl(normalizedPhone, message) {
  if (!/^91[6-9]\d{9}$/.test(normalizedPhone || "")) {
    throw new Error("A valid normalized Indian phone number is required.");
  }
  if (typeof message !== "string" || !message.trim()) {
    throw new Error("A generated message is required.");
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

