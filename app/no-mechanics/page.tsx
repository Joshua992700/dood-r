"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NoMechanicsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-red-500/[0.03] blur-3xl pointer-events-none" />

            {/* Illustration */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative mb-8"
            >
                {/* Outer ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 rounded-full border border-dashed border-white/10"
                />
                {/* Inner content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-[#141414] border border-white/5 flex items-center justify-center">
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl"
                        >
                            🔧
                        </motion.div>
                    </div>
                </div>
                {/* X marks at compass positions */}
                {[0, 90, 180, 270].map((deg) => (
                    <motion.div
                        key={deg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + deg / 500 }}
                        className="absolute top-1/2 left-1/2 text-red-400/50 text-xs font-bold"
                        style={{
                            transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-58px) rotate(-${deg}deg)`,
                        }}
                    >
                        ✕
                    </motion.div>
                ))}
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-10"
            >
                <h1 className="text-2xl font-bold text-white mb-2">No Mechanics Found</h1>
                <p className="text-sm text-gray-400 max-w-[260px] leading-relaxed">
                    We couldn&apos;t find any available mechanics near your location right now. Please try again in a few minutes.
                </p>
            </motion.div>

            {/* Possible reasons */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="w-full space-y-2.5 mb-8"
            >
                {[
                    { icon: "📍", text: "No mechanics available in your area" },
                    { icon: "🕐", text: "Service hours may have ended (8 AM – 8 PM)" },
                    { icon: "📶", text: "Check your internet connection" },
                ].map((reason, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + i * 0.08 }}
                        className="flex items-center gap-3 bg-[#141414] border border-white/5 rounded-2xl px-4 py-3"
                    >
                        <span className="text-base">{reason.icon}</span>
                        <span className="text-xs text-gray-400">{reason.text}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full space-y-3"
            >
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/radar")}
                    className="w-full bg-[#D2FF1D] hover:bg-[#c2ec14] text-black font-bold text-sm rounded-2xl py-4 transition-all shadow-lg shadow-[#D2FF1D]/10 cursor-pointer"
                >
                    Try Again
                </motion.button>
                <button
                    onClick={() => router.push("/main")}
                    className="w-full py-3.5 rounded-2xl border border-white/10 text-gray-400 text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer"
                >
                    Back to Home
                </button>
            </motion.div>
        </div>
    );
}
