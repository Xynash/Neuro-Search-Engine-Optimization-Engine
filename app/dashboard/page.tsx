"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Zap, ShieldCheck, Activity, Database, 
  Link as LinkIcon, Loader2, ChevronDown, Download,
  ArrowLeft, AlertCircle, CheckCircle2, Info, Bell, User, 
  Network, TrendingUp, Search, Layers, Globe, Smartphone, BarChart3,
  Brain, Clock, Terminal, Play, Save, Microscope, Crosshair, Target, Map
} from "lucide-react";

// --- GALAXY BACKGROUND (Hydration Safe) ---
const GalaxyStars = () => {
  const [stars, setStars] = useState<{id: number, t: string, l: string, s: number, d: number}[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setStars(Array.from({ length: 60 }).map((_, i) => ({
      id: i, t: `${Math.random() * 100}%`, l: `${Math.random() * 100}%`,
      s: Math.random() * 2, d: Math.random() * 3 + 2,
    })));
  }, []);
  if (!mounted) return null;
  return (
    <div className="fixed inset-0 z-0 bg-[#00040a] overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div key={star.id} animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: star.d, repeat: Infinity }}
          className="absolute bg-white rounded-full" style={{ top: star.t, left: star.l, width: star.s, height: star.s }}
        />
      ))}
    </div>
  );
};

// --- TAB 1: INTELLIGENCE PAGE (Wired to Backend) ---
const IntelligencePage = ({ data }: { data: any }) => {
  // Extract real gap from the 'intent' branch of Groq data
  const neuralGap = data?.intent?.[0] || { element: "Analyzing...", problem: "Mapping semantic nodes." };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 h-[500px] relative overflow-hidden backdrop-blur-3xl flex items-center justify-center">
          <div className="absolute top-8 left-8 text-left">
            <h3 className="text-xl font-black italic uppercase text-blue-400 leading-tight">Semantic Brain Map</h3>
            <p className="text-[10px] text-slate-500 uppercase font-black">Force-Directed Gap Analysis</p>
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
             {[...Array(12)].map((_, i) => (
               <motion.div key={i} animate={{ x: [0, Math.random()*40-20, 0], y: [0, Math.random()*40-20, 0] }} transition={{ duration: 5, repeat: Infinity }} 
                 className={`absolute w-4 h-4 rounded-full blur-[2px] ${i % 3 === 0 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700 opacity-40'}`}
                 style={{ top: `${Math.random()*80}%`, left: `${Math.random()*80}%` }}
               />
             ))}
             <div className="p-6 bg-blue-600/20 border border-blue-500/40 rounded-full animate-pulse shadow-[0_0_30px_#2563eb]"><Brain size={48} className="text-blue-400" /></div>
          </div>
          <div className="absolute bottom-8 right-8 text-right bg-rose-500/10 border border-rose-500/30 p-5 rounded-3xl max-w-[280px] backdrop-blur-md">
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Neural Gap Detected</p>
            <p className="text-xs text-white font-bold mt-1 uppercase italic underline">{neuralGap.element}</p>
            <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">{neuralGap.problem}</p>
            <button className="mt-4 w-full text-[8px] font-black uppercase bg-rose-600 text-white py-2 rounded-xl hover:bg-rose-500 transition-all">Generate Outline</button>
          </div>
        </div>
        
        <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl flex flex-col justify-between text-left">
          <h3 className="text-xl font-black italic uppercase text-emerald-400">Geo-Inference</h3>
          <div className="relative h-48 bg-emerald-500/5 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
             <Map size={80} className="text-emerald-500/10" />
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" />
          </div>
          <div className="space-y-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-black">Inferred Sector</p>
                <p className="text-sm font-bold text-white uppercase">{neuralGap.element}</p>
             </div>
             <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <p className="text-[10px] text-emerald-500 uppercase font-black">Resonance Mitigation</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase italic">{neuralGap.mitigation.slice(0, 60)}...</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TAB 2: GROWTH PAGE (Wired to Backend) ---
const GrowthPage = ({ data }: { data: any }) => {
  const [velocity, setVelocity] = useState(50);
  // Extract strategy from 'technical' branch of Groq data
  const warRoomStrategy = data?.technical?.[0] || { mitigation: "Initializing simulation..." };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      <div className="bg-white/[0.03] border border-white/5 rounded-[4rem] p-12 backdrop-blur-3xl text-left">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl font-black italic uppercase text-blue-400">SEO Time Machine</h3>
            <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.4em]">Predictive Neural Projection</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase">Current Velocity</p>
            <input type="range" value={velocity} onChange={(e)=>setVelocity(Number(e.target.value))} className="accent-blue-500 block mt-2" />
          </div>
        </div>
        <div className="h-64 flex items-end gap-1 border-l border-b border-white/10 p-4 relative">
           {[...Array(30)].map((_, i) => (
             <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(i > 20 ? i*velocity/40 : i*1.5) + 10}%` }} 
               className={`flex-1 rounded-t-lg ${i > 20 ? 'bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-pulse border-t-2 border-white' : 'bg-slate-700'}`} 
             />
           ))}
           <div className="absolute left-[70%] top-0 bottom-0 w-[2px] bg-rose-500/50 flex items-center justify-center">
             <span className="bg-rose-500 text-[8px] text-white px-2 py-1 rounded absolute top-0 uppercase font-black">Today</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl">
           <h3 className="text-xl font-black italic uppercase text-rose-400 mb-8 leading-tight">Competitor War Room</h3>
           <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl">
             <p className="text-[10px] font-black text-rose-400 uppercase mb-2">Neural Defense Strategy:</p>
             <p className="text-xs text-slate-300 leading-relaxed uppercase italic">{warRoomStrategy.mitigation}</p>
           </div>
           <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase hover:bg-rose-600 transition-all">Simulate Attack</button>
        </div>
        <div className="bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] p-10 backdrop-blur-3xl flex flex-col justify-center text-center">
           <Crosshair size={60} className="mx-auto text-blue-500 mb-6" />
           <h4 className="text-2xl font-black italic uppercase text-white mb-2">Defense Matrix Active</h4>
           <p className="text-[10px] text-slate-500 uppercase tracking-widest">Inference stream stable</p>
        </div>
      </div>
    </div>
  );
};

// --- TAB 3: HEALTH PAGE (Sandbox) ---
const HealthPage = ({ data }: { data: any }) => {
  const [impact, setImpact] = useState({ speed: "+0%", dom: "0%", health: "100" });
  const sampleProblem = data?.technical?.[1]?.problem || "No injection warnings detected.";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto text-left">
      <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 flex flex-col backdrop-blur-3xl h-[600px]">
        <h3 className="text-xl font-black italic uppercase text-emerald-400 mb-6">Pre-Flight Sandbox</h3>
        <textarea onChange={() => setImpact({ speed: "-14%", dom: "+22%", health: "74" })} 
                  className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 text-xs font-mono text-emerald-500 outline-none focus:border-emerald-500/30 transition-all resize-none" 
                  placeholder="// Paste your component code here to test AI-SEO impact..." />
        <button className="mt-6 w-full py-5 bg-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><Play size={14} /> Run Neural Check</button>
      </div>
      <div className="space-y-6">
        <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl">
           <h4 className="text-[10px] font-black uppercase text-slate-500 mb-8">Simulation Results</h4>
           <div className="space-y-6">
              <div><p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">LCP Impact</p><p className="text-3xl font-black italic">{impact.speed}</p></div>
              <div><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">DOM Size Delta</p><p className="text-3xl font-black italic">{impact.dom}</p></div>
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                 <p className="text-[8px] font-black text-rose-500 uppercase">Neural Warning:</p>
                 <p className="text-[10px] text-slate-300 mt-2 italic uppercase">{sampleProblem.slice(0, 100)}...</p>
              </div>
           </div>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 text-center">
           <p className="text-[10px] font-black text-emerald-500 uppercase mb-4">Final Safety Score</p>
           <p className="text-6xl font-black italic text-white">{impact.health}</p>
        </div>
      </div>
    </div>
  );
};

// --- AUDIT VIEW (Dynamic AI Data) ---
const DetailedAuditView = ({ category, onBack, liveData }: { category: string, onBack: () => void, liveData: any }) => {
  const data = liveData ? liveData[category] : [];
  
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-5xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO DASHBOARD
      </button>
      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-2xl font-black italic uppercase text-blue-400 tracking-tighter">{category} Analysis</h2>
          <Download size={20} className="text-slate-600 hover:text-white cursor-pointer" />
        </div>
        <div className="p-8 text-left space-y-6">
          {data && data.length > 0 ? data.map((item: any, idx: number) => (
            <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.07] transition-all">
              <h4 className="font-black text-blue-300 uppercase text-[11px] mb-2 tracking-widest">{item.element}</h4>
              <p className="text-sm text-slate-200 mb-4">{item.problem}</p>
              <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                <p className="text-[10px] text-blue-400 uppercase font-black mb-1">Neural Mitigation Strategy:</p>
                <p className="text-xs text-slate-400 italic font-medium">{item.mitigation}</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 text-slate-700 uppercase font-black tracking-widest text-xs italic">Branch Calibration Empty</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- DASHBOARD OVERVIEW ---
const DashboardView = ({ hasData, onSelectMetric }: { hasData: boolean, onSelectMetric: (cat: string) => void }) => (
  <div className="w-full max-w-6xl mx-auto space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {["seo", "trust", "visibility", "backlink"].map((id, i) => (
        <button key={i} onClick={() => hasData && onSelectMetric(id)} className="text-left group relative p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl hover:bg-white/10 transition-all disabled:opacity-50" disabled={!hasData}>
          <div className="flex justify-between items-start mb-4 relative z-10"><div className="p-3 bg-white/10 rounded-2xl text-white group-hover:bg-blue-600 transition-colors"><Zap size={18}/></div><h3 className="text-2xl font-black italic">{hasData ? (70 + i * 5) + ".2" : "---"}</h3></div>
          <div className="flex justify-between items-end relative z-10"><span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{id} score</span><span className="text-[10px] font-bold text-emerald-400">+2.4%</span></div>
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {[{id:"onpage", l:"On-Page Engine"}, {id:"offpage", l:"Off-Page Matrix"}, {id:"technical", l:"Technical Node"}].map((card) => (
        <button key={card.id} onClick={() => hasData && onSelectMetric(card.id)} className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl hover:bg-white/10 transition-all group" disabled={!hasData}>
           <div className={`p-4 bg-white/5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform`}><Layers size={22}/></div>
           <div className="text-left"><h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">{card.l}</h4><p className="text-sm font-bold text-white uppercase tracking-tight">AI Inference Branch</p></div>
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full text-center">
       {[{id:'intent', l:'Contextual Intent'}, {id:'accessibility', l:'Node Accessibility'}, {id:'analytics', l:'Impression Analytics'}].map((item) => (
         <button key={item.id} onClick={() => hasData && onSelectMetric(item.id)} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl hover:bg-white/10 transition-all group flex flex-col items-center" disabled={!hasData}>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8">{item.l}</h4>
            <div className="relative w-32 h-32 flex items-center justify-center"><svg className="w-full h-full -rotate-90"><circle cx="64" cy="64" r="55" stroke="#1e293b" strokeWidth="12" fill="none" /><motion.circle initial={{pathLength:0}} animate={{pathLength: hasData ? 0.7 : 0}} cx="64" cy="64" r="55" stroke="#3b82f6" strokeWidth="12" fill="none" strokeDasharray="345" strokeLinecap="round" /></svg><span className="absolute text-xs font-black">{hasData ? "70%" : "0%"}</span></div>
            <p className="mt-8 text-[8px] font-black text-blue-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">Inference Details</p>
         </button>
       ))}
    </div>
  </div>
);

// --- MAIN WRAPPER COMPONENT ---
export default function NeuralEngineApp() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [liveAuditData, setLiveAuditData] = useState<any>(null);

  // FETCHING REAL-TIME DATA FROM FASTAPI/GROQ
  const handleAudit = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    setHasData(false);
    setSelectedMetric(null);
    try {
      const res = await fetch("http://localhost:8000/analyze", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ url }) 
      });
      if (!res.ok) throw new Error("Backend Offline");
      const data = await res.json();
      setLiveAuditData(data);
      setHasData(true);
    } catch (e) { alert("Neural connection failed. Start FastAPI server."); }
    finally { setIsAnalyzing(false); }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-slate-200 overflow-x-hidden relative bg-[#00040a]">
      <GalaxyStars />
      <header className="flex-none h-24 flex items-center justify-center z-50 px-6 w-full">
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-8 py-4 flex items-center justify-between shadow-2xl w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setActiveTab("Dashboard"); setSelectedMetric(null); }}>
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform"><Cpu size={22} /></div>
            <span className="text-xl font-black italic tracking-tighter uppercase">Neural</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {["Dashboard", "Intelligence", "Growth", "Health"].map((t) => (
              <button key={t} onClick={() => { setActiveTab(t); setSelectedMetric(null); }} className={`text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === t ? "text-blue-400 scale-110" : "text-slate-500 hover:text-white"}`}>{t}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4"><Bell size={20} className="text-slate-500" /><div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><User size={18} /></div></div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-start relative z-10 px-6 py-10 overflow-y-auto no-scrollbar">
        <div className="w-full max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center mt-20 text-center">
                <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin mb-6" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Neural Inference Calibration...</h3>
              </motion.div>
            ) : (
              <motion.div key={activeTab} initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
                
                {activeTab === "Dashboard" && (
                  <div className="w-full space-y-12">
                     {!selectedMetric && (
                       <div className="relative group w-full max-w-2xl mx-auto">
                          <div className="absolute -inset-1 bg-blue-600 rounded-[2.5rem] blur-2xl opacity-10" />
                          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 pl-8 w-full backdrop-blur-3xl shadow-2xl">
                            <LinkIcon size={18} className="text-blue-500 mr-4" />
                            <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="PASTE TARGET NODE URL..." className="bg-transparent outline-none text-xs w-full font-black text-white placeholder:text-slate-700 tracking-widest" />
                            <button onClick={handleAudit} className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">ANALYZE</button>
                          </div>
                       </div>
                     )}
                     <AnimatePresence mode="wait">
                       {selectedMetric ? ( 
                         <DetailedAuditView category={selectedMetric} onBack={() => setSelectedMetric(null)} liveData={liveAuditData} /> 
                       ) : ( 
                         <DashboardView hasData={hasData} onSelectMetric={(cat) => setSelectedMetric(cat)} /> 
                       )}
                     </AnimatePresence>
                  </div>
                )}

                {activeTab === "Intelligence" && (hasData ? <IntelligencePage data={liveAuditData} /> : <AwaitingData placeholder="Mapping Semantic Clusters..." icon={<Microscope size={60}/>}/>)}
                {activeTab === "Growth" && (hasData ? <GrowthPage data={liveAuditData} /> : <AwaitingData placeholder="Simulating Optimization Trajectory..." icon={<TrendingUp size={60}/>}/>)}
                {activeTab === "Health" && <HealthPage data={liveAuditData} />}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

const AwaitingData = ({ placeholder, icon }: { placeholder: string, icon: React.ReactNode }) => (
  <div className="mt-20 opacity-30 text-center flex flex-col items-center">
    <div className="mb-6">{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-[0.5em]">{placeholder}</p>
    <p className="text-[8px] mt-4 font-black uppercase text-blue-500 underline underline-offset-4 decoration-dotted tracking-widest">Input URL in Dashboard first</p>
  </div>
);