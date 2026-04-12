"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Globe, BarChart3, Zap, Network, Database, Layers, 
  Search, Bell, User, ShieldCheck, Activity, 
  Link as LinkIcon, Loader2, Sparkles, CheckCircle2, 
  Terminal, ShieldAlert, TrendingUp, Filter, ChevronDown, Download
} from "lucide-react";

// --- 1. GALAXY BACKGROUND (Overflow Fixed) ---
const GalaxyStars = () => {
  const [stars, setStars] = useState<{id: number, t: string, l: string, s: number, d: number}[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 60 }).map((_, i) => ({
      id: i, t: `${Math.random() * 100}%`, l: `${Math.random() * 100}%`,
      s: Math.random() * 2, d: Math.random() * 3 + 2,
    })));
  }, []);
  return (
    <div className="fixed inset-0 z-0 bg-[#00040a] overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div key={star.id} animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: star.d, repeat: Infinity }}
          className="absolute bg-white rounded-full"
          style={{ top: star.t, left: star.l, width: star.s, height: star.s }}
        />
      ))}
    </div>
  );
};

// --- 2. DASHBOARD VIEW (Measurements Reference Style) ---
const DashboardView = ({ hasData }: { hasData: boolean }) => (
  <div className="w-full space-y-6">
    {/* TOP ROW: 4 Metric Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { l: "Global SEO Score", v: "76.2", t: "+2.4%", c: "from-blue-500/20 to-blue-600/10", ic: <Zap size={18}/> },
        { l: "Trust Flow Index", v: "84%", t: "-1.1%", c: "from-purple-500/20 to-purple-600/10", ic: <ShieldCheck size={18}/> },
        { l: "Domain Visibility", v: "102k", t: "+62%", c: "from-emerald-500/20 to-emerald-600/10", ic: <Activity size={18}/> },
        { l: "Backlink Value", v: "$12.3B", t: "+4.4%", c: "from-rose-500/20 to-rose-600/10", ic: <Database size={18}/> },
      ].map((card, i) => (
        <div key={i} className={`p-6 rounded-3xl bg-gradient-to-br ${card.c} border border-white/5 backdrop-blur-xl relative overflow-hidden group`}>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-2xl text-white">{card.ic}</div>
            <h3 className="text-2xl font-black italic">{hasData ? card.v : "---"}</h3>
          </div>
          <div className="flex justify-between items-end relative z-10">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{card.l}</span>
            <span className={`text-[10px] font-bold ${card.t.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{card.t} ↗</span>
          </div>
        </div>
      ))}
    </div>

    {/* MIDDLE ROW: Contextual, Device Type, Measurement */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
       {/* Contextual Donut */}
       <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
          <div className="flex justify-between mb-8">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Contextual Intent</h4>
            <ChevronDown size={14} className="text-slate-600"/>
          </div>
          <div className="flex items-center gap-8">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="55" stroke="#1e293b" strokeWidth="12" fill="none" />
                  <motion.circle initial={{pathLength:0}} animate={{pathLength: hasData ? 0.7 : 0}} transition={{duration:1.5}} cx="64" cy="64" r="55" stroke="#3b82f6" strokeWidth="12" fill="none" strokeDasharray="345" strokeLinecap="round" />
                </svg>
                <span className="absolute text-xs font-black">70%</span>
             </div>
             <div className="space-y-2 text-[10px] font-bold text-slate-500 uppercase">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/> Tech: 40%</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"/> News: 20%</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Health: 10%</div>
             </div>
          </div>
       </div>

       {/* Device Type Rings */}
       <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
          <div className="flex justify-between mb-8">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Node Accessibility</h4>
            <ChevronDown size={14} className="text-slate-600"/>
          </div>
          <div className="flex justify-center relative h-32">
             {[1, 2, 3].map((r, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90" style={{ transform: `scale(${1 - i * 0.2}) rotate(-90deg)` }}>
                      <circle cx="64" cy="64" r="50" stroke="#1e293b" strokeWidth="8" fill="none" />
                      <motion.circle initial={{pathLength:0}} animate={{pathLength: hasData ? 0.8 - i * 0.2 : 0}} cx="64" cy="64" r="50" stroke={['#3b82f6', '#818cf8', '#34d399'][i]} strokeWidth="8" fill="none" strokeLinecap="round" />
                   </svg>
                </div>
             ))}
          </div>
       </div>

       {/* Measurement Line */}
       <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
          <div className="flex justify-between mb-4">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Impression Analytics</h4>
            <span className="text-[10px] text-rose-400">-33.45%</span>
          </div>
          <div className="h-24 w-full flex items-center justify-center relative">
             <svg className="w-full h-full opacity-40" viewBox="0 0 200 60">
                <motion.path initial={{pathLength:0}} animate={{pathLength: hasData ? 1 : 0}} d="M0,40 Q40,10 80,40 T160,20 T200,40" fill="none" stroke="#818cf8" strokeWidth="2" />
             </svg>
             {!hasData && <span className="absolute text-[8px] uppercase font-black text-slate-700 tracking-widest">Calibration...</span>}
          </div>
       </div>
    </div>

    {/* BOTTOM ROW: Spend by channel, Resonance score */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
       {/* Bar Chart Section */}
       <div className="lg:col-span-3 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
          <div className="flex justify-between mb-8">
             <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Crawl Volume by Sector</h4>
             <Download size={14} className="text-slate-600"/>
          </div>
          <div className="h-40 flex items-end justify-between px-4">
             {[40, 70, 45, 90, 60, 30, 85, 50, 95, 45, 80].map((h, i) => (
                <motion.div key={i} initial={{height:0}} animate={{height: hasData ? `${h}%` : 0}} className="w-6 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg opacity-40 hover:opacity-100 transition-opacity" />
             ))}
          </div>
       </div>

       {/* Radial Distribution */}
       <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
          <div className="flex justify-between mb-8">
             <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Semantic Resonance</h4>
          </div>
          <div className="flex items-center gap-10 h-32">
             <div className="space-y-2 flex-1">
                {['Node A', 'Node B', 'Node C'].map((item, i) => (
                   <div key={i} className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>{item}</span><span className="text-white">92</span>
                   </div>
                ))}
             </div>
             <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-24 h-24 border-4 border-dashed border-blue-500/20 rounded-full animate-spin-slow" />
                <div className="absolute w-16 h-16 border-2 border-emerald-500/30 rounded-full" />
                <Activity size={24} className="text-blue-500"/>
             </div>
          </div>
       </div>
    </div>
  </div>
);

export default function NeuralEngineApp() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasData, setHasData] = useState(false);

  const handleAudit = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setHasData(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasData(true);
    }, 2800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-slate-200 overflow-hidden relative bg-[#00040a]">
      <GalaxyStars />

      {/* --- NAVBAR (Fixed Top) --- */}
      <header className="flex-none h-24 flex items-center justify-center z-50">
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-10 py-4 flex items-center justify-between shadow-2xl w-full max-w-5xl mx-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab("Dashboard")}>
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
              <Cpu size={22} />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">Neural</span>
          </div>
          <nav className="flex items-center gap-10">
            {["Dashboard", "Intelligence", "Growth", "Health"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "text-blue-400 scale-110" : "text-slate-500 hover:text-white"}`}>{tab}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-slate-500 cursor-pointer" />
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><User size={18} /></div>
          </div>
        </div>
      </header>

      {/* --- CONTENT (Centered, No Scroll) --- */}
      <main className="flex-1 w-full flex flex-col items-center justify-center relative overflow-y-auto px-6 py-10 z-10 no-scrollbar">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center h-full">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-32 h-32 border-t-2 border-blue-500 rounded-full mb-10 shadow-[0_0_20px_#2563eb]" />
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">Inference Calibration</h3>
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-500 mt-4 opacity-70">Mapping Regional SEO Indices...</p>
            </motion.div>
          ) : (
            <motion.div key={activeTab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-7xl flex flex-col items-center">
              
              {/* DASHBOARD: TASKBAR + CONTENT */}
              {activeTab === "Dashboard" && (
                <div className="w-full flex flex-col items-center space-y-12">
                   {/* Taskbar */}
                   <div className="relative group w-full max-w-2xl">
                      <div className="absolute -inset-1 bg-blue-600 rounded-[2.5rem] blur-3xl opacity-0 group-focus-within:opacity-20 transition-opacity" />
                      <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 pl-8 w-full backdrop-blur-3xl shadow-2xl">
                        <LinkIcon size={18} className="text-blue-500 mr-4" />
                        <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="PASTE TARGET NODE URL..." className="bg-transparent outline-none text-xs w-full font-black text-white placeholder:text-slate-700 tracking-widest" />
                        <button onClick={handleAudit} disabled={isAnalyzing || !url} className="bg-blue-600 text-white px-12 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95 transition-all">
                          {isAnalyzing ? <Loader2 size={16} className="animate-spin"/> : <Zap size={16} fill="currentColor"/>}
                          ANALYZE
                        </button>
                      </div>
                   </div>
                   <DashboardView hasData={hasData} />
                </div>
              )}

              {/* OTHER SECTIONS */}
              {activeTab === "Intelligence" && (
                <div className="w-full max-w-5xl bg-white/[0.03] border border-white/5 rounded-[4rem] p-20 text-center">
                   <Network size={60} className="text-blue-500 mx-auto mb-10" />
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Semantic NLP Mapping</h3>
                   <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">{hasData ? 'Entity Clusters Verified' : 'Awaiting Dashboard Trigger'}</p>
                </div>
              )}
              
              {activeTab === "Growth" && (
                <div className="w-full max-w-5xl bg-white/[0.03] border border-white/5 rounded-[4rem] p-20 text-center">
                   <TrendingUp size={60} className="text-emerald-500 mx-auto mb-10" />
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Authority Projection Matrix</h3>
                   <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">{hasData ? 'Simulations Synthesized' : 'Awaiting Dashboard Trigger'}</p>
                </div>
              )}

              {activeTab === "Health" && (
                <div className="w-full max-w-5xl bg-white/[0.03] border border-white/5 rounded-[4rem] p-20 text-center">
                   <ShieldCheck size={60} className="text-purple-500 mx-auto mb-10" />
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Technical Security Nodes</h3>
                   <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">{hasData ? 'SSL/TLS & Vitals Stable' : 'Awaiting Dashboard Trigger'}</p>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}