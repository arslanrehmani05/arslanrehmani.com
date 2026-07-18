// components/problem-section.tsx
export default function ProblemSection() {
  const cards = [
    {
      num: '01',
      title: 'Your numbers arrive late and by hand',
      description: 'Month-end reporting assembled in spreadsheets, by people, days after the fact. By the time you see the problem, you’ve been paying for it for weeks.',
    },
    {
      num: '02',
      title: 'Headcount scales with volume',
      description: 'Every growth spurt means more coordinators, more data entry, more people whose whole job is moving information between systems. Revenue grows; margin doesn’t.',
    },
    {
      num: '03',
      title: 'You are the integration layer',
      description: 'Your tools don’t talk to each other, so you do it for them — chasing statuses, reconciling exports, answering questions a system should answer. That’s the most expensive job in the company.',
    },
  ];

  return (
    <section id="problem" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Operational drag doesn&apos;t show up on a P&amp;L line. It shows up everywhere else.
          </h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-bg-secondary border-t-2 border-accent-gold p-8 rounded-3xl flex flex-col justify-between min-h-[320px] transition-gold hover:translate-y-[-4px] hover:border-accent-gold-hover"
            >
              <div className="text-4xl font-bold text-accent-gold mb-6">
                {card.num}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-text-primary">
                  {card.title}
                </h3>
                <p className="text-text-muted text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
