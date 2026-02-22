"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type VehicleType = "car" | "bike";

export default function AddVehiclePage() {
    const router = useRouter();
    const [vehicleType, setVehicleType] = useState<VehicleType>("car");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");
    const [primary, setPrimary] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!brand.trim() || !model.trim() || !plate.trim() || !year.trim()) {
            setError("Please fill in all fields");
            return;
        }
        setError("");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => router.back(), 1500);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
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
                    <h1 className="text-lg font-bold">Add Vehicle</h1>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center px-5 pt-24"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-20 h-20 rounded-full bg-[#D2FF1D]/10 border-2 border-[#D2FF1D]/30 flex items-center justify-center mb-5"
                        >
                            <span className="text-4xl">✅</span>
                        </motion.div>
                        <h2 className="text-xl font-bold text-white mb-1">Vehicle Added!</h2>
                        <p className="text-sm text-gray-400">Your {vehicleType} has been saved successfully</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="px-5 pt-5 pb-8"
                    >
                        {/* Vehicle Type Selector */}
                        <div className="mb-6">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2.5 block">
                                Vehicle Type
                            </label>
                            <div className="flex bg-[#141414] rounded-2xl p-1 border border-white/5">
                                {(["car", "bike"] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setVehicleType(type)}
                                        className={`relative flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer ${vehicleType === type ? "text-black" : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {vehicleType === type && (
                                            <motion.div
                                                layoutId="vehicleTypeTab"
                                                className="absolute inset-0 bg-[#D2FF1D] rounded-xl"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">
                                            {type === "car" ? "🚗 Car" : "🏍️ Bike"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brand */}
                        <div className="mb-4">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                                Brand / Make
                            </label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => { setBrand(e.target.value); setError(""); }}
                                placeholder={vehicleType === "car" ? "e.g. Honda, Hyundai, Maruti" : "e.g. Honda, Royal Enfield, TVS"}
                                className="w-full bg-[#141414] border border-white/10 focus:border-[#D2FF1D]/50 rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                            />
                        </div>

                        {/* Model */}
                        <div className="mb-4">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                                Model
                            </label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => { setModel(e.target.value); setError(""); }}
                                placeholder={vehicleType === "car" ? "e.g. City, Creta, Swift" : "e.g. Classic 350, Activa, Jupiter"}
                                className="w-full bg-[#141414] border border-white/10 focus:border-[#D2FF1D]/50 rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                            />
                        </div>

                        {/* Year & Plate — side by side */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    maxLength={4}
                                    value={year}
                                    onChange={(e) => { setYear(e.target.value.replace(/\D/g, "")); setError(""); }}
                                    placeholder="2024"
                                    className="w-full bg-[#141414] border border-white/10 focus:border-[#D2FF1D]/50 rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                                    Plate Number
                                </label>
                                <input
                                    type="text"
                                    value={plate}
                                    onChange={(e) => { setPlate(e.target.value.toUpperCase()); setError(""); }}
                                    placeholder="DL 4C AB 1234"
                                    className="w-full bg-[#141414] border border-white/10 focus:border-[#D2FF1D]/50 rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition-colors tracking-wider"
                                />
                            </div>
                        </div>

                        {/* Set as primary */}
                        <button
                            onClick={() => setPrimary(!primary)}
                            className="flex items-center gap-3 w-full bg-[#141414] border border-white/5 rounded-2xl px-4 py-3.5 mb-5 cursor-pointer hover:bg-[#1c1c1e] transition-colors"
                        >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${primary ? "bg-[#D2FF1D] border-[#D2FF1D]" : "border-gray-600"
                                }`}>
                                {primary && (
                                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm text-gray-300 font-medium">Set as primary vehicle</span>
                        </button>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-red-400 text-xs mb-3 pl-1"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-[#D2FF1D] hover:bg-[#c2ec14] disabled:opacity-60 text-black font-bold text-sm rounded-2xl py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#D2FF1D]/10 cursor-pointer"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                />
                            ) : (
                                "Save Vehicle"
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
