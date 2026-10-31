// components/problem-section.tsx
const cards = [
  {
    num: '01',
    title: 'Your numbers depend on people',
    body: 'Month-end takes a week. The figures sit in six spreadsheets and two people’s heads. One sick day and the close slips.',
  },
  {
    num: '02',
    title: 'Your systems don’t connect',
    body: 'Orders, stock and accounts sit in three places. Someone rekeys the data between them, and every rekey risks an error that shows up in your margins.',
  },
  {
    num: '03',
    title: 'AI demos don’t hold up on real data',
    body: 'Anyone can demo an agent. Very few can show you one that reconciles a real ledger, logs every action and stops before a costly mistake.',
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-bg-primary py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <span className="eyebrow mb-5">The Problem</span>
        <h2 className="headline text-3xl md:text-[2.75rem] leading-[1.1] max-w-3xl">
          You&apos;re paying people to do what software should.
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
