const problems = [
  {
    title: 'Work that only moves when a person moves it',
    body: 'Orders, stock and production figures copied from one sheet to the next. Every copy is a cost, a delay and a chance to get it wrong.',
  },
  {
    title: 'A month-end that takes weeks',
    body: 'Books closed by reconciling spreadsheets against each other, with numbers nobody trusts until someone has checked them by hand.',
  },
  {
    title: 'Tools that do not talk to each other',
    body: 'Sales in one place, inventory in another, reporting in a third. The gaps between them are filled by someone’s time.',
  },
  {
    title: 'An owner who is the reporting system',
    body: 'Your morning goes on assembling yesterday’s numbers, so decisions get made late or on instinct.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 border-t border-border-color">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mb-4">What I fix</span>
          <h2 className="headline text-3xl sm:text-4xl">
            Most businesses know where the drag is. Few have someone who can remove it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, idx) => (
            <div
              key={problem.title}
              className="rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-8"
            >
              <span className="text-xs font-mono text-text-subtle">0{idx + 1}</span>
              <h3 className="text-lg md:text-xl font-medium text-text-primary mt-3">{problem.title}</h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">{problem.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
