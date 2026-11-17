import type { Metadata } from 'next';
import ProductionLossTool from '@/components/tools/production-loss';
import { toolMetadata } from '@/lib/tools/registry';

export const metadata: Metadata = toolMetadata('production-loss');

export default function Page() {
  return <ProductionLossTool />;
}
