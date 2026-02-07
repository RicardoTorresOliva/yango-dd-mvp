"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LiveScreening } from "@/components/LiveScreening";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Share2, Download, Building2, Gavel, Globe, FileText, User, Shield, AlertOctagon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { generatePDF } from "@/lib/generateReport";
import { getScenario } from "@/lib/scenarios";
import { useLanguage } from "@/lib/LanguageContext";

export default function ResultPage({ params }: { params: { id: string } }) {
    const { t, language } = useLanguage();
    const [complete, setComplete] = useState(false);
    const [resultData, setResultData] = useState<any>(null);

    const scenario = getScenario(params.id);

    const handleComplete = (data: any) => {
        setResultData(data);
        setComplete(true);
    };

    if (!complete) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-2 rounded-lg text-xs font-bold text-center animate-pulse mb-8">
                    STITCH DESIGN ENGINE ACTIVE - V2.0 ({language === 'en' ? 'SCANNING...' : 'ESCANEANDO...'})
                </div>
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{language === 'en' ? 'Analyzing Subject...' : 'Analizando Sujeto...'}</h2>
                    <p className="text-muted-foreground">{language === 'en' ? 'Running checks against national and international databases.' : 'Realizando verificaciones en bases de datos nacionales e internacionales.'}</p>
                </div>
                <LiveScreening onComplete={handleComplete} scenarioId={params.id} />
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>{language === 'en' ? 'Please wait while we verify 12+ data sources.' : 'Por favor espere mientras verificamos más de 12 fuentes de datos.'}</p>
                </div>
            </div>
        );
    }

    const isHighRisk = resultData?.risk === 'HIGH';
    const isMediumRisk = resultData?.risk === 'MEDIUM';
    const isLowRisk = resultData?.risk === 'LOW';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-slate-200 dark:border-slate-700">
                <div className={cn("h-2 w-full", isHighRisk ? "bg-red-600" : isMediumRisk ? "bg-amber-500" : "bg-emerald-500")} />
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{t.dueDiligenceReport}</h1>
                            <p className="text-slate-600 dark:text-slate-400">{t.caseId}: <span className="font-mono text-slate-900 dark:text-slate-200 uppercase">YG-PE-{params.id}</span></p>
                            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div><span className="text-slate-600 dark:text-slate-400 font-medium">{t.subject}:</span> <span className="font-semibold ml-2 text-slate-900 dark:text-white">{scenario.name}</span></div>
                                <div><span className="text-slate-600 dark:text-slate-400 font-medium">{t.docId}:</span> <span className="font-semibold ml-2 text-slate-900 dark:text-white">{params.id}</span></div>
                                <div><span className="text-slate-600 dark:text-slate-400 font-medium">{t.region}:</span> <span className="font-semibold ml-2 text-slate-900 dark:text-white">Peru (LIMA)</span></div>
                                <div><span className="text-slate-600 dark:text-slate-400 font-medium">{t.date}:</span> <span className="font-semibold ml-2 text-slate-900 dark:text-white">{new Date().toLocaleDateString()}</span></div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-64">
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4">{t.securityRecommendation}</p>
                            <div className="flex items-center justify-between gap-2 px-2">
                                <div className="flex flex-col items-center gap-2">
                                    <div className={cn("w-10 h-10 rounded-full border-2 flex items-center justify-center", isHighRisk ? "border-red-500 bg-red-100 dark:bg-red-900/20" : "border-slate-200 dark:border-slate-700")}>
                                        {isHighRisk && <div className="w-6 h-6 rounded-full bg-red-500" />}
                                    </div>
                                    <span className={cn("text-[10px] font-bold", isHighRisk ? "text-red-600" : "text-slate-400")}>{t.noGo}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={cn("w-10 h-10 rounded-full border-2 flex items-center justify-center", isMediumRisk ? "border-amber-500 bg-amber-100 dark:bg-amber-900/20" : "border-slate-200 dark:border-slate-700")}>
                                        {isMediumRisk && <div className="w-6 h-6 rounded-full bg-amber-500" />}
                                    </div>
                                    <span className={cn("text-[10px] font-bold", isMediumRisk ? "text-amber-600" : "text-slate-400")}>{t.review}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={cn("w-10 h-10 rounded-full border-2 flex items-center justify-center", isLowRisk ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-700")}>
                                        {isLowRisk && <div className="w-6 h-6 rounded-full bg-emerald-500" />}
                                    </div>
                                    <span className={cn("text-[10px] font-bold", isLowRisk ? "text-emerald-600" : "text-slate-400")}>{t.go}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="text-red-600" />
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.taxAssetVerification}</h2>
                        </div>
                        <div className="space-y-4">
                            <div className={cn("flex items-center justify-between p-4 rounded-lg border", isHighRisk ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/30" : "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30")}>
                                <div className="flex items-center gap-3">
                                    {isHighRisk ? <AlertOctagon className="text-red-600" /> : <CheckCircle className="text-emerald-600" />}
                                    <div>
                                        <p className={cn("font-semibold", isHighRisk ? "text-red-900 dark:text-red-200" : "text-emerald-900 dark:text-emerald-200")}>SUNAT Tax Status</p>
                                        <p className="text-sm opacity-80">{isHighRisk ?
                                            (language === 'en' ? "Outstanding Coactive Debt Detected" : "Deuda Coactiva Pendiente Detectada") :
                                            (language === 'en' ? "Active & Compliant. No outstanding debt." : "Activo y Cumplidor. Sin deudas pendientes.")}</p>
                                    </div>
                                </div>
                                <span className={cn("text-xs font-bold px-2 py-1 rounded uppercase", isHighRisk ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700")}>{isHighRisk ? t.flagged : t.verified}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <Building2 className="text-slate-500" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">SUNARP Assets</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? "Property and vehicle registry checked." : "Verificación en registros de propiedad y vehículos."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <Gavel className="text-red-600" />
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.judicialLegal}</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <Shield className="text-slate-500" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{language === 'en' ? 'Criminal Records' : 'Antecedentes Penales'}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Police (PNP) and Judicial (INPE) checks.' : 'Verificaciones policiales (PNP) y judiciales (INPE).'}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 rounded uppercase">{t.checked}</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="text-red-600" />
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.sanctionsMedia}</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{language === 'en' ? 'Global Lists' : 'Listas Globales'}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">OFAC SDN List</span>
                                        <span className="text-emerald-600 font-medium">{t.noMatch}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Interpol Red Notice</span>
                                        <span className="text-emerald-600 font-medium">{t.noMatch}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="bg-slate-900 text-white rounded-xl p-6">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.analystConclusion}</p>
                        <p className="text-sm leading-relaxed text-slate-300 italic mb-4">
                            {isHighRisk
                                ? (language === 'en' ? "Significant risk factors identified including tax non-compliance and potential adverse media. Proceed with extreme caution or reject." : "Se identificaron factores de riesgo significativos, incluyendo incumplimiento tributario y posibles medios adversos. Proceda con extrema precaución o rechace.")
                                : (language === 'en' ? "Subject cleared all standard checks with no negative findings. Recommended for approval." : "El sujeto superó todas las verificaciones estándar sin hallazgos negativos. Recomendado para aprobación.")
                            }
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold">AI</div>
                            <div>
                                <p className="text-xs font-bold">Yango AI Agent</p>
                                <p className="text-[10px] text-slate-400">Automated Screener</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 lg:hidden flex gap-3 z-30">
                <Button className="flex-1" onClick={() => generatePDF({ ...resultData, id: params.id, name: scenario.name })}>
                    {t.downloadReport}
                </Button>
            </div>

            <div className="flex justify-end mt-8 pb-20">
                <Button className="hidden lg:flex gap-2 h-11 px-8 text-lg" onClick={() => generatePDF({ ...resultData, id: params.id, name: scenario.name })}>
                    <Download size={18} /> {t.downloadReport} (PDF)
                </Button>
            </div>
        </motion.div>
    );
}
