// components/problem-section.tsx
const cards = [
  {
    num: '01',
    title: 'Operations that run on people',
    body: 'Every process that requires a human is a cost, a risk, and a bottleneck. Most businesses have dozens of these and have stopped noticing them.',
  },
  {
    num: '02',
    title: 'Tools that don’t talk to each other',
    body: 'Sales in one platform. Inventory in another. Reporting in spreadsheets. Every gap between systems gets filled by someone’s manual work.',
  },
  {
    num: '03',
    title: 'The gap between knowing and doing',
    body: 'Understanding what should change is common. Finding someone who can design the system, build it properly, and deploy it reliably is not.',
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-bg-primary py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <span className="eyebrow mb-5">The Problem</span>
        <h2 className="headline text-3xl md:text-[2.75rem] leading-[1.1] max-w-3xl">
          Most businesses know something is inefficient. Almost none have someone
          who can actually fix it.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {cards.map((card) => (
            <div
              key={card.num}
              className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-200"
            >
              <div className="text-[11px] font-mono tracking-widest text-text-subtle uppercase mb-3">
                STEP {card.num}
              </div>
              <h3 className="text-xl font-medium text-text-primary tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
