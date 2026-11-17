import type { Metadata } from 'next';
import ChannelProfitTool from '@/components/tools/channel-profit';
import { toolMetadata } from '@/lib/tools/registry';

export const metadata: Metadata = toolMetadata('channel-profit');

export default function Page() {
  return <ChannelProfitTool />;
}
