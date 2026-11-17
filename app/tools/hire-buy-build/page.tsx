import type { Metadata } from 'next';
import HireBuyBuildTool from '@/components/tools/hire-buy-build';
import { toolMetadata } from '@/lib/tools/registry';

export const metadata: Metadata = toolMetadata('hire-buy-build');

export default function Page() {
  return <HireBuyBuildTool />;
}
