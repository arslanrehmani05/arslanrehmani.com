// lib/facts.ts
import rawFactsData from '@/data/facts.json';

export type FactStatus = 'verified' | 'unverified';
export type FactCategory = 'metric' | 'client' | 'credential' | 'quote' | 'system' | 'meta';
export type CapabilityMaturity = 'Running in production' | 'Prototype' | 'Design';

export interface FactItem {
  id: string;
  category: FactCategory;
  claim: string;
  value: string;
  status: FactStatus;
  evidence: string;
  footnote: string;
}

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  maturity: CapabilityMaturity;
  status: FactStatus;
  costPerRun: string;
  forbidden: string[];
  humanApprovalPoints: string[];
  metricsTracked: string;
}

export interface NightlyEvals {
  lastRunTimestamp: string;
  goldenQuestionsPassRate: string;
  goldenQuestionsCount: number;
  promptInjectionDefenseRate: string;
  promptInjectionCount: number;
  schemaAssertionPassRate: string;
  schemaAssertionCount: number;
  status: string;
}

export interface FactsDatabase {
  version: string;
  truthGateEnforced: boolean;
  lastAudited: string;
  facts: FactItem[];
  agentCapabilities: AgentCapability[];
  nightlyEvals: NightlyEvals;
  placeholders: Record<string, string>;
}

const factsDb = rawFactsData as FactsDatabase;

/**
 * THE TRUTH GATE:
 * Looks up a factual claim by its evidence ID.
 * Returns the fact ONLY if status === 'verified'.
 * If the ID is missing or status != 'verified', logs a warning and returns null.
 */
export function getVerifiedFact(id: string): FactItem | null {
  const fact = factsDb.facts.find((f) => f.id === id);

  if (!fact) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Truth Gate Warning] Evidence ID "${id}" not found in facts.json. Rendering blocked.`);
    }
    return null;
  }

  if (fact.status !== 'verified') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[Truth Gate Warning] Fact "${id}" has status "${fact.status}". Rendering blocked until verified.`
      );
    }
    return null;
  }

  return fact;
}

/**
 * Returns all verified facts for the public Proof Ledger.
 */
export function getAllVerifiedFacts(): FactItem[] {
  return factsDb.facts.filter((f) => f.status === 'verified');
}

/**
 * Returns all facts (including unverified ones) with their status for transparency on the Proof Ledger.
 */
export function getAllFacts(): FactItem[] {
  return factsDb.facts;
}

/**
 * Returns verified agent capabilities for the function grid and Agents page.
 */
export function getAgentCapabilities(): AgentCapability[] {
  return factsDb.agentCapabilities.filter((c) => c.status === 'verified');
}

/**
 * Returns nightly evaluation harness metrics.
 */
export function getNightlyEvals(): NightlyEvals {
  return factsDb.nightlyEvals;
}

/**
 * Returns verified metrics formatted for the Proof Strip (up to 4 items).
 */
export function getProofStripMetrics() {
  const desiredMetricIds = [
    'fact-textilemode-looms',
    'fact-textilemode-hours',
    'fact-textilemode-live',
    'fact-fin-reconcile-time',
  ];

  const verifiedMetrics = desiredMetricIds
    .map((id) => getVerifiedFact(id))
    .filter((f): f is FactItem => f !== null)
    .slice(0, 4);

  return verifiedMetrics;
}

/**
 * Check if a credential is verified with mandatory evidence link.
 */
export function isCredentialVerified(id: string): boolean {
  const fact = getVerifiedFact(id);
  if (!fact) return false;
  // Extra guard for Ed Donner credential per Truth Gate brief:
  if (id === 'cred-ed-proficient') {
    return fact.evidence.includes('http');
  }
  return true;
}

/**
 * Returns current placeholders dictionary for audit reports.
 */
export function getPlaceholdersList(): Record<string, string> {
  return factsDb.placeholders;
}
