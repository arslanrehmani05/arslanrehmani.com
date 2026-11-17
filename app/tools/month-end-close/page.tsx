import type { Metadata } from 'next';
import MonthEndCloseTool from '@/components/tools/month-end-close';
import { toolMetadata } from '@/lib/tools/registry';

export const metadata: Metadata = toolMetadata('month-end-close');

export default function Page() {
  return <MonthEndCloseTool />;
}
