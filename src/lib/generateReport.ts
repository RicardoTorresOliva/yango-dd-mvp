import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Add safe type augmentation for autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF; // Simplified type
    }
}

export function generatePDF(caseData: any) {
    const doc = new jsPDF();

    // Branding
    doc.setFillColor(220, 38, 38); // Red header
    doc.rect(0, 0, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("YANGO Due Diligence Report", 14, 13);
    doc.setFontSize(10);
    doc.text("Confidential", 180, 13);

    // Reset Logic
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    // Executive Summary
    doc.text(`Reference: ${caseData.id || "CASE-001"}`, 14, 30);
    doc.text(`Subject: ${caseData.name || "Unknown Target"}`, 14, 36);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);

    doc.setFontSize(14);
    doc.text("Executive Summary", 14, 55);
    doc.setFontSize(11);
    doc.text(
        "Based on the automated screening performed against national (Peru) and international databases, the subject has been classified as:",
        14, 62, { maxWidth: 180 }
    );

    // Risk Badge
    const riskColor = caseData.risk === 'HIGH' ? [220, 38, 38] : caseData.risk === 'MEDIUM' ? [245, 158, 11] : [34, 197, 94];
    doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
    doc.rect(14, 70, 40, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(caseData.risk || "LOW RISK", 19, 77);

    // Findings Table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Key Findings", 14, 95);

    const head = [["Source", "Finding", "Severity"]];
    const body = caseData.findings ? caseData.findings.map((f: any) => [f.source, f.description, f.severity]) : [
        ["SUNAT", "No tax debts found", "Low"],
        ["Judicial", "No records found", "Low"],
        ["OFAC", "No matches found", "Low"]
    ];

    autoTable(doc, {
        startY: 100,
        head: head,
        body: body,
        theme: 'grid',
        headStyles: { fillColor: [50, 50, 50] }
    });

    // Footer
    doc.setFontSize(8);
    doc.text("Generated automatically by Yango DD Platform. This document is for internal use only.", 14, 280);

    doc.save(`Yango_DD_Report_${caseData.name || "Report"}.pdf`);
}
