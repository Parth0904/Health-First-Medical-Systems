"use client";

import { Phone, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { parseIndianWhatsAppNumber } from "@/lib/sales/phone";

export function validatePhoneNumber(value) {
  return parseIndianWhatsAppNumber(value).error;
}

export default function CustomerDetailsCard({
  phoneNumber,
  customerName,
  phoneTouched,
  onPhoneChange,
  onPhoneBlur,
  onCustomerNameChange,
}) {
  const phoneResult = parseIndianWhatsAppNumber(phoneNumber);
  const phoneError = phoneTouched ? phoneResult.error : "";
  const isPhoneValid = phoneResult.valid;

  return (
    <section
      aria-labelledby="customer-details-heading"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6"
    >
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2
            id="customer-details-heading"
            className="text-base font-bold text-slate-900"
          >
            Customer Details
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter an Indian WhatsApp number (+91 default) before generating a
            reply.
          </p>
        </div>
        {isPhoneValid && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ready
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="customer-phone"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>WhatsApp Phone Number</span>
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="customer-phone"
            name="customerPhone"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            required
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value)}
            onBlur={onPhoneBlur}
            aria-required="true"
            aria-invalid={Boolean(phoneError)}
            aria-describedby={
              phoneError ? "customer-phone-error" : "customer-phone-help"
            }
            placeholder="9876543210 or +91 98765 43210"
            className={`w-full h-11 px-3.5 rounded-lg border bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition ${
              phoneError
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
            }`}
          />
          {phoneError ? (
            <p
              id="customer-phone-error"
              role="alert"
              className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{phoneError}</span>
            </p>
          ) : (
            <p
              id="customer-phone-help"
              className="mt-1.5 text-[11px] text-slate-500"
            >
              {isPhoneValid
                ? `Normalized WhatsApp number: ${phoneResult.normalized}`
                : "Accepts 10-digit Indian numbers or +91 format (defaults to +91)."}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customer-name"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Customer Name</span>
            <span className="text-[11px] font-normal text-slate-400">
              (Optional)
            </span>
          </label>
          <input
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="off"
            maxLength={100}
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            aria-describedby="customer-name-help"
            placeholder="Rahul / Dr. Sharma"
            className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition"
          />
          <p
            id="customer-name-help"
            className="mt-1.5 text-[11px] text-slate-500"
          >
            Used to personalize the greeting in the generated message.
          </p>
        </div>
      </div>
    </section>
  );
}
