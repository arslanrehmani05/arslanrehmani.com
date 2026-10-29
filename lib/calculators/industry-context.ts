export type IndustryType =
  | 'manufacturing'
  | 'ecommerce'
  | 'logistics'
  | 'services'
  | 'retail'
  | 'other';

export interface IndustryContext {
  label: string;
  commentary: string;
  typicalLeakage: string;
  typicalDrag?: string;
  commonTarget: string;
}

export const INDUSTRY_CONTEXTS: Record<IndustryType, IndustryContext> = {
  manufacturing: {
    label: 'SMB Manufacturing & Textiles',
    commentary: 'Industrial operations suffer severe spreadsheet fragmentation between shop-floor looms, yarn intake, dyeing runs, and accounting ledgers.',
    typicalLeakage: 'Fabric waste reconciliation, untracked dyeing yields, supplier invoice math variances.',
    commonTarget: 'Isolated safety staging pipelines + automated ERP ledger reconciliation.',
  },
  ecommerce: {
    label: 'Multi-Channel Ecommerce',
    commentary: 'Multi-channel merchants face constant stock desynchronization across Shopify, Amazon, and ERP warehouses.',
    typicalLeakage: 'Stockouts, overselling penalties, delayed inventory updates, manual returns processing.',
    commonTarget: 'Real-time two-way stock synchronization + automated return inspection agents.',
  },
  logistics: {
    label: 'Logistics & Supply Chain',
    commentary: 'Freight forwarders and 3PLs leak substantial margins on manual manifest rate audits and unauthorized carrier surcharges.',
    typicalLeakage: 'Unauthorized accessorial fees, dimensional weight discrepancies, carrier billing errors.',
    commonTarget: 'Automated EDI manifest parsing + deterministic rate card verification gates.',
  },
  services: {
    label: 'Professional & B2B Services',
    commentary: 'Agencies and B2B services lose productive billable capacity to repetitive client status reporting and manual invoice chasing.',
    typicalLeakage: 'Unbilled hours, delayed payment collections, manual spreadsheet resource allocation.',
    commonTarget: 'Client status portal + automated timesheet reconciliation and AR collections.',
  },
  retail: {
    label: 'Omnichannel Retail',
    commentary: 'Retailers juggle disconnected physical POS registers, distributor catalogs, and manual purchase order generation.',
    typicalLeakage: 'Dead inventory accumulation, incorrect barcode mapping, manual reorder lag.',
    commonTarget: 'Autonomous stock threshold reordering + cross-location inventory balancing.',
  },
  other: {
    label: 'General Commercial Operation',
    commentary: 'Administrative bottlenecks across back-office operations where staff act as human copy-paste bridges between SaaS apps.',
    typicalLeakage: 'High headcount drag, data entry typographical errors, compliance audit gaps.',
    commonTarget: 'Deterministic ETL pipelines + human-in-the-loop exception management.',
  },
};
