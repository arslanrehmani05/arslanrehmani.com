// app/tools/calculator/page.tsx
import { redirect } from 'next/navigation';

export default function LegacyCalculatorPage() {
  redirect('/diagnostics#roi-calculator');
}
