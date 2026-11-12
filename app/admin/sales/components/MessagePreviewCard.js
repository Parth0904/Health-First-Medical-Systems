"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function MessagePreviewCard({
  customerName,
  normalizedPhone,
  isPhoneValid,
  selectedProductsCount,
  canGenerate,
  generatedMessage,
  isMessageReady,
  wasInvalidated,
  whatsappUrl,
  onGenerateMessage,
}) {
  const [isCopying, setIsCopying] = useState(false);
  const [feedback, setFeedback] = useState({
    forMessage: "",
    copied: false,
    error: "",
  });
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  const copyTimerRef = useRef(null);
  const openTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  const copySuccess =
    isMessageReady &&
    feedback.copied &&
    feedback.forMessage === generatedMessage;
  const actionError =
    isMessageReady && feedback.forMessage === generatedMessage
      ? feedback.error
      : "";

  async function handleCopy() {
    if (!isMessageReady || !generatedMessage || isCopying) return;

    const targetMessage = generatedMessage;
    setIsCopying(true);
    setFeedback({ forMessage: targetMessage, copied: false, error: "" });

    try {
      if (!navigator?.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(targetMessage);
      setFeedback({ forMessage: targetMessage, copied: true, error: "" });
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => {
        setFeedback((prev) =>
          prev.forMessage === targetMessage ? { ...prev, copied: false } : prev,
        );
      }, 3000);
    } catch {
      setFeedback({
        forMessage: targetMessage,
        copied: false,
        error:
          "Unable to access your clipboard. Please select and copy the message manually from the preview box.",
      });
    } finally {
      setIsCopying(false);
    }
  }

  function handleOpenWhatsApp() {
    if (!isMessageReady || !whatsappUrl || isOpeningWhatsApp) return;

    const targetMessage = generatedMessage;
    setFeedback((prev) => ({ ...prev, forMessage: targetMessage, error: "" }));
    setIsOpeningWhatsApp(true);

    try {
      const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        setFeedback({
          forMessage: targetMessage,
          copied: false,
          error:
            "Your browser blocked the WhatsApp tab. Allow pop-ups for this site or copy the message manually.",
        });
      }
    } finally {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      openTimerRef.current = setTimeout(() => {
        setIsOpeningWhatsApp(false);
      }, 600);
    }
  }

  const trimmedName = customerName.trim();

  function getRequirementHint() {
    if (!isPhoneValid && selectedProductsCount === 0) {
      return "Enter a valid Indian WhatsApp number and select at least one product to generate a message.";
    }
    if (!isPhoneValid) {
      return "Enter a valid Indian WhatsApp number to enable message generation.";
    }
    if (selectedProductsCount === 0) {
      return "Select at least one product from the catalog to enable message generation.";
    }
    return "Click Generate Message to prepare the formatted WhatsApp reply for review.";
  }

  return (
    <aside
      aria-labelledby="message-preview-heading"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 lg:sticky lg:top-24 space-y-5"
    >
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h2
              id="message-preview-heading"
              className="text-base font-bold text-slate-900"
            >
              WhatsApp Message Preview
            </h2>
            <p className="text-xs text-slate-500">
              Review before copying or opening WhatsApp
            </p>
          </div>
        </div>

        {isMessageReady && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            Ready
          </span>
        )}
      </div>

      {/* Recipient summary */}
      <div className="rounded-lg bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <span className="text-slate-500 font-medium">WhatsApp Target</span>
        <span className="font-semibold text-slate-800">
          {isPhoneValid
            ? trimmedName
              ? `${trimmedName} (+${normalizedPhone})`
              : `+${normalizedPhone}`
            : "Valid Indian number required"}
        </span>
      </div>

      {/* Stale message notice */}
      {wasInvalidated && !isMessageReady && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-800"
        >
          <RefreshCw className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Details or selected products changed. Click{" "}
            <strong>Generate Message</strong> to refresh the preview before
            copying or sending.
          </span>
        </div>
      )}

      {/* Message preview box */}
      <div>
        <label
          htmlFor="whatsapp-message-preview"
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          Message Preview
        </label>
        <div
          id="whatsapp-message-preview"
          role="region"
          aria-live="polite"
          className={`min-h-[240px] max-h-[420px] overflow-y-auto rounded-xl border p-4 text-xs leading-relaxed ${
            isMessageReady
              ? "border-slate-300 bg-white text-slate-800 select-all"
              : "border-slate-200 bg-slate-50/70 text-slate-500 flex items-center justify-center text-center"
          }`}
        >
          {isMessageReady ? (
            <pre className="whitespace-pre-wrap break-words font-sans text-xs text-slate-800 leading-relaxed">
              {generatedMessage}
            </pre>
          ) : (
            <p className="max-w-xs">{getRequirementHint()}</p>
          )}
        </div>
      </div>

      {/* Action feedback alerts */}
      {copySuccess && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-medium text-emerald-800"
        >
          <Check className="w-4 h-4 shrink-0" />
          <span>Message copied to clipboard.</span>
        </div>
      )}

      {actionError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Workflow actions */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={onGenerateMessage}
          disabled={!canGenerate}
          className="w-full h-10 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {isMessageReady ? "Regenerate Message" : "Generate Message"}
          </span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!isMessageReady || isCopying}
            className="h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
          >
            {copySuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Message</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            disabled={!isMessageReady || isOpeningWhatsApp}
            className="h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in WhatsApp</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 text-center pt-1">
          WhatsApp opens in a new tab with the message prefilled for your final
          review before sending.
        </p>
      </div>
    </aside>
  );
}
