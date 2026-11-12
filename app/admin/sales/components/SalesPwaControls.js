"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Download, RefreshCw, Share, X } from "lucide-react";

const noopSubscribe = () => () => {};

function subscribeDisplayMode(callback) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", callback);
  window.addEventListener("appinstalled", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("appinstalled", callback);
  };
}

function getStandaloneSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function getIosSnapshot() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent || "";
  const isAppleMobile =
    /iPad|iPhone|iPod/i.test(ua) ||
    (window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1);
  return isAppleMobile && !/CriOS|FxiOS|EdgiOS/i.test(ua);
}

export default function SalesPwaControls() {
  const isStandalone = useSyncExternalStore(
    subscribeDisplayMode,
    getStandaloneSnapshot,
    () => false,
  );
  const isIosSafari = useSyncExternalStore(
    noopSubscribe,
    getIosSnapshot,
    () => false,
  );

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPromptingInstall, setIsPromptingInstall] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);

  const userTriggeredUpdateRef = useRef(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }

    function handleAppInstalled() {
      setDeferredPrompt(null);
      setShowIosGuide(false);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return undefined;
    }

    let isMounted = true;
    let registrationRef = null;
    let activeInstallingWorker = null;

    function watchInstallingWorker(worker) {
      if (!worker) return;
      activeInstallingWorker = worker;
      worker.addEventListener("statechange", () => {
        if (
          isMounted &&
          worker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          setWaitingWorker(worker);
        }
      });
    }

    function handleControllerChange() {
      if (userTriggeredUpdateRef.current) {
        window.location.reload();
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && registrationRef) {
        registrationRef.update().catch(() => {});
      }
    }

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    navigator.serviceWorker
      .register("/admin/sales/sw.js", {
        scope: "/admin/sales/",
        updateViaCache: "none",
      })
      .then((registration) => {
        if (!isMounted) return;
        registrationRef = registration;

        if (registration.waiting && navigator.serviceWorker.controller) {
          setWaitingWorker(registration.waiting);
        }

        if (registration.installing) {
          watchInstallingWorker(registration.installing);
        }

        registration.addEventListener("updatefound", () => {
          watchInstallingWorker(registration.installing);
        });
      })
      .catch(() => {
        // Ignore registration failures in unsupported/restricted contexts.
      });

    return () => {
      isMounted = false;
      activeInstallingWorker = null;
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      void activeInstallingWorker;
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt || isPromptingInstall) return;

    setIsPromptingInstall(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice?.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } catch {
      // User dismissed or prompt failed; leave state clean.
    } finally {
      setIsPromptingInstall(false);
    }
  }

  function handleApplyUpdate() {
    if (!waitingWorker || isApplyingUpdate) return;
    setIsApplyingUpdate(true);
    userTriggeredUpdateRef.current = true;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }

  const showInstallButton = !isStandalone && Boolean(deferredPrompt);
  const showIosInstallOption = !isStandalone && !deferredPrompt && isIosSafari;

  if (!showInstallButton && !showIosInstallOption && !waitingWorker) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
      {(showInstallButton || showIosInstallOption) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            Install <strong className="text-slate-800">Health First Sales</strong>{" "}
            for quick standalone access.
          </p>

          {showInstallButton && (
            <button
              type="button"
              onClick={handleInstallClick}
              disabled={isPromptingInstall}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white text-xs font-semibold transition cursor-pointer disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPromptingInstall ? "Installing..." : "Install App"}</span>
            </button>
          )}

          {showIosInstallOption && (
            <button
              type="button"
              onClick={() => setShowIosGuide((prev) => !prev)}
              aria-expanded={showIosGuide}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Share className="w-3.5 h-3.5" />
              <span>Install on iOS</span>
            </button>
          )}
        </div>
      )}

      {showIosInstallOption && showIosGuide && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50/80 px-3.5 py-2.5 text-xs text-blue-900">
          <p className="leading-relaxed">
            In Safari, tap the <strong>Share</strong> icon in the toolbar, then
            choose <strong>Add to Home Screen</strong> to install{" "}
            <strong>HF Sales</strong>.
          </p>
          <button
            type="button"
            onClick={() => setShowIosGuide(false)}
            aria-label="Dismiss iOS install instructions"
            className="p-1 rounded-md text-blue-700 hover:bg-blue-100 shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {waitingWorker && (
        <div
          role="status"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs text-blue-900"
        >
          <span className="font-medium">
            A new version of Health First Sales is ready.
          </span>
          <button
            type="button"
            onClick={handleApplyUpdate}
            disabled={isApplyingUpdate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white text-xs font-semibold transition cursor-pointer disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isApplyingUpdate ? "animate-spin" : ""}`}
            />
            <span>{isApplyingUpdate ? "Updating..." : "Refresh to Update"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

