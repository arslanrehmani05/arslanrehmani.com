// app/tools/page.tsx
import { redirect } from 'next/navigation';

export default function ToolsIndexPage() {
  redirect('/diagnostics');
}
