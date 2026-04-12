"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Cpu, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

// --- CUSTOM NEURAL GRID ICON ---
const NeuralGridIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="4" height="4" rx="1.5" fill="currentColor" fillOpacity="0.4" />
    <rect x="10" y="4" width="4" height="4" rx="1.5" fill="currentColor" />
    <rect x="16" y="4" width="4" height="4" rx="1.5" fill="currentColor" fillOpacity="0.4" />
    <rect x="4" y="10" width="4" height="4" rx="1.5" fill="currentColor" />
    <motion.rect x="10" y="10" width="4" height="4" rx="1.5" fill="#2323FF" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
    <rect x="16" y="10" width="4" height="4" rx="1.5" fill="currentColor" />
    <rect x="4" y="16" width="4" height="4" rx="1.5" fill="currentColor" fillOpacity="0.4" />
    <rect x="10" y="16" width="4" height="4" rx="1.5" fill="currentColor" />
    <rect x="16" y="16" width="4" height="4" rx="1.5" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export default function AIChatbot({ isDark }: { isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([{ 
        role: "ai", 
        text: "👋 **Neural Oracle v2.0** online. \n\n Analyzing your domain... How can I assist your strategy today? 🌐" 
      }]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.text }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "❌ **BERT Core Offline.** Restarting link..." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[99999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`md:w-[500px] w-[92vw] h-[720px] mb-6 rounded-[3rem] border-2 shadow-[0_50px_100px_-20px_rgba(35,35,255,0.4)] flex flex-col overflow-hidden transition-all duration-500 ${
              isDark ? "bg-[#0a0a0a] border-white/10 shadow-black" : "bg-white border-slate-200"
            }`}
          >
            {/* Header */}
            <div className="p-8 flex justify-between items-center shadow-lg bg-[#2323FF] text-white">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-black/10 rounded-2xl"><NeuralGridIcon /></div>
                <div className="text-left">
                  <p className="text-[11px] font-black uppercase tracking-widest opacity-70 mb-1">Neural Oracle</p>
                  <p className="text-xl font-black italic uppercase tracking-tighter">PROCESSOR-01</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform active:scale-90"><X size={24}/></button>
            </div>

            {/* --- THE FORMATTED CHAT AREA --- */}
            <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-10 no-scrollbar bg-transparent scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[95%] px-7 py-6 rounded-[2.5rem] text-[15px] border leading-relaxed shadow-sm transition-all ${
                    m.role === 'user' 
                    ? 'bg-[#2323FF] text-white border-blue-400 shadow-blue-900/20' 
                    : (isDark ? 'bg-white/[0.03] text-slate-200 border-white/10' : 'bg-slate-50 text-slate-800 border-slate-200')
                  }`}>
                    {/* --- ADVANCED MARKDOWN RENDERING --- */}
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-6 space-y-3 mb-5" {...props} />,
                        li: ({node, ...props}) => <li className="marker:text-[#2323FF] font-bold" {...props} />,
                        strong: ({node, ...props}) => (
                           <strong className="font-black text-[#2323FF] dark:text-cyan-400 bg-[#2323FF]/5 px-1.5 py-0.5 rounded-md border border-[#2323FF]/10 uppercase tracking-tighter" {...props} />
                        )
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && <div className="flex gap-3 items-center text-[12px] font-black uppercase text-[#2323FF] animate-pulse ml-6 tracking-widest"><Terminal size={14}/> consulting BERT core...</div>}
            </div>

            {/* Input Box */}
            <div className="p-6 border-t" style={{ backgroundColor: isDark ? '#000000' : '#ffffff', borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9' }}>
               <div className="flex items-center gap-3 p-2 rounded-2xl border transition-all shadow-inner" style={{ backgroundColor: '#ffffff', borderColor: '#2323FF' }}>
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Consult the engine..." autoComplete="off"
                    style={{ flex: 1, backgroundColor: 'transparent', outline: 'none', padding: '12px 16px', fontSize: '15px', color: '#000000', border: 'none', fontWeight: '800' }} 
                  />
                  <button onClick={handleSend} disabled={loading} className="p-3.5 bg-[#2323FF] text-white rounded-xl shadow-xl hover:scale-105 active:scale-95 disabled:opacity-30">
                    <Send size={22}/>
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button onClick={() => setIsOpen(!isOpen)} className={`w-20 h-20 rounded-[1.8rem] bg-[#2323FF] text-white flex items-center justify-center shadow-[0_20px_50px_rgba(35,35,255,0.4)] hover:scale-110 active:scale-95 group relative transition-all duration-500`}>
        <div className="absolute inset-0 bg-white/20 rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={36}/> : <NeuralGridIcon />}
      </button>
    </div>
  );
}