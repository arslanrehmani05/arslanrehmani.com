const steps = [
  {
    number: '01',
    title: 'Diagnose',
    body: 'I map how work moves through your business today: who touches what, where figures are re-typed, and what it costs. You get a prioritised plan before anything is built.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'I build the system around your workflows and your data, in stages you can see and use. Agents take the routine work; your people approve what matters.',
  },
  {
    number: '03',
    title: 'Run',
    body: 'The system goes live on infrastructure you control. I stay on to maintain it, improve it and extend it as the business changes.',
  },
];

export default function HowIWork() {
  return (
    <section className="py-20 md:py-28 border-t border-border-color">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow mb-4">How I work</span>
          <h2 className="headline text-3xl sm:text-4xl">From diagnosis to a system your team uses every day.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-8">
              <span className="text-xs font-mono text-text-subtle">{step.number}</span>
              <h3 className="text-xl font-medium text-text-primary mt-3">{step.title}</h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
