import "./StatsGrid.css";

const stats = [
  { label: "Sources", value: "24" },
  { label: "Flashcards", value: "86" },
  { label: "Quiz score", value: "92%" },
];

function StatsGrid() {
  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="stat-card">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  );
}

export default StatsGrid;
