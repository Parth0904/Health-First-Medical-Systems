"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHeartbeat, FaPause, FaPlay } from "react-icons/fa";

export default function TelemetryMonitor() {
  const [bpm, setBpm] = useState(72);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time fluctuating heart rate
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setBpm((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // fluctuate by -2 to +2
        const next = prev + delta;
        return next < 60 ? 60 : next > 100 ? 100 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="w-full flex flex-col items-center lg:items-end gap-4">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes stroke {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `,
        }}
      />

      {/* Top Integrated Trust Pills aligned directly to the dashboard box */}
      <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3 w-full max-w-[400px]">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/70 text-blue-700 text-xs font-bold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Trusted Partner
        </span>
        <Link
          href="https://www.indiamart.com/health-first-medicalsystems/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold transition hover:bg-amber-100/80 cursor-pointer"
        >
          <span className="text-sm">⭐</span>
          <span>4.7 on IndiaMart</span>
        </Link>
      </div>

      {/* Fully Interactive simulated clinical monitor panel */}
      <div className="relative w-full max-w-[400px] rounded-3xl bg-gray-950 p-6 border border-gray-800 shadow-2xl overflow-hidden group text-emerald-400 font-mono">
        {/* Subtle background scanning grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />

        {/* Header telemetry variables */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4 relative z-10 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-red-500 animate-pulse" : "bg-gray-600"}`}
            />
            <span className="font-bold text-white tracking-widest">
              ECG MONITOR - LEAD II
            </span>
          </div>
          <div className="text-[10px]">HEALTH FIRST CO.</div>
        </div>

        {/* Simulated Live Sweep Graph Area */}
        <div className="relative h-28 bg-gray-950/80 rounded-lg overflow-hidden border border-gray-900 flex items-center justify-center">
          <svg
            className="w-full h-full absolute inset-0 text-emerald-500 opacity-95"
            preserveAspectRatio="none"
            viewBox="0 0 300 100"
          >
            <path
              d="M 0,50 L 30,50 L 40,50 L 45,20 L 50,85 L 55,45 L 60,50 L 100,50 L 110,50 L 115,20 L 120,85 L 125,45 L 130,50 L 170,50 L 180,50 L 185,20 L 190,85 L 195,45 L 200,50 L 240,50 L 250,50 L 255,20 L 260,85 L 265,45 L 270,50 L 300,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={isLive ? "animate-[stroke_2s_linear_infinite]" : ""}
              style={{
                strokeDasharray: "300",
                strokeDashoffset: isLive ? "300" : "0",
              }}
            />
          </svg>
          {/* Scanline element */}
          {isLive && (
            <div className="absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent to-emerald-500/10 border-r border-emerald-500/30 animate-[sweep_2s_linear_infinite] pointer-events-none" />
          )}
        </div>

        {/* Vital Telemetry Parameters */}
        <div className="grid grid-cols-2 gap-4 mt-6 mb-4 relative z-10">
          <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-900">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5 mb-1">
              <FaHeartbeat className="text-red-500" /> Heart Rate
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">
                {isLive ? bpm : "--"}
              </span>
              <span className="text-xs text-gray-500 font-bold">BPM</span>
            </div>
          </div>

          <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-900">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-1">
              Signal Trace
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-emerald-400">
                Excellent
              </span>
            </div>
          </div>
        </div>

        {/* Control Panel Action bar */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-xs text-gray-400">
          <button
            onClick={() => setIsLive(!isLive)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition font-bold cursor-pointer"
          >
            {isLive ? (
              <>
                <FaPause className="text-[10px] text-amber-500" /> Pause Sweep
              </>
            ) : (
              <>
                <FaPlay className="text-[10px] text-emerald-500" /> Start Sweep
              </>
            )}
          </button>
          <div className="text-[10px] uppercase text-right tracking-widest text-gray-500">
            Diagnostic Node Live
          </div>
        </div>
      </div>
    </div>
  );
}
