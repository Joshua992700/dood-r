"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                         */
/* ------------------------------------------------------------------ */

const mechanic = {
    name: "Rahul Sharma",
    rating: 4.8,
    reviews: 312,
    specialty: "Car & Bike Expert",
    experience: "6 yrs",
    phone: "+91 98765 43210",
    vehicleNumber: "DL 4C AB 1234",
    vehicleType: "Honda Activa (Blue)",
    eta: 8, // minutes
    avatar: "RS",
    distance: "1.2 km away",
};

const etaSteps = [
    { label: "Confirmed", done: true },
    { label: "On the way", done: true },
    { label: "Arriving", done: false },
    { label: "Servicing", done: false },
];

/* ------------------------------------------------------------------ */
/*  Route dots for the dummy map                                      */
/* ------------------------------------------------------------------ */

const routePath = [
    { x: 72, y: 25 },
    { x: 65, y: 30 },
    { x: 58, y: 38 },
    { x: 53, y: 44 },
    { x: 50, y: 50 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MechPage() {
    const router = useRouter();
    const [eta, setEta] = useState(mechanic.eta);

    // Simulate ETA countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setEta((prev) => (prev > 1 ? prev - 1 : 1));
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
            {/* ============================================================ */}
            {/*  DUMMY MAP AREA                                              */}
            {/* ============================================================ */}
            <div className="relative h-[44vh] bg-[#111113] overflow-hidden flex-shrink-0">
                {/* Grid pattern to simulate map */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Abstract road lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Main road */}
                    <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    {/* Diagonal roads */}
                    <line x1="20" y1="20" x2="80" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
                    <line x1="80" y1="20" x2="20" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
                </svg>

                {/* Route line from mechanic to user */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d={`M ${routePath.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
                        fill="none"
                        stroke="#D2FF1D"
                        strokeWidth="0.8"
                        strokeDasharray="3 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />
                </svg>

                {/* Mechanic marker */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                    className="absolute"
                    style={{ left: "72%", top: "25%", transform: "translate(-50%, -50%)" }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-3 rounded-full bg-[#D2FF1D]/20"
                    />
                    <div className="w-8 h-8 rounded-full bg-[#1c1c1e] border-2 border-[#D2FF1D] flex items-center justify-center text-[10px] font-bold text-[#D2FF1D] shadow-lg shadow-[#D2FF1D]/20">
                        🔧
                    </div>
                </motion.div>

                {/* User marker */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                    className="absolute"
                    style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                    <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute -inset-4 rounded-full bg-[#D2FF1D]/15"
                    />
                    <div className="w-8 h-8 rounded-full bg-[#D2FF1D] flex items-center justify-center text-sm shadow-lg shadow-[#D2FF1D]/30">
                        📍
                    </div>
                </motion.div>

                {/* Building blocks to simulate map structures */}
                {[
                    { x: 15, y: 20, w: 12, h: 10 },
                    { x: 30, y: 65, w: 10, h: 14 },
                    { x: 78, y: 60, w: 14, h: 10 },
                    { x: 15, y: 75, w: 8, h: 8 },
                    { x: 60, y: 70, w: 10, h: 10 },
                    { x: 85, y: 40, w: 8, h: 12 },
                ].map((b, i) => (
                    <div
                        key={i}
                        className="absolute rounded-md bg-white/[0.03] border border-white/[0.04]"
                        style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
                    />
                ))}

                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-[#1a1a1c] transition-colors z-10"
                >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                {/* ETA badge on map */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a0a0a]/85 backdrop-blur-xl rounded-full px-5 py-2.5 border border-white/10 flex items-center gap-2 z-10"
                >
                    <div className="w-2 h-2 rounded-full bg-[#D2FF1D] animate-pulse" />
                    <span className="text-sm font-bold text-white">
                        {eta} min
                    </span>
                    <span className="text-xs text-gray-400">away</span>
                </motion.div>
            </div>

            {/* ============================================================ */}
            {/*  BOTTOM SHEET                                                 */}
            {/* ============================================================ */}
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="flex-1 bg-[#141414] rounded-t-[28px] -mt-6 relative z-10 border-t border-white/5 flex flex-col"
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-10 h-1 rounded-full bg-white/15" />
                </div>

                <div className="px-5 pb-6 flex-1 flex flex-col">
                    {/* Progress steps */}
                    <div className="flex items-center gap-1 mb-5">
                        {etaSteps.map((step, i) => (
                            <div key={step.label} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`h-1 w-full rounded-full ${step.done ? "bg-[#D2FF1D]" : "bg-white/10"
                                            }`}
                                    />
                                    <span
                                        className={`text-[9px] mt-1.5 font-medium ${step.done ? "text-[#D2FF1D]" : "text-gray-600"
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {i < etaSteps.length - 1 && <div className="w-1" />}
                            </div>
                        ))}
                    </div>

                    {/* Mechanic card */}
                    <div className="bg-[#1c1c1e] rounded-3xl p-4 border border-white/5 mb-4">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D2FF1D]/20 to-[#D2FF1D]/5 border border-[#D2FF1D]/20 flex items-center justify-center text-lg font-bold text-[#D2FF1D] shrink-0">
                                {mechanic.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold text-base truncate">{mechanic.name}</h3>
                                <p className="text-xs text-gray-400">{mechanic.specialty}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[#D2FF1D] text-xs">⭐ {mechanic.rating}</span>
                                    <span className="text-gray-600 text-xs">({mechanic.reviews} reviews)</span>
                                    <span className="text-gray-600 text-[10px]">•</span>
                                    <span className="text-gray-500 text-xs">{mechanic.experience}</span>
                                </div>
                            </div>
                            {/* Call & Chat */}
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => router.push("/chat")} className="w-10 h-10 rounded-full bg-[#D2FF1D]/10 border border-[#D2FF1D]/20 flex items-center justify-center cursor-pointer hover:bg-[#D2FF1D]/20 transition-colors">
                                    <svg className="w-4 h-4 text-[#D2FF1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-[#D2FF1D] flex items-center justify-center cursor-pointer hover:bg-[#c2ec14] active:scale-95 transition-all">
                                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle & Trip info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#1c1c1e] rounded-2xl p-3.5 border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Vehicle</p>
                            <p className="text-sm text-white font-medium leading-tight">{mechanic.vehicleType}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{mechanic.vehicleNumber}</p>
                        </div>
                        <div className="bg-[#1c1c1e] rounded-2xl p-3.5 border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Distance</p>
                            <p className="text-sm text-white font-medium">{mechanic.distance}</p>
                            <p className="text-xs text-gray-400 mt-0.5">ETA: {eta} minutes</p>
                        </div>
                    </div>

                    {/* OTP Pin */}
                    <div className="bg-[#1c1c1e] rounded-2xl p-4 border border-white/5 mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Share this OTP</p>
                            <p className="text-xs text-gray-400">Show this to mechanic to start service</p>
                        </div>
                        <div className="flex gap-1.5">
                            {["4", "7", "2", "9"].map((d, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    className="w-9 h-10 rounded-lg bg-[#D2FF1D]/10 border border-[#D2FF1D]/20 flex items-center justify-center text-[#D2FF1D] font-bold text-base"
                                >
                                    {d}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-auto space-y-2.5">
                        <button
                            onClick={() => router.push("/rating")}
                            className="w-full py-3.5 rounded-2xl bg-[#D2FF1D] text-black text-sm font-bold hover:bg-[#c2ec14] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#D2FF1D]/10"
                        >
                            Service Complete ✓
                        </button>
                        <button className="w-full py-3.5 rounded-2xl border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-colors cursor-pointer">
                            Cancel Service
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
