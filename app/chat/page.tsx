"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                      */
/* ------------------------------------------------------------------ */

type Message = {
    id: number;
    text: string;
    sender: "user" | "mechanic";
    time: string;
};

const mechanic = {
    name: "Rahul Sharma",
    avatar: "RS",
    status: "On the way • 1.2 km away",
};

const quickReplies = [
    "Waiting at my location",
    "How long will you take?",
    "Can you call me?",
    "I'm near the main gate",
    "What tools do you need?",
    "Is there extra charge?",
];

const mechanicResponses: Record<string, string> = {
    "Waiting at my location": "Got it! I can see your location on the map. Will be there in about 5 minutes 🏍️",
    "How long will you take?": "I'm about 5-6 minutes away. Traffic is a bit slow but I'll be there soon! 🚦",
    "Can you call me?": "Sure, I'll call you in a minute! 📞",
    "I'm near the main gate": "Okay, heading towards the main gate now. Please wait there! 👍",
    "What tools do you need?": "I'm carrying all necessary tools. Don't worry, I come fully equipped! 🔧",
    "Is there extra charge?": "No hidden charges! You'll only pay the amount shown in the app. Transparent pricing 💯",
};

const defaultMechanicResponse = "Got it! I'll keep that in mind. See you shortly! 👍";

const getNow = () => {
    const d = new Date();
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const initialMessages: Message[] = [
    { id: 1, text: "Hi! I've been assigned to your service request. On my way now! 🛵", sender: "mechanic", time: getNow() },
    { id: 2, text: "I should reach in about 8 minutes.", sender: "mechanic", time: getNow() },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const nextId = useRef(3);

    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    };

    useEffect(scrollToBottom, [messages, typing]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: nextId.current++,
            text: text.trim(),
            sender: "user",
            time: getNow(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Mechanic auto-reply
        setTyping(true);
        const reply = mechanicResponses[text.trim()] || defaultMechanicResponse;
        const delay = 1200 + Math.random() * 1000;

        setTimeout(() => {
            setTyping(false);
            const mechMsg: Message = {
                id: nextId.current++,
                text: reply,
                sender: "mechanic",
                time: getNow(),
            };
            setMessages((prev) => [...prev, mechMsg]);
        }, delay);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
            {/* ─── Header ─── */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
            >
                <div className="flex items-center gap-3 px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/5 flex items-center justify-center cursor-pointer hover:bg-[#252527] transition-colors shrink-0"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D2FF1D]/20 to-[#D2FF1D]/5 border border-[#D2FF1D]/20 flex items-center justify-center text-xs font-bold text-[#D2FF1D] shrink-0">
                        {mechanic.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-white truncate">{mechanic.name}</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-[11px] text-gray-400 truncate">{mechanic.status}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => { }}
                        className="w-9 h-9 rounded-full bg-[#D2FF1D] flex items-center justify-center cursor-pointer hover:bg-[#c2ec14] active:scale-95 transition-all shrink-0"
                    >
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* ─── Messages ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${msg.sender === "user"
                                    ? "bg-[#D2FF1D] text-black rounded-2xl rounded-br-md"
                                    : "bg-[#1c1c1e] text-white border border-white/5 rounded-2xl rounded-bl-md"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p
                                    className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-black/40 text-right" : "text-gray-600"
                                        }`}
                                >
                                    {msg.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                    {typing && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-start"
                        >
                            <div className="bg-[#1c1c1e] border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                                        className="w-2 h-2 rounded-full bg-gray-500"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={bottomRef} />
            </div>

            {/* ─── Quick Replies ─── */}
            <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {quickReplies.map((reply) => (
                        <motion.button
                            key={reply}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => sendMessage(reply)}
                            className="shrink-0 text-xs font-medium px-3.5 py-2 rounded-full bg-[#141414] border border-white/5 text-gray-300 hover:bg-[#1c1c1e] hover:border-[#D2FF1D]/20 hover:text-[#D2FF1D] transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {reply}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* ─── Input Bar ─── */}
            <div className="px-4 pb-5 pt-1">
                <div className="flex items-center gap-2 bg-[#141414] border border-white/10 rounded-2xl p-1.5 focus-within:border-[#D2FF1D]/30 transition-colors">
                    {/* Image attachment button */}
                    <label className="w-10 h-10 rounded-xl bg-[#1c1c1e] hover:bg-[#252527] flex items-center justify-center shrink-0 cursor-pointer transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={() => {
                                const userMsg: Message = {
                                    id: nextId.current++,
                                    text: "📷 Sent a photo",
                                    sender: "user",
                                    time: getNow(),
                                };
                                setMessages((prev) => [...prev, userMsg]);
                                setTyping(true);
                                setTimeout(() => {
                                    setTyping(false);
                                    setMessages((prev) => [
                                        ...prev,
                                        {
                                            id: nextId.current++,
                                            text: "Got the photo! Thanks for sharing, that helps me understand the issue better. I'll bring the right parts 📸👍",
                                            sender: "mechanic",
                                            time: getNow(),
                                        },
                                    ]);
                                }, 1500);
                            }}
                        />
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </label>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                        placeholder="Type a message…"
                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600 min-w-0"
                    />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim()}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-all ${input.trim()
                            ? "bg-[#D2FF1D] hover:bg-[#c2ec14]"
                            : "bg-[#1c1c1e] cursor-not-allowed"
                            }`}
                    >
                        <svg
                            className={`w-4 h-4 ${input.trim() ? "text-black" : "text-gray-600"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
