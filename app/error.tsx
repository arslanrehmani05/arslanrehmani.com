'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application Error]:', error);
  }, [error]);

  return (
    <main className="bg-bg-primary min-h-[80vh] py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111111] border border-[#2A2A2A] rounded-[24px] p-8 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#F5F5F0]">
            Operational Exception
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            An unexpected error occurred while processing this page request. You can attempt to retry the action or return to the main dashboard.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C9A84C] text-black font-semibold hover:bg-[#D4B05A] transition-colors text-sm shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#2A2A2A] bg-[#161616] text-[#F5F5F0] hover:border-[#C9A84C]/50 transition-colors text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
