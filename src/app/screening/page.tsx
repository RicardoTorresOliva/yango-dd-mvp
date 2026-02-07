"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BadgeCheck, Search, ShieldCheck, ChevronLeft, Landmark, Building2, Gavel, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ScreeningPage() {
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
        <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-2 rounded-lg text-xs font-bold text-center animate-pulse">
                STITCH DESIGN ENGINE ACTIVE - V2.0
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                        {t.backgroundScreening}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        {t.performInstant}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mb-16">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t.documentType}</label>
                                    <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                        {["DNI", "RUC", "PASSPORT"].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setDocType(type)}
                                                className={cn(
                                                    "py-2.5 px-4 rounded-md text-sm font-medium transition-all shadow-sm",
                                                    docType === type
                                                        ? "bg-white dark:bg-slate-700 text-primary ring-1 ring-slate-200 dark:ring-slate-600"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="id-number">{t.identificationNumber}</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <BadgeCheck size={20} />
                                        </span>
                                        <input
                                            className="block w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-primary focus:border-primary text-slate-900 dark:text-white text-lg font-medium tracking-wider"
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
                                    className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 text-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>{t.runningChecks}</>
                                    ) : (
                                        <>
                                            <Search size={20} />
                                            {t.investigate}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                {t.secureSsl}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Response time: ~2.5s</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: t.sunatScreening, icon: <Landmark size={24} />, desc: t.sunatDesc },
                        { title: t.sunarpRecords, icon: <Building2 size={24} />, desc: t.sunarpDesc },
                        { title: t.judicialHistory, icon: <Gavel size={24} />, desc: t.judicialDesc },
                        { title: t.sanctionsWatchlist, icon: <Globe size={24} />, desc: t.sanctionsDesc }
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-hover hover:border-primary/30 group">
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4 text-primary">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.recentInvestigations}</h2>
                        <button className="text-sm font-medium text-primary hover:underline">{t.viewAll}</button>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.entity}</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.docId}</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.date}</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">{t.riskScore}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => router.push('/screening/result/45882190')}>
                                    <td className="px-6 py-4 font-medium">Juan Perez Silva</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">DNI 45****89</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">Oct 24, 2023</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{t.go}</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => router.push('/screening/result/20512345678')}>
                                    <td className="px-6 py-4 font-medium">Inversiones Noriega SAC</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">RUC 205****12</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">Oct 23, 2023</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">{t.review}</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => router.push('/screening/result/900123456')}>
                                    <td className="px-6 py-4 font-medium">Logística del Caribe Ltd</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">NIT 900****5-1</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">Oct 21, 2023</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">{t.noGo}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
