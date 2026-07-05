// components/credibility-bar.tsx
export default function CredibilityBar() {
  const stats = [
    { value: '10 Years', label: 'Daily Learning' },
    { value: '2 ERPs', label: 'In Production' },
    { value: '$100,000+', label: 'Annual Savings' },
    { value: '3 Industries', label: 'Served' },
    { value: 'Vanthrope', label: 'Founder' },
  ];

  return (
    <section className="bg-bg-secondary border-b border-border-color py-12 md:py-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop: Single row flex, Mobile: 2-column grid */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center md:items-stretch text-center md:text-left relative md:px-4">
              
              {/* Gold vertical divider for desktop (except first item) */}
              {idx > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-accent-gold/40" />
              )}
              
              <span className="text-2xl font-bold text-accent-gold tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm text-text-muted mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
