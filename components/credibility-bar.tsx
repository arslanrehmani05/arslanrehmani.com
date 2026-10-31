// components/credibility-bar.tsx
const stats = [
  { value: '10 → 1', label: 'Back-office staff at a $107k/month manufacturer' },
  { value: '18 months', label: 'Live on real financial data' },
  { value: '1–2 days', label: 'Month-end close across 4 departments, one clerk' },
  { value: '15+', label: 'Autonomous agents & swarms deployed' },
  { value: 'Zero Slop', label: 'Hardened with evals, sandboxes & RLS' },
];

export default function CredibilityBar() {
  return (
    <section className="bg-bg-secondary border-y border-border-color py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 md:flex md:justify-between md:gap-0">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`relative md:flex-1 md:px-6 md:first:pl-0 md:last:pr-0 ${
                idx === stats.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {idx > 0 && (
                <div className="hidden md:block absolute left-0 top-0 h-full w-px bg-border-color" />
              )}
              <span className="block font-serif text-3xl md:text-4xl font-medium text-accent-gold">
                {stat.value}
              </span>
              <span className="block text-sm text-text-muted mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
