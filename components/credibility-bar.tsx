// components/credibility-bar.tsx
const stats = [
  { value: '2', label: 'Production systems live today' },
  { value: '5', label: 'Employees replaced by one system' },
  { value: '40+', label: 'Hours of manual work eliminated weekly' },
  { value: '4', label: 'Live products you can use right now' },
  { value: '10+', label: 'Months running on real operational data' },
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
              <span className="block text-2xl md:text-3xl font-black text-accent-gold">
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
