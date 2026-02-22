"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                         */
/* ------------------------------------------------------------------ */

const serviceHistory = [
    {
        id: "SRV-2401",
        service: "General Car Service",
        mechanic: "Rahul Sharma",
        date: "18 Feb 2026",
        amount: "₹1,499",
        status: "completed" as const,
        vehicle: "Honda City • DL 4C AB 1234",
    },
    {
        id: "SRV-2398",
        service: "Oil Change",
        mechanic: "Amit Verma",
        date: "10 Feb 2026",
        amount: "₹699",
        status: "completed" as const,
        vehicle: "Honda Activa • DL 7S CD 9876",
    },
    {
        id: "SRV-2385",
        service: "Tyre Replacement (x2)",
        mechanic: "Suresh Kumar",
        date: "28 Jan 2026",
        amount: "₹3,200",
        status: "completed" as const,
        vehicle: "Honda City • DL 4C AB 1234",
    },
    {
        id: "SRV-2370",
        service: "Bike Full Service",
        mechanic: "Rahul Sharma",
        date: "15 Jan 2026",
        amount: "₹899",
        status: "cancelled" as const,
        vehicle: "RE Classic 350 • DL 9X EF 4567",
    },
    {
        id: "SRV-2355",
        service: "Car Wash & Detailing",
        mechanic: "Priya Singh",
        date: "02 Jan 2026",
        amount: "₹599",
        status: "completed" as const,
        vehicle: "Honda City • DL 4C AB 1234",
    },
];

const statusConfig = {
    completed: { label: "Completed", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
    cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
    ongoing: { label: "Ongoing", color: "text-[#D2FF1D]", bg: "bg-[#D2FF1D]/10", border: "border-[#D2FF1D]/20" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function HistoryPage() {
    const router = useRouter();

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
                    <h1 className="text-lg font-bold">Service History</h1>
                </div>
            </motion.div>

            {/* Summary strip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mx-5 mt-4 mb-5 flex gap-3"
            >
                <div className="flex-1 bg-[#141414] rounded-2xl p-3.5 border border-white/5 text-center">
                    <p className="text-2xl font-black text-[#D2FF1D]">{serviceHistory.filter(s => s.status === "completed").length}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Completed</p>
                </div>
                <div className="flex-1 bg-[#141414] rounded-2xl p-3.5 border border-white/5 text-center">
                    <p className="text-2xl font-black text-white">₹6,897</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Total Spent</p>
                </div>
                <div className="flex-1 bg-[#141414] rounded-2xl p-3.5 border border-white/5 text-center">
                    <p className="text-2xl font-black text-white">3</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Mechanics</p>
                </div>
            </motion.div>

            {/* Service list */}
            <div className="px-5 space-y-3">
                {serviceHistory.map((service, i) => {
                    const sc = statusConfig[service.status];
                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className="bg-[#141414] rounded-3xl p-4 border border-white/5"
                        >
                            <div className="flex items-start justify-between mb-2.5">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white text-sm truncate">{service.service}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{service.vehicle}</p>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${sc.bg} ${sc.color} ${sc.border} border shrink-0 ml-2`}>
                                    {sc.label}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span>🔧 {service.mechanic}</span>
                                    <span className="text-gray-600">•</span>
                                    <span>{service.date}</span>
                                </div>
                                <span className="text-sm font-bold text-white">{service.amount}</span>
                            </div>

                            {/* Action row */}
                            <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                                <button className="flex-1 text-xs font-semibold text-gray-400 bg-[#1c1c1e] hover:bg-[#252527] rounded-xl py-2.5 transition-colors cursor-pointer">
                                    📄 Invoice
                                </button>
                                {service.status === "completed" && (
                                    <button
                                        onClick={() => router.push("/rating")}
                                        className="flex-1 text-xs font-semibold text-[#D2FF1D] bg-[#D2FF1D]/10 hover:bg-[#D2FF1D]/15 rounded-xl py-2.5 transition-colors cursor-pointer border border-[#D2FF1D]/20"
                                    >
                                        ⭐ Rate
                                    </button>
                                )}
                                {service.status === "completed" && (
                                    <button className="flex-1 text-xs font-semibold text-gray-400 bg-[#1c1c1e] hover:bg-[#252527] rounded-xl py-2.5 transition-colors cursor-pointer">
                                        🔁 Rebook
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
