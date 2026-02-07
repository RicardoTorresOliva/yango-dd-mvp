"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertTriangle, AlertOctagon, Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
    const router = useRouter();

    // Mock Data
    const reports = [
        { id: "CASE-2026-001", name: "Juan Perez Transport", type: "COMPANY", date: "2026-02-06", status: "Completed", risk: "LOW" },
        { id: "CASE-2026-002", name: "Carlos M. Driver", type: "INDIVIDUAL", date: "2026-02-06", status: "Completed", risk: "HIGH" },
        { id: "CASE-2026-003", name: "Logistica Lima SAC", type: "COMPANY", date: "2026-02-05", status: "Completed", risk: "MEDIUM" },
        { id: "CASE-2026-004", name: "Maria Rodriguez", type: "INDIVIDUAL", date: "2026-02-05", status: "In Progress", risk: "LOW" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Investigation History</h2>
                <p className="text-muted-foreground">Archive of all past due diligence screenings.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                            <TableHead className="w-[100px]">Case ID</TableHead>
                            <TableHead>Target Entity</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow
                                key={report.id}
                                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                onClick={() => router.push(`/screening/result/${report.id.replace('CASE', 'YG')}`)}
                            >
                                <TableCell className="font-medium">{report.id}</TableCell>
                                <TableCell>{report.name}</TableCell>
                                <TableCell className="text-xs uppercase text-muted-foreground">{report.type}</TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2 py-1 rounded-full text-xs font-semibold",
                                        report.status === "Completed" ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : "bg-blue-100 text-blue-700"
                                    )}>
                                        {report.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {report.risk === 'LOW' && <span className="flex items-center text-emerald-600 gap-1 font-medium"><CheckCircle size={14} /> Low</span>}
                                    {report.risk === 'MEDIUM' && <span className="flex items-center text-amber-600 gap-1 font-medium"><AlertTriangle size={14} /> Medium</span>}
                                    {report.risk === 'HIGH' && <span className="flex items-center text-red-600 gap-1 font-medium"><AlertOctagon size={14} /> High</span>}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); /* download */ }}>
                                        <Download size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
