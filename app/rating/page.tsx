"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const mechanic = {
    name: "Rahul Sharma",
    specialty: "Car & Bike Expert",
    avatar: "RS",
};

const ratingLabels = ["", "Terrible", "Bad", "Okay", "Good", "Excellent"];

const feedbackTags = [
    "On Time",
    "Professional",
    "Fair Pricing",
    "Skilled",
    "Friendly",
    "Clean Work",
    "Good Communication",
    "Quick Service",
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function RatingPage() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = () => {
        if (rating === 0) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => router.push("/main"), 2000);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
            >
                <div className="flex items-center gap-3 px-5 py-4">
                    <button
                        onClick={() => router.back()}
                        className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/5 flex items-center justify-center cursor-pointer hover:bg-[#252527] transition-colors"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold">Rate Your Experience</h1>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {submitted ? (
                    /* ─── Success State ─── */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center px-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-24 h-24 rounded-full bg-[#D2FF1D]/10 border-2 border-[#D2FF1D]/30 flex items-center justify-center mb-5"
                        >
                            <span className="text-5xl">🎉</span>
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                        <p className="text-sm text-gray-400 text-center max-w-[250px]">
                            Your feedback helps us improve our service and helps other users find great mechanics.
                        </p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 flex items-center gap-2"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-[#D2FF1D]/30 border-t-[#D2FF1D] rounded-full"
                            />
                            <span className="text-xs text-gray-500">Redirecting to home…</span>
                        </motion.div>
                    </motion.div>
                ) : (
                    /* ─── Rating Form ─── */
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="flex-1 flex flex-col px-5 pt-6 pb-8"
                    >
                        {/* Mechanic mini card */}
                        <div className="flex items-center gap-3 bg-[#141414] rounded-2xl p-4 border border-white/5 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D2FF1D]/20 to-[#D2FF1D]/5 border border-[#D2FF1D]/20 flex items-center justify-center text-sm font-bold text-[#D2FF1D] shrink-0">
                                {mechanic.avatar}
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-sm">{mechanic.name}</h3>
                                <p className="text-xs text-gray-500">{mechanic.specialty}</p>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="text-center mb-2">
                            <p className="text-sm text-gray-400 mb-4">How was the service?</p>
                            <div className="flex justify-center gap-2 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        onClick={() => setRating(star)}
                                        className="cursor-pointer p-1"
                                    >
                                        <svg
                                            className={`w-10 h-10 transition-colors duration-150 ${star <= (hoveredStar || rating)
                                                    ? "text-[#D2FF1D] drop-shadow-[0_0_6px_rgba(210,255,29,0.3)]"
                                                    : "text-gray-700"
                                                }`}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </motion.button>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                {(hoveredStar || rating) > 0 && (
                                    <motion.p
                                        key={hoveredStar || rating}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-sm font-semibold text-[#D2FF1D]"
                                    >
                                        {ratingLabels[hoveredStar || rating]}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Feedback Tags */}
                        <AnimatePresence>
                            {rating > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6"
                                >
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                                        What went well?
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {feedbackTags.map((tag, i) => (
                                            <motion.button
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.04 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleTag(tag)}
                                                className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-colors cursor-pointer ${selectedTags.includes(tag)
                                                        ? "bg-[#D2FF1D]/15 border-[#D2FF1D]/30 text-[#D2FF1D]"
                                                        : "bg-[#141414] border-white/5 text-gray-400 hover:border-white/15"
                                                    }`}
                                            >
                                                {tag}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                                        Additional Comments
                                    </p>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us more about your experience…"
                                        rows={3}
                                        className="w-full bg-[#141414] border border-white/10 focus:border-[#D2FF1D]/40 rounded-2xl px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors resize-none"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <div className="mt-auto pt-6">
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                disabled={rating === 0 || loading}
                                className={`w-full font-bold text-sm rounded-2xl py-4 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${rating > 0
                                        ? "bg-[#D2FF1D] hover:bg-[#c2ec14] text-black shadow-lg shadow-[#D2FF1D]/10"
                                        : "bg-[#1c1c1e] text-gray-600 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                    />
                                ) : (
                                    "Submit Feedback"
                                )}
                            </motion.button>
                            <button
                                onClick={() => router.push("/main")}
                                className="w-full text-center text-gray-600 text-xs mt-3 hover:text-gray-400 transition-colors cursor-pointer py-2"
                            >
                                Skip for now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
