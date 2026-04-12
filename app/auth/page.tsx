"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight, Mail, Lock, User, Globe, Sparkles, Sun, Moon, Search, BarChart3, Database, Network, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  const handleExecuteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // THE MAGIC: router.replace deletes the Login page from history
    // so when you click 'Back' from dashboard, you land on HOME.
    router.replace("/dashboard"); 
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 flex items-center justify-center p-6 md:p-12 overflow-hidden ${isDark ? "bg-[#050505] text-white" : "bg-[#fcfdfe] text-slate-900"}`}>
      <button onClick={() => setIsDark(!isDark)} className="fixed top-8 right-8 z-[100] p-3 rounded-2xl border bg-white/5 border-white/10 text-[#2323FF]">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`w-full max-w-6xl rounded-[3rem] border flex flex-col md:flex-row overflow-hidden min-h-[750px] relative z-10 transition-colors duration-500 ${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-slate-100 shadow-2xl"}`}>
        <div className={`md:w-1/2 relative p-12 flex flex-col justify-between overflow-hidden group transition-colors duration-500 ${isDark ? "bg-black" : "bg-[#020617]"}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16"><div className="p-2 bg-[#2323FF] rounded-xl text-white shadow-lg"><Cpu size={24}/></div><span className="font-black text-xl text-white uppercase italic">NeuralEngine</span></div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">Unlock the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2323FF] to-cyan-400">Search Core.</span></h2>
          </div>
          <div className="relative z-10 mt-auto"><div className={`flex items-center gap-4 p-5 border rounded-[2rem] bg-white/5 backdrop-blur-xl w-fit pr-12`}><div className="w-14 h-14 rounded-2xl bg-[#2323FF] flex items-center justify-center text-white"><Zap size={24}/></div><div><p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1">Intelligence</p><p className="text-sm font-bold text-white tracking-tight uppercase italic leading-none">BERT Core 4.0 Online</p></div></div></div>
        </div>
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center text-left">
          <div className="mb-12"><h1 className={`text-4xl font-black tracking-tighter mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{isLogin ? "Neural Login" : "Spawn Account"}</h1><p className="text-slate-400 text-sm font-medium">Access your console node</p></div>
          <form className="space-y-6" onSubmit={handleExecuteLogin}>
            {!isLogin && ( <input type="text" placeholder="Full Name" required className={`w-full border rounded-2xl py-4 px-6 text-sm font-medium outline-none ${isDark ? "bg-white/5 border-white/5 text-white" : "bg-slate-50 border-slate-100"}`} /> )}
            <input type="email" placeholder="agent@neuralengine.io" required className={`w-full border rounded-2xl py-4 px-6 text-sm font-medium outline-none ${isDark ? "bg-white/5 border-white/5 text-white" : "bg-slate-50 border-slate-100"}`} />
            <input type="password" placeholder="Pass-key" required className={`w-full border rounded-2xl py-4 px-6 text-sm font-medium outline-none ${isDark ? "bg-white/5 border-white/5 text-white" : "bg-slate-50 border-slate-100"}`} />
            <button type="submit" className="w-full bg-[#2323FF] text-white py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"> {isLogin ? "Execute Login" : "Initialize Account"} <ArrowRight className="inline ml-2" size={16} /></button>
          </form>
          <div className="mt-12 text-center"><button onClick={() => setIsLogin(!isLogin)} className="text-xs font-bold text-slate-400 hover:text-[#2323FF] transition-all flex items-center justify-center gap-2 mx-auto">{isLogin ? "New to the engine?" : "Already an agent?"} <span className="text-[#2323FF] font-black uppercase tracking-widest border-b border-[#2323FF] pb-0.5 ml-1">{isLogin ? "Spawn Node" : "Login"}</span></button></div>
        </div>
      </motion.div>
    </div>
  );
}