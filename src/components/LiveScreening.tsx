"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { getScenario } from '@/lib/scenarios';
import { useLanguage } from "@/lib/LanguageContext";

interface Check {
    id: string;
    nameEn: string;
    nameEs: string;
    status: 'waiting' | 'running' | 'completed' | 'failed';
    risk: 'low' | 'medium' | 'high';
    messageEn?: string;
    messageEs?: string;
}

const steps = [
    { id: 'reniec', nameEn: 'Identity Verification (RENIEC/Migraciones)', nameEs: 'Verificación de Identidad (RENIEC/Migraciones)' },
    { id: 'sunat', nameEn: 'Tax Compliance (SUNAT)', nameEs: 'Cumplimiento Tributario (SUNAT)' },
    { id: 'sunarp', nameEn: 'Corporate Registry (SUNARP)', nameEs: 'Registros Públicos (SUNARP)' },
    { id: 'sat', nameEn: 'Municipal Debts (SAT)', nameEs: 'Deudas Municipales (SAT)' },
    { id: 'judicial', nameEn: 'Judicial Records (Poder Judicial)', nameEs: 'Antecedentes Judiciales (Poder Judicial)' },
    { id: 'sanctions', nameEn: 'International Sanctions (OFAC/UN/EU)', nameEs: 'Sanciones Internacionales (OFAC/ONU/UE)' },
    { id: 'media', nameEn: 'Adverse Media Screening', nameEs: 'Evaluación de Medios Adversos' },
];

export function LiveScreening({ onComplete, scenarioId }: { onComplete: (data: any) => void, scenarioId?: string }) {
    const { language } = useLanguage();
    const scenario = getScenario(scenarioId || "");
    const [checks, setChecks] = useState<any[]>(
        steps.map(s => ({ ...s, status: 'waiting', risk: 'low' }))
    );

    useEffect(() => {
        let currentStep = 0;

        const runNextStep = () => {
            if (currentStep >= steps.length) {
                setTimeout(() => onComplete(scenario), 1000);
                return;
            }

            const stepRef = steps[currentStep];
            const scenarioStep = scenario.steps.find((s: any) => s.id === stepRef.id) || { status: 'completed', risk: 'low', message: 'Checked', messageEs: 'Verificado' };

            setChecks(prev => prev.map(c => c.id === stepRef.id ? { ...c, status: 'running' } : c));

            const delay = Math.random() * 700 + 800;

            setTimeout(() => {
                setChecks(prev => prev.map(c => {
                    if (c.id === stepRef.id) {
                        return {
                            ...c,
                            status: 'completed',
                            risk: scenarioStep.risk,
                            messageEn: scenarioStep.message,
                            messageEs: scenarioStep.messageEs || scenarioStep.message
                        };
                    }
                    return c;
                }));

                currentStep++;
                runNextStep();
            }, delay);
        };

        runNextStep();
    }, [onComplete, scenarioId, scenario]);

    return (
        <div className="space-y-6">
            {checks.map((check) => (
                <div key={check.id} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                    <div className="w-8 flex justify-center">
                        {check.status === 'waiting' && <span className="w-3 h-3 rounded-full bg-muted-foreground/20" />}
                        {check.status === 'running' && <Loader2 className="animate-spin text-primary" />}
                        {check.status === 'completed' && check.risk === 'low' && <CheckCircle className="text-green-500" />}
                        {check.status === 'completed' && check.risk !== 'low' && <AlertTriangle className="text-amber-500" />}
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium text-sm">{language === 'en' ? check.nameEn : check.nameEs}</span>
                            <span className="text-xs text-muted-foreground capitalize">
                                {check.status === 'waiting' ? (language === 'en' ? 'Waiting' : 'Esperando') :
                                    check.status === 'running' ? (language === 'en' ? 'Running' : 'Ejecutando') :
                                        (language === 'en' ? 'Completed' : 'Completado')}
                            </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            {check.status === 'running' && (
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                            {check.status === 'completed' && (
                                <div className={`h-full w-full ${check.risk === 'low' ? 'bg-green-500' : 'bg-amber-500'}`} />
                            )}
                        </div>
                        {(check.messageEn || check.messageEs) && check.status === 'completed' && (
                            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                {check.risk !== 'low' && <AlertTriangle size={12} className="text-amber-500" />}
                                {language === 'en' ? check.messageEn : check.messageEs}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
