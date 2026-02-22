"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Step = "info" | "otp";

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("info");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (step === "otp" && otpRefs.current[0]) {
            otpRefs.current[0].focus();
        }
    }, [step]);

    const handleSendOtp = () => {
        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }
        if (phone.length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }
        setError("");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("otp");
        }, 1200);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const fullOtp = otp.join("");
        if (fullOtp.length < 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }
        setError("");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/main");
        }, 1000);
    };

    const handleResendOtp = () => {
        setOtp(["", "", "", "", "", ""]);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            otpRefs.current[0]?.focus();
        }, 800);
    };

    // Shared spinner
    const Spinner = () => (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
        />
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-[-100px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#D2FF1D]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-80px] left-[-50px] w-[220px] h-[220px] rounded-full bg-[#D2FF1D]/5 blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl font-black tracking-tight">
                        <span className="text-white">DOOD</span>
                        <span className="text-[#D2FF1D]">.</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 tracking-wide">Your mechanic, on demand</p>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#141414] rounded-[32px] p-8 border border-white/5 shadow-2xl shadow-black/50 relative overflow-hidden"
                >
                    {/* Accent stripe */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D2FF1D] to-transparent" />

                    <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
                    <p className="text-gray-400 text-sm mb-8">
                        {step === "otp"
                            ? `We sent a code to +91 ${phone}`
                            : "Sign up to get started with DOOD"}
                    </p>

                    {/* Progress Dots */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step === "info" ? "bg-[#D2FF1D]" : "bg-[#D2FF1D]"}`} />
                        <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step === "otp" ? "bg-[#D2FF1D]" : "bg-white/10"}`} />
                    </div>

                    <AnimatePresence mode="wait">
                        {step === "info" ? (
                            <motion.div
                                key="info-step"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                            >
                                {/* Name Input */}
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                                    Full Name
                                </label>
                                <div className="bg-[#1c1c1e] rounded-2xl border border-white/10 focus-within:border-[#D2FF1D]/50 transition-colors mb-4 overflow-hidden">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder="What should we call you?"
                                        className="w-full bg-transparent text-white text-base font-medium px-4 py-4 outline-none placeholder:text-gray-600"
                                    />
                                </div>

                                {/* Phone Input */}
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                                    Phone Number
                                </label>
                                <div className="flex items-center bg-[#1c1c1e] rounded-2xl border border-white/10 focus-within:border-[#D2FF1D]/50 transition-colors mb-4 overflow-hidden">
                                    <span className="text-white/50 text-sm font-semibold pl-4 pr-2 py-4 border-r border-white/10 bg-[#1c1c1e]">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        value={phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            setPhone(val);
                                            if (error) setError("");
                                        }}
                                        placeholder="Enter your number"
                                        className="flex-1 bg-transparent text-white text-lg font-medium px-4 py-4 outline-none placeholder:text-gray-600 tracking-widest"
                                    />
                                </div>

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
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full bg-[#D2FF1D] hover:bg-[#c0ea15] disabled:opacity-60 text-black font-bold text-base rounded-2xl py-4 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#D2FF1D]/10 cursor-pointer"
                                >
                                    {loading ? <Spinner /> : "Get OTP"}
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="otp-step"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.35 }}
                            >
                                {/* OTP */}
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 block">
                                    Enter OTP
                                </label>
                                <div className="flex gap-2 mb-4">
                                    {otp.map((digit, i) => (
                                        <motion.input
                                            key={i}
                                            ref={(el) => { otpRefs.current[i] = el; }}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            className="w-full aspect-square max-w-[52px] bg-[#1c1c1e] border border-white/10 focus:border-[#D2FF1D] rounded-xl text-center text-white text-xl font-bold outline-none transition-colors caret-[#D2FF1D]"
                                        />
                                    ))}
                                </div>

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

                                {/* Verify */}
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleVerify}
                                    disabled={loading}
                                    className="w-full bg-[#D2FF1D] hover:bg-[#c0ea15] disabled:opacity-60 text-black font-bold text-base rounded-2xl py-4 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#D2FF1D]/10 cursor-pointer"
                                >
                                    {loading ? <Spinner /> : "Verify & Create Account"}
                                </motion.button>

                                {/* Resend / Back */}
                                <div className="flex items-center justify-between mt-5">
                                    <button
                                        onClick={() => {
                                            setStep("info");
                                            setOtp(["", "", "", "", "", ""]);
                                            setError("");
                                        }}
                                        className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        ← Go back
                                    </button>
                                    <button
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className="text-sm text-[#D2FF1D] font-semibold hover:underline underline-offset-4 disabled:opacity-40 cursor-pointer"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Link */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-gray-500 text-sm mt-8"
                >
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-[#D2FF1D] font-semibold hover:underline underline-offset-4 cursor-pointer"
                    >
                        Log in
                    </button>
                </motion.p>

                {/* Terms */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-gray-600 text-xs mt-4 max-w-xs mx-auto leading-relaxed"
                >
                    By continuing, you agree to our{" "}
                    <span className="text-gray-400 underline underline-offset-2 cursor-pointer">Terms of Service</span> &{" "}
                    <span className="text-gray-400 underline underline-offset-2 cursor-pointer">Privacy Policy</span>
                </motion.p>
            </motion.div>
        </div>
    );
}
