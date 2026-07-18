const FEATURES = [
  { title: 'Scheduling', body: 'Book and manage visits across locations.' },
  { title: 'Telehealth', body: 'Built-in video visits, no plugins.' },
  { title: 'AI Scribe', body: 'Draft SOAP notes automatically.' },
];

export function FeatureGrid() {
  return (
    <section className="grid grid-cols-3 gap-6">
      {FEATURES.map((f) => (
        <div key={f.title}><h3>{f.title}</h3><p>{f.body}</p></div>
      ))}
    </section>
  );
}
