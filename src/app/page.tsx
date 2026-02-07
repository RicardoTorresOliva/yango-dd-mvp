"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Landmark, Building2, Gavel, ShieldAlert, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Dashboard() {
    const router = useRouter();
    const { t } = useLanguage();
    const [docType, setDocType] = useState("DNI");
    const [idNumber, setIdNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!idNumber) return;
        setLoading(true);
        setTimeout(() => {
            router.push(`/screening/result/${idNumber}`);
        }, 1500);
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Design Version Banner */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-2 rounded-lg text-xs font-bold text-center animate-pulse">
                🚀 STITCH DESIGN ENGINE ACTIVE - V2.0
            </div>

            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                    {t.backgroundScreening}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    {t.performInstant}
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden scale-105">
                    <div className="p-10">
                        <div className="flex flex-col gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{t.documentType}</label>
                                <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                                    {["DNI", "RUC", "PASSPORT"].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setDocType(type)}
                                            className={cn(
                                                "py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200",
                                                docType === type
                                                    ? "bg-white dark:bg-slate-700 text-red-600 shadow-md ring-1 ring-slate-200 dark:ring-slate-600"
                                                    : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">{t.identificationNumber}</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-600 transition-colors">
                                        <Search size={24} />
                                    </div>
                                    <input
                                        className="block w-full pl-14 pr-6 py-5 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-red-600 focus:border-red-600 text-slate-900 dark:text-white text-2xl font-bold tracking-widest placeholder:text-slate-300 transition-all shadow-inner"
                                        id="id-number"
                                        placeholder={t.enterNumber}
                                        type="text"
                                        value={idNumber}
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 text-xl active:scale-[0.97] disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t.runningChecks}</span>
                                    </div>
                                ) : (
                                    <>
                                        <ShieldAlert size={24} />
                                        {t.investigate.toUpperCase()}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: t.sunatScreening, icon: Landmark, desc: t.sunatDesc },
                    { title: t.sunarpRecords, icon: Building2, desc: t.sunarpDesc },
                    { title: t.judicialHistory, icon: Gavel, desc: t.judicialDesc },
                    { title: t.sanctionsWatchlist, icon: Globe, desc: t.sanctionsDesc }
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-600/30 transition-all group shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center mb-4 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                            <item.icon size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">{item.title}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t.recentInvestigations}</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                                <th className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t.subject}</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t.documentType}</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t.date}</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest text-right">{t.riskScore}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[
                                { name: "Juan Perez Silva", id: "DNI 45****89", date: "Oct 24", risk: t.go },
                                { name: "Inversiones Noriega SAC", id: "RUC 205****12", date: "Oct 23", risk: t.review },
                                { name: "Logística del Caribe Ltd", id: "NIT 900****5-1", date: "Oct 21", risk: t.noGo }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group" onClick={() => router.push(`/screening/result/45882190`)}>
                                    <td className="px-8 py-6 font-bold text-slate-900 dark:text-slate-100">{row.name}</td>
                                    <td className="px-8 py-6 text-sm text-slate-500 dark:text-slate-400 font-mono">{row.id}</td>
                                    <td className="px-8 py-6 text-sm text-slate-500 dark:text-slate-400">{row.date}</td>
                                    <td className="px-8 py-6 text-right">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-black tracking-widest",
                                            row.risk === t.go ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                                row.risk === t.review ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        )}>
                                            {row.risk}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
