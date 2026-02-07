export const SCENARIOS: Record<string, any> = {
    // Scenario 1: Clean Individual
    "45892102": {
        name: "Juan Perez",
        type: "INDIVIDUAL",
        risk: "LOW",
        findings: [],
        steps: [
            { id: 'reniec', status: 'completed', risk: 'low', message: 'Identity Confirmed' },
            { id: 'sunat', status: 'completed', risk: 'low', message: 'No tax debts' },
            { id: 'judicial', status: 'completed', risk: 'low', message: 'Clean record' },
            { id: 'sanctions', status: 'completed', risk: 'low', message: 'Not found on watchlists' },
            { id: 'media', status: 'completed', risk: 'low', message: 'No adverse news' },
        ]
    },
    // Scenario 2: High Risk Company
    "20601234567": {
        name: "Transportes Riesgosos SAC",
        type: "COMPANY",
        risk: "HIGH",
        findings: [
            { source: "SUNAT", description: "Coactive Debt > 50k PEN", severity: "High" },
            { source: "Judicial", description: "Labor lawsuit pending", severity: "Medium" },
            { source: "Adverse Media", description: "Linked to illegal mining report (2024)", severity: "High" }
        ],
        steps: [
            { id: 'sunat', status: 'completed', risk: 'high', message: 'Coactive Debt Found' },
            { id: 'sunarp', status: 'completed', risk: 'low', message: 'Company Active' },
            { id: 'judicial', status: 'completed', risk: 'medium', message: 'Civil Lawsuit Found' },
            { id: 'sanctions', status: 'completed', risk: 'low', message: 'Clean' },
            { id: 'media', status: 'completed', risk: 'high', message: 'Negative press matches' },
        ]
    }
};

export function getScenario(id: string) {
    // Return specific scenario or a random clean one
    return SCENARIOS[id] || {
        name: "Unknown Candidate",
        type: "INDIVIDUAL",
        risk: "LOW",
        findings: [],
        steps: [
            { id: 'reniec', status: 'completed', risk: 'low', message: 'Verified' },
            { id: 'sunat', status: 'completed', risk: 'low', message: 'Clean' },
            { id: 'judicial', status: 'completed', risk: 'low', message: 'Clean' },
            { id: 'sanctions', status: 'completed', risk: 'low', message: 'Clean' },
            { id: 'media', status: 'completed', risk: 'low', message: 'Clean' },
        ]
    };
}
