"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Focus first OTP input when OTP section appears
    useEffect(() => {
        if (otpSent && otpRefs.current[0]) {
            otpRefs.current[0].focus();
        }
    }, [otpSent]);

    const handleSendOtp = () => {
        if (phone.length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }
        setError("");
        setLoading(true);
        // Simulate OTP send
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
        }, 1200);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = () => {
        const fullOtp = otp.join("");
        if (fullOtp.length < 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }
        setError("");
        setLoading(true);
        // Simulate verification
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

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[#D2FF1D]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-60px] w-[250px] h-[250px] rounded-full bg-[#D2FF1D]/5 blur-3xl pointer-events-none" />

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
                    {/* Accent stripe at top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2FF1D] via-[#D2FF1D]/60 to-transparent" />

                    <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
                    <p className="text-gray-400 text-sm mb-8">
                        {otpSent
                            ? `We sent a code to +91 ${phone}`
                            : "Log in with your phone number"}
                    </p>

                    <AnimatePresence mode="wait">
                        {!otpSent ? (
                            <motion.div
                                key="phone-step"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                            >
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
                                    {loading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                        />
                                    ) : (
                                        "Continue"
                                    )}
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
                                {/* OTP Inputs */}
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
                                    onClick={handleVerifyOtp}
                                    disabled={loading}
                                    className="w-full bg-[#D2FF1D] hover:bg-[#c0ea15] disabled:opacity-60 text-black font-bold text-base rounded-2xl py-4 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#D2FF1D]/10 cursor-pointer"
                                >
                                    {loading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                        />
                                    ) : (
                                        "Verify & Login"
                                    )}
                                </motion.button>

                                {/* Resend / Back */}
                                <div className="flex items-center justify-between mt-5">
                                    <button
                                        onClick={() => {
                                            setOtpSent(false);
                                            setOtp(["", "", "", "", "", ""]);
                                            setError("");
                                        }}
                                        className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        ← Change number
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
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={() => router.push("/register")}
                        className="text-[#D2FF1D] font-semibold hover:underline underline-offset-4 cursor-pointer"
                    >
                        Sign up
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
