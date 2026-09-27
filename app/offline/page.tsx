import Link from 'next/link';
import { WifiOff, RefreshCw, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Offline | Arslan Rehmani',
  description: 'You are currently offline. Check your internet connection.',
};

export default function OfflinePage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-bg-primary">
      <div className="max-w-md w-full bg-[#111111] border border-[#2A2A2A] rounded-[24px] p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto text-[#C9A84C]">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#F5F5F0]">
            You are Offline
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Your connection was interrupted. Offline cached content is accessible, but live tools and live document syncing require an active connection.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#2A2A2A] bg-[#161616] text-[#F5F5F0] hover:border-[#C9A84C]/50 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <a
            href="."
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C9A84C] text-black font-semibold hover:bg-[#D4B05A] transition-colors text-sm shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </a>
        </div>
      </div>
    </main>
  );
}
