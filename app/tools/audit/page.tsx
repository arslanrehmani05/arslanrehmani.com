// app/tools/audit/page.tsx
import { redirect } from 'next/navigation';

export default function LegacyAuditPage() {
  redirect('/diagnostics#readiness-audit');
}
