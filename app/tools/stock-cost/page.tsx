import type { Metadata } from 'next';
import StockCostTool from '@/components/tools/stock-cost';
import { toolMetadata } from '@/lib/tools/registry';

export const metadata: Metadata = toolMetadata('stock-cost');

export default function Page() {
  return <StockCostTool />;
}
