export type Industry =
  | 'ecommerce'
  | 'manufacturing'
  | 'professional_services'
  | 'logistics'
  | 'retail'
  | 'other';

export interface IndustryContext {
  label: string;
  paragraph: string;
  automationReductionRange: string;
}

export const INDUSTRY_CONTEXT: Record<Industry, IndustryContext> = {
  ecommerce: {
    label: 'Ecommerce',
    paragraph:
      'For ecommerce operations, manual work is usually order reconciliation, inventory syncing across channels, and manually pulling sales reports from separate platforms. These are the first processes worth automating because they compound with every new SKU or sales channel.',
    automationReductionRange: '75-90%',
  },
  manufacturing: {
    label: 'Manufacturing',
    paragraph:
      'In manufacturing, manual work concentrates in production scheduling, machine allocation, and paper-based or spreadsheet inventory tracking. Automating these typically has the largest single impact on throughput, not just admin time.',
    automationReductionRange: '70-85%',
  },
  professional_services: {
    label: 'Professional Services',
    paragraph:
      'For professional services firms, manual work is usually time tracking, client reporting, and invoicing across disconnected tools. Automation here mainly reclaims billable hours currently lost to administration.',
    automationReductionRange: '65-80%',
  },
  logistics: {
    label: 'Logistics',
    paragraph:
      'In logistics, manual work is dispatch coordination, shipment status updates, and reconciling carrier data against orders. These processes are highly repetitive and among the most automatable in any industry.',
    automationReductionRange: '75-90%',
  },
  retail: {
    label: 'Retail',
    paragraph:
      'For retail businesses, manual work is inventory counts, point-of-sale reconciliation, and pulling performance reports across locations or channels. Automating these frees staff for the parts of the business that actually need a human.',
    automationReductionRange: '70-85%',
  },
  other: {
    label: 'General Operations',
    paragraph:
      'Across most operationally-heavy businesses, manual work concentrates in reporting, data entry between disconnected tools, and reconciliation. These are the processes with the most predictable return once automated.',
    automationReductionRange: '65-85%',
  },
};
