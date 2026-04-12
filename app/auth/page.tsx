"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, ArrowRight, Mail, Lock, User, Globe, Sparkles, 
  Sun, Moon, Search, BarChart3, Database, Network, Zap 
} from "lucide-react";
import Link from "next/link";

// --- DYNAMIC BACKGROUND SYMBOLS ---
const SEOBackgroundSymbols = ({ isDark }: { isDark: boolean }) => {
  const icons = [
    { Icon: Search, size: 40, top: '10%', left: '15%' },
    { Icon: Globe, size: 60, top: '70%', left: '80%' },
    { Icon: BarChart3, size: 50, top: '40%', left: '10%' },
    { Icon: Database, size: 35, top: '20%', left: '85%' },
    { Icon: Network, size: 45, top: '80%', left: '20%' },
    { Icon: Zap, size: 30, top: '5%', left: '75%' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            position: 'absolute', 
            top: item.top, 
            left: item.left,
            color: isDark ? '#2323FF' : '#94a3b8'
          }}
        >
          <item.Icon size={item.size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 flex items-center justify-center p-6 md:p-12 overflow-hidden ${
      isDark ? "bg-[#050505] text-white" : "bg-[#fcfdfe] text-slate-900"
    }`}>
      
      {/* --- THEME TOGGLE --- */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-8 right-8 z-[100] p-3 rounded-2xl border transition-all ${
          isDark ? "bg-white/5 border-white/10 text-[#2323FF]" : "bg-white border-slate-200 text-slate-500 shadow-sm"
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* --- BACKGROUND SYMBOLS --- */}
      <SEOBackgroundSymbols isDark={isDark} />

      {/* --- MAIN AUTH CONTAINER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-6xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border flex flex-col md:flex-row overflow-hidden min-h-[750px] relative z-10 transition-colors duration-500 ${
          isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-slate-100"
        }`}
      >
        
        {/* 1. LEFT PANEL: VISUAL IMPACT */}
        <div className={`md:w-1/2 relative p-12 flex flex-col justify-between overflow-hidden group transition-colors duration-500 ${
          isDark ? "bg-black" : "bg-[#020617]"
        }`}>
          {/* Animated Gradients */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <motion.div 
              animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute top-[-20%] right-[-20%] w-full h-full bg-[#2323FF]/30 rounded-full blur-[140px]" 
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
               <div className="p-2 bg-[#2323FF] rounded-xl text-white shadow-lg"><Cpu size={24}/></div>
               <span className="font-black text-xl text-white uppercase italic tracking-tighter">NeuralEngine</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Unlock the <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2323FF] to-cyan-400">Search Core.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-sm leading-relaxed font-medium">
              Initialize your domain scan using custom BERT inference nodes.
            </p>
          </div>

          {/* HUD ELEMENT */}
          <div className="relative z-10 mt-auto">
             <div className={`flex items-center gap-4 p-5 border rounded-[2rem] backdrop-blur-xl w-fit pr-12 shadow-2xl transition-colors duration-500 ${
               isDark ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"
             }`}>
                <div className="w-14 h-14 rounded-2xl bg-[#2323FF] flex items-center justify-center text-white shadow-glow"><Zap size={24}/></div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1">Intelligence</p>
                   <p className="text-sm font-bold text-white tracking-tight uppercase italic">BERT Core 4.0 Online</p>
                </div>
             </div>
          </div>
        </div>

        {/* 2. RIGHT PANEL: FORM AREA */}
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <div className="mb-12">
            <h1 className={`text-4xl font-black tracking-tighter mb-2 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
              {isLogin ? "Neural Login" : "Spawn Account"}
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              {isLogin ? "Enter your node credentials to access the console" : "Initialize a new neural identity"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 italic">Identity Name</label>
                  <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-slate-700 group-focus-within:text-[#2323FF]" : "text-slate-300 group-focus-within:text-[#2323FF]"}`} size={18} />
                    <input type="text" placeholder="Full Name" className={`w-full border rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all ${
                      isDark ? "bg-white/5 border-white/5 focus:bg-white/[0.08] focus:border-[#2323FF] text-white" : "bg-slate-50 border-slate-100 focus:bg-white focus:border-[#2323FF]"
                    }`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 italic">Neural Mail</label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-slate-700 group-focus-within:text-[#2323FF]" : "text-slate-300 group-focus-within:text-[#2323FF]"}`} size={18} />
                <input type="email" placeholder="agent@neuralengine.io" className={`w-full border rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all ${
                  isDark ? "bg-white/5 border-white/5 focus:bg-white/[0.08] focus:border-[#2323FF] text-white" : "bg-slate-50 border-slate-100 focus:bg-white focus:border-[#2323FF]"
                }`} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 italic">Access Protocol</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-slate-700 group-focus-within:text-[#2323FF]" : "text-slate-300 group-focus-within:text-[#2323FF]"}`} size={18} />
                <input type="password" placeholder="Pass-key code" className={`w-full border rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all ${
                  isDark ? "bg-white/5 border-white/5 focus:bg-white/[0.08] focus:border-[#2323FF] text-white" : "bg-slate-50 border-slate-100 focus:bg-white focus:border-[#2323FF]"
                }`} />
              </div>
            </div>

            <Link href="/dashboard" className="w-full bg-[#2323FF] text-white py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
              {isLogin ? "Execute Login" : "Initialize Account"} <ArrowRight size={16} />
            </Link>
          </form>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-slate-400 hover:text-[#2323FF] transition-all flex items-center justify-center gap-2 mx-auto"
            >
              {isLogin ? "New to the engine?" : "Already an agent?"} 
              <span className="text-[#2323FF] font-black uppercase tracking-widest border-b border-[#2323FF] pb-0.5 ml-1">
                {isLogin ? "Spawn Node" : "Login"}
              </span>
            </button>
          </div>
        </div>

      </motion.div>
      
      {/* Footer Label */}
      <p className="fixed bottom-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] pointer-events-none opacity-40">
        Encrypted Semantic Channel v4.0.2
      </p>
    </div>
  );
}