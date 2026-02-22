"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                         */
/* ------------------------------------------------------------------ */

const userData = {
    name: "Amanda",
    phone: "+91 98765 43210",
    email: "amanda@example.com",
    memberSince: "Jan 2026",
};

const savedVehicles = [
    { id: 1, type: "car", name: "Honda City", plate: "DL 4C AB 1234", model: "2022", primary: true },
    { id: 2, type: "bike", name: "RE Classic 350", plate: "DL 9X EF 4567", model: "2023", primary: false },
    { id: 3, type: "bike", name: "Honda Activa", plate: "DL 7S CD 9876", model: "2021", primary: false },
];

const menuItems = [
    { icon: "📄", label: "Service History", route: "/history" },
    { icon: "💳", label: "Payment Methods", route: null },
    { icon: "📍", label: "Saved Addresses", route: null },
    { icon: "🔔", label: "Notifications", route: null },
    { icon: "🛡️", label: "Privacy & Security", route: null },
    { icon: "❓", label: "Help & Support", route: null },
    { icon: "📜", label: "Terms of Service", route: null },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
    const router = useRouter();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-8">
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
                    <h1 className="text-lg font-bold">Profile</h1>
                </div>
            </motion.div>

            <div className="px-5">
                {/* User Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-5 bg-[#141414] rounded-3xl p-5 border border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D2FF1D]/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D2FF1D]/30 to-[#D2FF1D]/5 border-2 border-[#D2FF1D]/30 flex items-center justify-center text-2xl font-black text-[#D2FF1D] shrink-0">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold text-white">{userData.name}</h2>
                            <p className="text-sm text-gray-400">{userData.phone}</p>
                            <p className="text-xs text-gray-600 mt-0.5">Member since {userData.memberSince}</p>
                        </div>
                        <button className="text-xs font-semibold text-[#D2FF1D] bg-[#D2FF1D]/10 border border-[#D2FF1D]/20 px-3.5 py-2 rounded-full hover:bg-[#D2FF1D]/15 transition-colors cursor-pointer shrink-0">
                            Edit
                        </button>
                    </div>
                </motion.div>

                {/* Saved Vehicles */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Saved Vehicles</h3>
                        <button
                            onClick={() => router.push("/profile/add-vehicle")}
                            className="text-xs font-semibold text-[#D2FF1D] hover:underline underline-offset-4 cursor-pointer"
                        >
                            + Add New
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {savedVehicles.map((v, i) => (
                            <motion.div
                                key={v.id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.06 }}
                                className="bg-[#141414] rounded-2xl p-4 border border-white/5 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-lg">
                                    {v.type === "car" ? "🚗" : "🏍️"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-semibold text-white truncate">{v.name}</h4>
                                        {v.primary && (
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#D2FF1D] bg-[#D2FF1D]/10 px-2 py-0.5 rounded-full border border-[#D2FF1D]/20">
                                                Primary
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{v.plate} • {v.model}</p>
                                </div>
                                <button className="text-gray-600 hover:text-white transition-colors cursor-pointer p-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Menu Items */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-6"
                >
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Settings</h3>
                    <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden divide-y divide-white/5">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => item.route && router.push(item.route)}
                                className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-[#1c1c1e] transition-colors cursor-pointer text-left"
                            >
                                <span className="text-base">{item.icon}</span>
                                <span className="text-sm font-medium text-gray-300 flex-1">{item.label}</span>
                                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Logout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                >
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full py-3.5 rounded-2xl border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                        Log Out
                    </button>
                    <p className="text-center text-gray-700 text-xs mt-3">DOOD. v1.0.0</p>
                </motion.div>
            </div>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-8"
                        onClick={() => setShowLogoutConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#1c1c1e] rounded-3xl p-6 border border-white/5 w-full max-w-xs text-center"
                        >
                            <div className="text-3xl mb-3">👋</div>
                            <h3 className="text-lg font-bold text-white mb-1">Log out?</h3>
                            <p className="text-sm text-gray-400 mb-5">Are you sure you want to log out of your account?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 py-3 rounded-xl bg-[#2c2c2e] text-white text-sm font-semibold hover:bg-[#3c3c3e] transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors cursor-pointer border border-red-500/20"
                                >
                                    Log Out
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
