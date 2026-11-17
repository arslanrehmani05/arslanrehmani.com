import type { Metadata } from 'next';
import AutomationFinderTool from '@/components/tools/automation-finder';
import { toolMetadata } from '@/lib/tools/registry';

export const metadata: Metadata = toolMetadata('automation-finder');

export default function Page() {
  return <AutomationFinderTool />;
}
