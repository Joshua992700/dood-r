"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const specialOffers = [
    {
        id: 1,
        tag: "Today's Offer",
        title: "Get Special Offer",
        highlight: "20%",
        description: "On your first car service booking",
        cta: "Claim",
        gradient: "from-[#D2FF1D]/20 to-[#D2FF1D]/5",
    },
    {
        id: 2,
        tag: "Weekend Deal",
        title: "Flat Discount",
        highlight: "₹199",
        description: "Bike basic service this weekend only",
        cta: "Book Now",
        gradient: "from-white/10 to-white/5",
    },
    {
        id: 3,
        tag: "New User",
        title: "Free Checkup",
        highlight: "FREE",
        description: "Complimentary 15-point vehicle inspection",
        cta: "Avail",
        gradient: "from-[#D2FF1D]/15 to-[#D2FF1D]/5",
    },
];

const carServices = [
    { icon: "🔧", label: "General Service" },
    { icon: "🛞", label: "Tyre & Wheel" },
    { icon: "🛢️", label: "Oil Change" },
    { icon: "🧽", label: "Car Wash" },
    { icon: "🔩", label: "Dent Repair" },
    { icon: "🎨", label: "Painting" },
];

const bikeServices = [
    { icon: "⚙️", label: "General Service" },
    { icon: "🛞", label: "Tyre Change" },
    { icon: "🛢️", label: "Oil Change" },
    { icon: "🧽", label: "Wash & Clean" },
    { icon: "🔋", label: "Battery" },
    { icon: "💡", label: "Electricals" },
];

/* ------------------------------------------------------------------ */
/*  Animated section wrapper                                          */
/* ------------------------------------------------------------------ */

function FadeInSection({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Service Grid                                                      */
/* ------------------------------------------------------------------ */

function ServiceGrid({
    items,
    onSelect,
}: {
    items: { icon: string; label: string }[];
    onSelect?: (label: string) => void;
}) {
    return (
        <div className="grid grid-cols-3 gap-3">
            {items.map((item, i) => (
                <motion.button
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.08 * i, duration: 0.35 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect?.(item.label)}
                    className="flex flex-col items-center gap-2 bg-[#1a1a1c] hover:bg-[#222224] border border-white/5 rounded-2xl py-5 px-2 transition-colors cursor-pointer group"
                >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                    </span>
                    <span className="text-xs font-medium text-gray-300 text-center leading-tight">
                        {item.label}
                    </span>
                </motion.button>
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export default function MainPage() {
    const router = useRouter();
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeTab, setActiveTab] = useState<"car" | "bike">("car");
    const [activeNav, setActiveNav] = useState("home");
    const sliderRef = useRef<HTMLDivElement>(null);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % specialOffers.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Scroll carousel into view when slide changes
    useEffect(() => {
        if (sliderRef.current) {
            const child = sliderRef.current.children[activeSlide] as HTMLElement;
            if (child) {
                child.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [activeSlide]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
            {/* ============================================================ */}
            {/*  WHITE CURVED HEADER — Location + Search                    */}
            {/* ============================================================ */}
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative z-30"
            >
                {/* Abstract header body — tinted off-white with decorative lines & shadows */}
                <div className="bg-gradient-to-br from-[#f0f0f0] to-[#e4e4e4] relative overflow-hidden shadow-xl shadow-black/20">

                    {/* ── Decorative abstract circles ── */}
                    <div className="absolute top-[-50px] left-[-40px] w-[180px] h-[180px] rounded-full border-[1.5px] border-black/[0.06] pointer-events-none" />
                    <div className="absolute top-[-20px] left-[-10px] w-[120px] h-[120px] rounded-full border border-black/[0.04] pointer-events-none" />
                    <div className="absolute top-[5px] right-[-30px] w-[140px] h-[140px] rounded-full border-[1.5px] border-black/[0.06] pointer-events-none" />
                    <div className="absolute bottom-[-30px] right-[60px] w-[90px] h-[90px] rounded-full border border-black/[0.04] pointer-events-none" />

                    {/* ── Diagonal decorative lines ── */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                135deg,
                                transparent,
                                transparent 28px,
                                #000 28px,
                                #000 29px
                            )`,
                        }}
                    />

                    {/* ── Subtle top-left glow ── */}
                    <div className="absolute top-[-20px] left-[20%] w-[160px] h-[80px] bg-[#D2FF1D]/[0.06] rounded-full blur-3xl pointer-events-none" />

                    <div className="px-5 pt-5 pb-5 relative z-10">
                        {/* Row: Location + Notification */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                                    Location
                                </p>
                                <button className="flex items-center gap-1.5 mt-0.5 group cursor-pointer">
                                    <span className="text-red-500 text-sm">📍</span>
                                    <span className="text-[#0a0a0a] font-bold text-sm">
                                        New Delhi, India
                                    </span>
                                    <svg
                                        className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#0a0a0a] transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-[#D2FF1D] flex items-center justify-center relative cursor-pointer hover:bg-[#c2ec14] active:scale-95 transition-all shadow-md shadow-[#D2FF1D]/30">
                                <svg
                                    className="w-5 h-5 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                {/* notification dot */}
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#e8e8e8]" />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 flex items-center bg-white/70 backdrop-blur-sm border border-gray-300/60 rounded-2xl px-4 py-3 gap-3 focus-within:border-[#0a0a0a]/30 transition-colors shadow-sm">
                                <svg
                                    className="w-4 h-4 text-gray-400 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search services…"
                                    className="bg-transparent text-sm text-[#0a0a0a] outline-none flex-1 placeholder:text-gray-400"
                                />
                            </div>
                            <button className="w-12 h-12 rounded-2xl bg-[#0a0a0a] flex items-center justify-center shrink-0 hover:bg-[#1a1a1c] active:scale-95 transition-all cursor-pointer shadow-md shadow-black/20">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </motion.header>

            <div className="px-5">

                {/* ============================================================ */}
                {/*  SPECIAL OFFERS CAROUSEL                                     */}
                {/* ============================================================ */}
                <FadeInSection>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Special Offers</h2>
                        <button className="text-xs font-semibold text-[#D2FF1D] hover:underline underline-offset-4 cursor-pointer">
                            See All
                        </button>
                    </div>

                    {/* Carousel */}
                    <div
                        ref={sliderRef}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {specialOffers.map((offer, i) => (
                            <motion.div
                                key={offer.id}
                                className={`snap-center shrink-0 w-[85%] rounded-3xl bg-gradient-to-br ${offer.gradient} border border-white/5 p-6 relative overflow-hidden`}
                                animate={{
                                    scale: activeSlide === i ? 1 : 0.96,
                                    opacity: activeSlide === i ? 1 : 0.6,
                                }}
                                transition={{ duration: 0.35 }}
                            >
                                {/* Tag */}
                                <span className="inline-block bg-[#1a1a1c] text-[10px] uppercase tracking-widest font-bold text-white px-3 py-1 rounded-full border border-white/10 mb-4">
                                    {offer.tag}
                                </span>
                                <h3 className="text-base font-semibold text-gray-200 mb-0.5">
                                    {offer.title}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-4xl font-black text-[#D2FF1D]">
                                        {offer.highlight}
                                    </span>
                                    <span className="text-sm text-gray-400">OFF</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">{offer.description}</p>
                                <button className="bg-[#D2FF1D] text-black text-xs font-bold px-5 py-2 rounded-full hover:bg-[#c2ec14] active:scale-95 transition-all cursor-pointer">
                                    {offer.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {specialOffers.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSlide(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === i
                                    ? "w-6 bg-[#D2FF1D]"
                                    : "w-1.5 bg-white/20 hover:bg-white/30"
                                    }`}
                            />
                        ))}
                    </div>
                </FadeInSection>

                {/* ============================================================ */}
                {/*  SERVICES                                                    */}
                {/* ============================================================ */}
                <FadeInSection delay={0.1} className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Services</h2>
                        <button className="text-xs font-semibold text-[#D2FF1D] hover:underline underline-offset-4 cursor-pointer">
                            See All
                        </button>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-[#141414] rounded-2xl p-1 mb-5 border border-white/5">
                        {(["car", "bike"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeServiceTab"
                                        className="absolute inset-0 bg-[#D2FF1D] rounded-xl"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 capitalize">
                                    {tab === "car" ? "🚗  Car" : "🏍️  Bike"}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: activeTab === "car" ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: activeTab === "car" ? 20 : -20 }}
                            transition={{ duration: 0.28 }}
                        >
                            <ServiceGrid
                                items={activeTab === "car" ? carServices : bikeServices}
                                onSelect={() => router.push("/radar")}
                            />
                        </motion.div>
                    </AnimatePresence>
                </FadeInSection>

                {/* ============================================================ */}
                {/*  PLACEHOLDER — More sections can be added here              */}
                {/* ============================================================ */}
                <FadeInSection delay={0.15} className="mt-8">
                    <div className="rounded-3xl border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl mb-3">✨</span>
                        <p className="text-sm text-gray-500 font-medium">
                            More sections coming soon
                        </p>
                    </div>
                </FadeInSection>
            </div>

            {/* ============================================================ */}
            {/*  BOTTOM NAVIGATION                                           */}
            {/* ============================================================ */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-md">
                <div className="bg-[#111113]/95 backdrop-blur-2xl border-t border-white/5">
                    <div className="flex items-center justify-around py-2 px-4">
                        {[
                            {
                                key: "home",
                                label: "Home",
                                route: null,
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
                                    </svg>
                                ),
                            },
                            {
                                key: "history",
                                label: "History",
                                route: "/history",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                key: "profile",
                                label: "Profile",
                                route: "/profile",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                        ].map((item) => (
                            <button
                                key={item.key}
                                onClick={() => {
                                    setActiveNav(item.key);
                                    if (item.route) router.push(item.route);
                                }}
                                className="relative flex flex-col items-center gap-1 py-2 px-5 cursor-pointer group"
                            >
                                {activeNav === item.key && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute -top-0.5 w-8 h-1 bg-[#D2FF1D] rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span
                                    className={`transition-colors duration-200 ${activeNav === item.key
                                        ? "text-[#D2FF1D]"
                                        : "text-gray-500 group-hover:text-gray-300"
                                        }`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`text-[10px] font-semibold transition-colors duration-200 ${activeNav === item.key
                                        ? "text-[#D2FF1D]"
                                        : "text-gray-500 group-hover:text-gray-300"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                    {/* Home indicator bar */}
                    <div className="flex justify-center pb-2">
                        <div className="w-32 h-1 rounded-full bg-white/10" />
                    </div>
                </div>
            </nav>
        </div>
    );
}
