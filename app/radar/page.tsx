"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RadarPage() {
    const router = useRouter();
    const [statusText, setStatusText] = useState("Scanning nearby…");
    const [found, setFound] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setStatusText("Detecting mechanics in your area…"), 2000);
        const t2 = setTimeout(() => setStatusText("Mechanic found nearby!"), 4200);
        const t3 = setTimeout(() => setFound(true), 4200);
        const t4 = setTimeout(() => router.push("/mech"), 5500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [router]);

    // Generate random blip positions (static across renders)
    const blips = [
        { x: 35, y: 28, delay: 1.5 },
        { x: 68, y: 55, delay: 2.5 },
        { x: 22, y: 62, delay: 3.2 },
        { x: 75, y: 30, delay: 3.8 },
        { x: 50, y: 42, delay: 4.2 },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#D2FF1D]/[0.03] blur-3xl pointer-events-none" />

            {/* Title text */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 z-10"
            >
                <h1 className="text-2xl font-bold text-white mb-2">
                    Finding a Mechanic<br />Nearby to you...
                </h1>
                <motion.p
                    key={statusText}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-sm text-gray-400"
                >
                    {statusText}
                </motion.p>
            </motion.div>

            {/* Radar Container */}
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                {/* Concentric rings */}
                {[1, 2, 3, 4].map((ring) => (
                    <motion.div
                        key={ring}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ring * 0.15, duration: 0.5 }}
                        className="absolute rounded-full border border-[#D2FF1D]/10"
                        style={{
                            width: `${ring * 25}%`,
                            height: `${ring * 25}%`,
                        }}
                    />
                ))}

                {/* Cross-hair lines */}
                <div className="absolute w-full h-px bg-[#D2FF1D]/10" />
                <div className="absolute h-full w-px bg-[#D2FF1D]/10" />

                {/* Rotating sweep */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full"
                >
                    <div
                        className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                        style={{
                            background: `conic-gradient(from 0deg at 0% 100%, transparent 0deg, rgba(210,255,29,0.15) 30deg, transparent 60deg)`,
                        }}
                    />
                </motion.div>

                {/* Mechanic blips */}
                {blips.map((blip, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 1, 0.7], scale: [0, 1.3, 1, 1] }}
                        transition={{ delay: blip.delay, duration: 0.6 }}
                        className="absolute"
                        style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
                    >
                        {/* Ping ring */}
                        <motion.div
                            animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                            transition={{ delay: blip.delay + 0.3, duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                            className="absolute -inset-2 rounded-full bg-[#D2FF1D]/20"
                        />
                        {/* Dot */}
                        <div className={`w-3 h-3 rounded-full shadow-lg ${found && i === 4
                                ? "bg-[#D2FF1D] shadow-[#D2FF1D]/50"
                                : "bg-[#D2FF1D]/60 shadow-[#D2FF1D]/30"
                            }`} />
                    </motion.div>
                ))}

                {/* Center user dot */}
                <div className="relative z-10 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-10 h-10 rounded-full bg-[#D2FF1D]/10"
                    />
                    <div className="w-4 h-4 rounded-full bg-[#D2FF1D] shadow-lg shadow-[#D2FF1D]/40 ring-2 ring-[#D2FF1D]/30" />
                </div>
            </div>

            {/* Bottom text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-2 z-10"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[#D2FF1D]/30 border-t-[#D2FF1D] rounded-full"
                />
                <span className="text-xs text-gray-500 font-medium">
                    {found ? "Connecting you now…" : "This usually takes a few seconds"}
                </span>
            </motion.div>
        </div>
    );
}
