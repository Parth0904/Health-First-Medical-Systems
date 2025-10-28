"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Basic styling (optional — can be customized)
NProgress.configure({ showSpinner: false, speed: 400, trickleSpeed: 200 });

export default function TopLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Simulate a delay for smoother experience
    const timer = setTimeout(() => {
      NProgress.done();
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
