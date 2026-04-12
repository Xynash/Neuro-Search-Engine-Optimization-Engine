"use client";
import { LayoutDashboard, Globe, Share2, BarChart3, Zap, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const menu = [
    { icon: <LayoutDashboard size={20}/>, label: "Overview", href: "/dashboard" },
    { icon: <Share2 size={20}/>, label: "Playground", href: "/dashboard/playground" },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-2 font-bold text-xl text-brand-600 mb-10 px-2">
          <Zap fill="currentColor" /> NeuralEngine
        </div>
        <nav className="flex-1 space-y-1">
          {menu.map((item) => (
            <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === item.href ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:bg-slate-50'}`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Project: neural-seo</span>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}