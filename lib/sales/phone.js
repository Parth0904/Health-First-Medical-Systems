/**
 * Parse and validate an Indian WhatsApp phone number, normalizing valid numbers
 * to international format without '+' (e.g. 919876543210).
 * Rejects invalid formats and arbitrary non-Indian international numbers.
 */
export function parseIndianWhatsAppNumber(input = "") {
  if (typeof input !== "string") {
    return {
      valid: false,
      normalized: "",
      error: "Customer WhatsApp phone number is required.",
    };
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return {
      valid: false,
      normalized: "",
      error: "Customer WhatsApp phone number is required.",
    };
  }

  // Only allow optional leading '+' plus digits, spaces, parentheses, and hyphens.
  if (!/^\+?[\d\s()-]+$/.test(trimmed)) {
    return {
      valid: false,
      normalized: "",
      error:
        "Enter a valid Indian phone number using digits, spaces, dashes, or a leading +91.",
    };
  }

  const compact = trimmed.replace(/[\s()-]/g, "");

  if (compact.startsWith("+")) {
    const digitsAfterPlus = compact.slice(1);
    if (!digitsAfterPlus.startsWith("91")) {
      return {
        valid: false,
        normalized: "",
        error:
          "Only Indian (+91) WhatsApp numbers are supported. International numbers cannot be converted.",
      };
    }

    const subscriber = digitsAfterPlus.slice(2);
    if (!/^[6-9]\d{9}$/.test(subscriber)) {
      return {
        valid: false,
        normalized: "",
        error:
          "Enter a valid 10-digit Indian mobile number after +91 (starting with 6–9).",
      };
    }

    return {
      valid: true,
      normalized: `91${subscriber}`,
      error: "",
    };
  }

  // Reject explicit '00' international dialing prefix.
  if (compact.startsWith("00")) {
    return {
      valid: false,
      normalized: "",
      error:
        "Only Indian (+91) WhatsApp numbers are supported. International numbers cannot be converted.",
    };
  }

  if (compact.length === 10) {
    if (!/^[6-9]\d{9}$/.test(compact)) {
      return {
        valid: false,
        normalized: "",
        error:
          "Enter a valid 10-digit Indian mobile number starting with 6–9.",
      };
    }
    return {
      valid: true,
      normalized: `91${compact}`,
      error: "",
    };
  }

  if (compact.length === 11 && compact.startsWith("0")) {
    const subscriber = compact.slice(1);
    if (!/^[6-9]\d{9}$/.test(subscriber)) {
      return {
        valid: false,
        normalized: "",
        error:
          "Enter a valid 10-digit Indian mobile number starting with 6–9.",
      };
    }
    return {
      valid: true,
      normalized: `91${subscriber}`,
      error: "",
    };
  }

  if (compact.length === 12) {
    if (!compact.startsWith("91")) {
      return {
        valid: false,
        normalized: "",
        error:
          "Only Indian (+91) WhatsApp numbers are supported. Enter a 10-digit number or prefix with +91.",
      };
    }

    const subscriber = compact.slice(2);
    if (!/^[6-9]\d{9}$/.test(subscriber)) {
      return {
        valid: false,
        normalized: "",
        error:
          "Enter a valid 10-digit Indian mobile number after 91 (starting with 6–9).",
      };
    }

    return {
      valid: true,
      normalized: `91${subscriber}`,
      error: "",
    };
  }

  return {
    valid: false,
    normalized: "",
    error:
      "Enter a valid 10-digit Indian WhatsApp number (e.g. 9876543210 or +91 98765 43210).",
  };
}

