// lib/calculators/industry-context.ts

export type IndustryType = 'manufacturing' | 'ecommerce' | 'logistics' | 'services' | 'retail' | 'other';

export interface IndustryContext {
  id: IndustryType;
  label: string;
  typicalDrag: string;
  automationPotential: string;
  commentary: string;
}

export const INDUSTRY_CONTEXTS: Record<IndustryType, IndustryContext> = {
  manufacturing: {
    id: 'manufacturing',
    label: 'SMB Manufacturing & Textiles',
    typicalDrag: 'Manual production tracking on paper, yarn/raw inventory discrepancies, delayed loom/line efficiency reporting.',
    automationPotential: 'Real-time production floor scheduling, automated inventory deduction, 85-90% reduction in manual admin hours.',
    commentary: 'Manufacturing operations typically suffer from disconnected floor updates and delayed financial visibility. Deploying custom ERP modules eliminates double-data entry and yields payback within 3 to 6 months.',
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'Multi-Channel Ecommerce & Direct-to-Consumer',
    typicalDrag: 'Manual reconciliation between Shopify, Amazon, and Search Console; delayed inventory sync across channels.',
    automationPotential: 'Unified sales channel API sync, automated daily executive AI briefings, zero manual spreadsheet updates.',
    commentary: 'Multi-channel brand operations waste significant executive time manually combining channel reports. Automated briefing pipelines provide daily clarity and immediate anomaly alerts.',
  },
  logistics: {
    id: 'logistics',
    label: 'Logistics, Freight & Supply Chain',
    typicalDrag: 'Manual dispatch tracking, paper bills of lading, phone/WhatsApp status checking with drivers and clients.',
    automationPotential: 'Automated portal status updates, instant customer dispatch notifications, unified shipment dashboards.',
    commentary: 'Logistics bottlenecks stem from fragmented communication channels. Centralizing shipment data cuts customer inquiry volume and administrative overhead drastically.',
  },
  services: {
    id: 'services',
    label: 'Professional & Business Services',
    typicalDrag: 'Manual time logging, spreadsheet billing reconciliation, proposal drafting delays, disconnected CRM data.',
    automationPotential: 'Automated invoice drafting, client portal status sync, automated proposal & audit workflows.',
    commentary: 'Service firms often lose billable hours to internal administrative tracking. Automation returns team focus directly to client billables.',
  },
  retail: {
    id: 'retail',
    label: 'Omnichannel Retail & Wholesale',
    typicalDrag: 'Manual stock counts, paper purchase orders, delayed reorder triggers, disconnected POS and web inventory.',
    automationPotential: 'Real-time inventory sync, automated reorder thresholds, centralized sales analytics.',
    commentary: 'Retail operations lose revenue to stockouts and overstocking. Real-time inventory control protects working capital.',
  },
  other: {
    id: 'other',
    label: 'General Commercial Operation',
    typicalDrag: 'Disconnected software tools, manual spreadsheet consolidation, high recurring administrative overhead.',
    automationPotential: 'Custom web portal development, automated data pipelines, 80%+ reduction in repetitive admin drag.',
    commentary: 'Every business operation running on manual spreadsheet transfers can be streamlined with targeted software infrastructure built around specific workflows.',
  },
};
