// components/problem-section.tsx
export default function ProblemSection() {
  const cards = [
    {
      num: '01',
      title: 'Operations that run on people',
      description: 'Every process that requires a human is a cost, a risk, and a bottleneck. Most businesses have dozens of them and have stopped noticing.',
    },
    {
      num: '02',
      title: 'AI is moving faster than your roadmap',
      description: 'You know the opportunity exists. The question is whether you find someone who can actually build the system before your competitors do.',
    },
    {
      num: '03',
      title: 'The gap between knowing and doing',
      description: 'Most businesses understand what needs to change. Almost none have someone who can design the system, build it, and deploy it reliably.',
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
            Most businesses know something is wrong. Almost none know how to fix it.
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
