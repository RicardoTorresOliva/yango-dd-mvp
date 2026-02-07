export type ScreeningStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Candidate {
    id: string;
    type: 'INDIVIDUAL' | 'COMPANY';
    identifier: string; // RUC or DNI/Passport
    name: string;
    country: 'PER' | 'COL';
    createdAt: string;
}

export interface ScreeningResult {
    candidateId: string;
    status: ScreeningStatus;
    overallRisk: RiskLevel;
    findings: Finding[];
    checks: CheckStatus[];
    reportUrl?: string;
    completedAt?: string;
}

export interface Finding {
    id: string;
    severity: RiskLevel;
    category: 'TAX' | 'LEGAL' | 'SANCTIONS' | 'MEDIA' | 'CRIMINAL';
    description: string;
    sourceUrl?: string;
}

export interface CheckStatus {
    name: string; // e.g. "SUNAT", "OFAC"
    status: 'WAITING' | 'RUNNING' | 'DONE' | 'ERROR';
    foundIssues: boolean;
}
