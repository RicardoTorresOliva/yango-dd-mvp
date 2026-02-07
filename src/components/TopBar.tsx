"use client";

import { Bell, User, Languages } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function TopBar() {
    const { language, setLanguage } = useLanguage();

    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-8 flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Welcome back' : 'Bienvenido de nuevo'}, <span className="text-foreground font-semibold">Raúl Mejía</span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95 border border-slate-300 dark:border-slate-600"
                >
                    <Languages size={14} className="text-red-600" />
                    {language.toUpperCase()}
                </button>
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium">Regional Security</p>
                        <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <User size={16} />
                    </div>
                </div>
            </div>
        </header>
    );
}
