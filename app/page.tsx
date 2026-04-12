"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { usePathname } from 'next/navigation';
import { 
  Cpu, Zap, Sun, Moon, BrainCircuit, Globe, BarChart3, 
  Sparkles, CheckCircle2, ArrowRight, ChevronRight, ChevronLeft,
  Database, Network, Search, MessageSquare, X, Send,
  Terminal as LucideTerminal 
} from "lucide-react";
import Link from "next/link";
import AIChatbot from "./components/AIChatbot"; // Ensure path is correct

// --- 1. CANVA-STYLE TYPEWRITER ---
const TypewriterHeadline = ({ isDark }: { isDark: boolean }) => {
  const words = ["Boost Rankings", "Map Authority", "Scale Growth", "Analyze Intent"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[100px] md:h-[130px] flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }}
          className={`italic font-black text-6xl md:text-[100px] tracking-tighter ${isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#2323FF]" : "text-[#2323FF]"}`}
        > {words[index]} </motion.span>
      </AnimatePresence>
    </div>
  );
};

// --- 2. MULTI-COLOR INFINITE STRIP ---
const InfiniteLogoStrip = ({ isDark }: { isDark: boolean }) => {
  const logos = ["COINBASE", "SLACK", "DROPBOX", "WEBFLOW", "ZOOM", "STRIPE", "LINEAR", "VERCEL", "GITHUB", "NOTION"];
  const neonColors = ["text-cyan-400", "text-purple-400", "text-emerald-400", "text-rose-400", "text-amber-400"];
  return (
    <div className={`relative w-full py-12 overflow-hidden border-y transition-colors duration-500 ${isDark ? "bg-[#020617] border-white/5" : "bg-slate-50 border-slate-200"} backdrop-blur-sm`}>
      <motion.div className="flex whitespace-nowrap gap-24 items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className={`text-2xl font-black tracking-tighter transition-all uppercase ${isDark ? `${neonColors[index % neonColors.length]} opacity-90 hover:opacity-100` : "text-slate-800 hover:text-[#2323FF]"}`}>{logo}</div>
        ))}
      </motion.div>
    </div>
  );
};

// --- 3. COUNTER ---
const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      let start = 0; const end = value;
      const timer = setInterval(() => {
        start += Math.ceil(end / 40);
        if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(start); }
      }, 35);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);
  return <span ref={ref}>{count}</span>;
};

export default function NeuralEngineSaaS() {
  const [isDark, setIsDark] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    { title: "BERT Semantic DNA", desc: "Understanding contextual intent using true neural analysis.", icon: <BrainCircuit />, stat: 98, unit: "% Match" },
    { title: "Neural Tech Audit", desc: "Scan technical debt including Core Web Vitals in real-time.", icon: <Globe />, stat: 214, unit: "Points Scanned" },
    { title: "Regressive Probability", desc: "Predict algorithm shifts before rollouts complete.", icon: <BarChart3 />, stat: 89, unit: "% Accuracy" },
    { title: "Neural Link Equity", desc: "Optimize internal node architecture for maximum flow.", icon: <Network />, stat: 12, unit: "Gaps Closed" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-700 selection:bg-[#2323FF]/30 overflow-x-hidden ${isDark ? "bg-[#020617] text-slate-200" : "bg-white text-slate-900"}`}>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity }} className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[160px] ${isDark ? "bg-[#2323FF]/10" : "bg-[#2323FF]/20"}`} />
        <div className={`absolute inset-0 ${isDark ? "opacity-100" : "opacity-40"}`} style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? "rgba(255,255,255,0.03)" : "rgba(35,35,255,0.1)"} 1px, transparent 0)`, backgroundSize: '45px 45px' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8">
        <div className={`max-w-[1400px] mx-auto flex items-center justify-between backdrop-blur-2xl border px-10 py-5 rounded-full transition-all duration-500 ${isDark ? "bg-white/[0.03] border-white/10 shadow-2xl" : "bg-white/80 border-slate-200 shadow-xl"}`}>
          <div onClick={scrollToTop} className="flex items-center gap-3 font-black text-2xl tracking-tight uppercase italic cursor-pointer group">
            <div className={`p-2 rounded-lg bg-[#2323FF] shadow-lg group-hover:rotate-12 transition-transform text-white`}><Cpu size={24} /></div>
            <span className={isDark ? "text-white" : "text-slate-950"}>NeuralEngine</span>
          </div>
          <div className="hidden lg:flex gap-14 text-[16px] font-black uppercase tracking-[0.15em] transition-colors">
            <button onClick={scrollToTop} className="hover:text-[#2323FF]">Home</button>
            <a href="#features" className="hover:text-[#2323FF]">Features</a>
            <a href="#knowledge" className="hover:text-[#2323FF]">Why SEO?</a>
            <Link href="/playground" className="text-[#2323FF] flex items-center gap-2 group font-black">Playground <Zap size={14} className="group-hover:animate-pulse" /></Link>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-xl border transition-all ${isDark ? "bg-white/5 border-white/10 text-[#2323FF]" : "bg-white border-slate-200 text-slate-800 shadow-sm"}`}><Sun size={20} /></button>
            <Link href="/auth" className="bg-[#2323FF] text-white px-10 py-4 rounded-full text-[13px] font-black uppercase tracking-widest shadow-xl">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-64 pb-16 px-6 text-center max-w-7xl mx-auto leading-none">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-12 border ${isDark ? "bg-[#2323FF]/10 text-[#2323FF] border-[#2323FF]/20" : "bg-sky-50 text-[#2323FF] border-[#2323FF]/20"}`}><Zap size={14} fill="currentColor" /> Neural Engine v2.0 Live</motion.div>
        <h1 className={`text-7xl md:text-[120px] font-black tracking-tighter leading-[0.8] mb-4 transition-colors ${isDark ? "text-white" : "text-slate-950"}`}>Simplify SEO Strategy <br /> <TypewriterHeadline isDark={isDark} /></h1>
        <p className={`text-xl md:text-3xl mb-12 max-w-4xl mx-auto font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>Harness the power of <span className="text-[#2323FF] font-black italic">Cognitive Intelligence</span> to dominate search intent.</p>
        <Link href="/auth" className="inline-block bg-[#2323FF] text-white px-16 py-6 rounded-2xl font-black text-xs tracking-widest shadow-2xl hover:scale-105 transition-all uppercase">Launch System</Link>
      </section>

      <section className="relative z-10 pb-20"><InfiniteLogoStrip isDark={isDark} /></section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
            <div><h2 className={`text-6xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>Neural Core Layers</h2><p className="text-[#2323FF] mt-4 font-black uppercase tracking-[0.5em] text-[12px]">Dynamic AI Capabilities</p></div>
            <div className="flex gap-4">
                <button onClick={() => setActiveFeature(p => (p === 0 ? features.length - 1 : p - 1))} className={`p-5 rounded-2xl border transition-all ${isDark ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white border-slate-200"}`}><ChevronLeft size={24}/></button>
                <button onClick={() => setActiveFeature(p => (p === features.length - 1 ? 0 : p + 1))} className={`p-5 rounded-2xl border transition-all ${isDark ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white border-slate-200"}`}><ChevronRight size={24}/></button>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatePresence mode="wait">
            <motion.div key={activeFeature} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`p-20 rounded-[4rem] border text-left transition-all relative overflow-hidden ${isDark ? "bg-white/5 border-white/10 shadow-2xl" : "bg-slate-50 border-slate-100 shadow-2xl"}`}>
               <div className="bg-[#2323FF] w-24 h-24 rounded-3xl flex items-center justify-center mb-12 text-white shadow-lg shadow-[#2323FF]/30">{features[activeFeature].icon}</div>
               <h3 className="text-5xl font-black mb-8 uppercase italic tracking-tighter leading-none">{features[activeFeature].title}</h3>
               <p className="text-2xl text-slate-400 mb-12 font-medium leading-relaxed">{features[activeFeature].desc}</p>
               <div className="flex items-end gap-3 text-[#2323FF] font-black tracking-tighter">
                  <span className="text-7xl"><Counter value={features[activeFeature].stat} /></span><span className="text-2xl mb-3 opacity-60 uppercase">{features[activeFeature].unit}</span>
               </div>
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-2 gap-6">
            {features.map((f, i) => (
              <button key={i} onClick={() => setActiveFeature(i)} className={`p-10 rounded-[3rem] border text-left transition-all ${activeFeature === i ? "bg-[#2323FF] border-[#2323FF] text-white shadow-2xl scale-105" : isDark ? "bg-white/5 border-white/10 shadow-sm" : "bg-white border-slate-200 shadow-sm"}`}>
                <div className={`mb-6 ${activeFeature === i ? "text-white" : "text-[#2323FF]"}`}>{f.icon}</div><h4 className="font-black uppercase tracking-tight text-md mb-2">{f.title}</h4>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="knowledge" className="relative z-10 py-32 px-6 max-w-[1600px] mx-auto scroll-mt-32 text-left">
        <div className="text-center mb-24"><h2 className={`text-7xl font-black mb-6 uppercase tracking-tighter ${isDark ? "text-white" : "text-slate-950"}`}>The Methodology</h2><p className="text-[#2323FF] font-black uppercase tracking-[0.6em] text-[13px]">Why BERT-Integration Outranks Static Keywords</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className={`p-20 rounded-[5rem] border flex flex-col justify-center ${isDark ? "bg-[#2323FF]/5 border-[#2323FF]/10" : "bg-slate-50 border-slate-100 shadow-sm"}`}>
              <h3 className="text-6xl font-black mb-10 italic tracking-tight uppercase leading-none text-[#2323FF]">Intent Over Match</h3>
              <p className="text-3xl text-slate-500 mb-12 leading-relaxed font-bold leading-tight">Google no longer indexes strings. It indexes **Meaning**. We build your domain as a unified Knowledge Graph architecture.</p>
              <div className="flex gap-8"><div className="flex-1 p-10 bg-[#2323FF] rounded-[2.5rem] text-white shadow-2xl"><div className="text-5xl font-black mb-2 tracking-tighter">5120+</div><p className="text-[12px] font-black uppercase tracking-widest opacity-80 italic">Entities Linked</p></div><div className="flex-1 p-10 bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col justify-center"><div className="text-5xl font-black text-[#2323FF] mb-2 tracking-tighter">0.2s</div><p className="text-[12px] font-black uppercase tracking-widest text-slate-400 italic">Inference Speed</p></div></div>
           </motion.div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "AI-Reporting", d: "Automated white-label PDF audits instantly.", icon: <Database /> }, 
                { title: "Entity Maps", d: "Visualize and optimize Knowledge Graph structure.", icon: <Network /> }, 
                { title: "Algo-Alerts", d: "Real-time notifications of SERP shifts.", icon: <LucideTerminal /> }, 
                { title: "Gaps Analysis", d: "Automatically identify competitor content voids.", icon: <Search /> }
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -12, scale: 1.02 }} className={`p-10 rounded-[3rem] border flex flex-col items-start transition-all ${isDark ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white border-slate-200 shadow-2xl"}`}><div className="p-5 bg-[#2323FF] rounded-2xl text-white mb-8 shadow-lg shadow-[#2323FF]/20">{item.icon}</div><h4 className="font-black text-2xl uppercase italic tracking-tighter mb-4 text-inherit">{item.title}</h4><p className="text-slate-400 text-sm font-bold leading-relaxed">{item.d}</p></motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 py-20 border-t ${isDark ? "bg-[#050505] border-white/5" : "bg-slate-50 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-4 font-black text-3xl tracking-tight uppercase italic cursor-pointer" onClick={scrollToTop}><div className="p-2 rounded-lg bg-[#2323FF] text-white shadow-lg"><Cpu size={28}/></div><span className={isDark ? "text-white" : "text-[#2323FF]"}>NeuralEngine</span></div>
          <div className="flex gap-16 text-[14px] font-black uppercase tracking-widest text-slate-500"><Link href="#" className="hover:text-[#2323FF]">Terms</Link><Link href="#" className="hover:text-[#2323FF]">Privacy</Link><Link href="#" className="hover:text-[#2323FF]">Docs</Link></div>
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.3em]">© 2024 NEURALENGINE AI LABS</p>
        </div>
      </footer>

      {/* RENDER CHATBOT */}
      <AIChatbot isDark={isDark} />

    </div>
  );
}