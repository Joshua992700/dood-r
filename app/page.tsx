"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function EntrySplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Add a slight delay before navigating to ensure the exit animation is fully enjoyed
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [0.9, 1, 1, 35],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          times: [0, 0.3, 0.75, 1], // Fade in, hold, then zoom quickly
          ease: "easeInOut"
        }}
        className="flex justify-center items-center select-none"
      >
        <span className="text-6xl md:text-8xl font-black tracking-tighter text-white">
          DOOD
        </span>
        <span className="text-6xl md:text-8xl font-black tracking-tighter text-[#D2FF1D]">
          .
        </span>
      </motion.div>

      {/* Subtle background pulse mimicking Uber's map circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5], opacity: [0, 0.1, 0] }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-white/10 pointer-events-none"
      />
    </div>
  );
}