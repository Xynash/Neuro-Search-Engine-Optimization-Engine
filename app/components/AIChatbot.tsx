"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChevronRight, Glasses } from "lucide-react";

// --- CUSTOM NEURAL GRID ICON ---
const NeuralGridIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
    <rect x="10" y="4" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="16" y="4" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
    <rect x="4" y="10" width="4" height="4" rx="1" fill="currentColor" />
    <motion.rect 
      x="10" y="10" width="4" height="4" rx="1" fill="#f97316" 
      animate={{ opacity: [1, 0.4, 1] }} 
      transition={{ duration: 1.5, repeat: Infinity }} 
    />
    <rect x="16" y="10" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="4" y="16" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
    <rect x="10" y="16" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="16" y="16" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export default function AIChatbot({ isDark }: { isDark: boolean }) {
  const pathname = usePathname();
  const isPlayground = pathname.includes("playground");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto Pop-up Greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([{ 
        role: "ai", 
        text: isPlayground 
          ? "🤓 HEY! Welcome to the Orbit. I'm the Guide-Bot. Ready to build a SEO Galaxy?" 
          : "Neural Oracle online. Analyzing semantic intent... I'm ready for queries." 
      }]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isPlayground]);

  // --- CONNECTED TO GROQ ---
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, isPlayground }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error in BERT Core." }]);
    } finally {
      setLoading(false);
    }
  };

  const forceDarkMode = isDark || isPlayground;

  return (
    <div className="fixed bottom-10 right-10 z-[99999] font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`w-[400px] h-[600px] mb-6 rounded-[2.5rem] border-2 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ${isPlayground ? "bg-[#050505] border-orange-500/30 shadow-orange-950" : (isDark ? "bg-[#0a0a0a] border-white/10 shadow-black" : "bg-white border-slate-200 shadow-xl")}`}
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center shadow-lg ${isPlayground ? 'bg-orange-500 text-black' : 'bg-[#2323FF] text-white'}`}>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-black/10 rounded-lg">{isPlayground ? <Glasses size={24} /> : <NeuralGridIcon />}</div>
                <div className="text-left leading-none">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{isPlayground ? "Nerd Guide" : "Neural Oracle"}</p>
                  <p className="text-sm font-black italic uppercase tracking-tighter">PROCESSOR-01</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20}/></button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 no-scrollbar bg-transparent">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-xs font-bold leading-relaxed border ${
                    m.role === 'user' 
                    ? (isPlayground ? 'bg-orange-500 text-black border-orange-400' : 'bg-[#2323FF] text-white border-blue-400') 
                    : (forceDarkMode ? 'bg-white/5 text-slate-200 border-white/10' : 'bg-slate-50 text-slate-800 border-slate-200 shadow-sm')
                  }`}>{m.text}</div>
                </div>
              ))}
              {loading && <div className="text-[10px] animate-pulse text-orange-500 font-bold uppercase tracking-widest">Consulting Groq Engine...</div>}
            </div>

            {/* Input Area (White Box, Black Text) */}
            <div className="p-4" style={{ backgroundColor: forceDarkMode ? '#000000' : '#ffffff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
               <div className="flex items-center gap-2 p-1.5 rounded-xl border" style={{ backgroundColor: '#ffffff', borderColor: isPlayground ? '#f97316' : '#2323FF' }}>
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask..." autoComplete="off"
                    style={{ flex: 1, backgroundColor: 'transparent', outline: 'none', padding: '10px', fontSize: '13px', color: '#000000', border: 'none', fontWeight: '900' }} 
                  />
                  <button onClick={handleSend} disabled={loading} className={`p-2.5 rounded-lg transition-all ${isPlayground ? 'bg-orange-500 text-black' : 'bg-[#2323FF] text-white opacity-100 disabled:opacity-50'}`}><Send size={16}/></button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 group relative transition-all ${isPlayground ? "bg-orange-500 text-black shadow-orange-500/30" : "bg-[#2323FF] text-white"}`}>
        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={28}/> : (isPlayground ? <Glasses size={28}/> : <NeuralGridIcon />)}
      </button>
    </div>
  );
}