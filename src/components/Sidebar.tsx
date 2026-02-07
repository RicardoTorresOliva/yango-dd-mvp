"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Search, FileText, Settings, ShieldAlert, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export function Sidebar() {
    const pathname = usePathname();
    const { language, t } = useLanguage();

    const menuItems = [
        { href: "/", label: t.dashboard, icon: LayoutDashboard },
        { href: "/screening", label: t.newScreening, icon: Search },
        { href: "/reports", label: t.reports, icon: FileText },
        { href: "/settings", label: t.settings, icon: Settings },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldAlert className="text-red-600" size={32} />
                    <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        YANGO <span className="text-red-600">DD</span>
                    </span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">Due Diligence Platform</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors">
                    <LogOut size={20} />
                    <span>{language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}</span>
                </button>
            </div>
        </div>
    );
}
