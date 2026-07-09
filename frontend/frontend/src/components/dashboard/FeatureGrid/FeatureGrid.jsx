import "./FeatureGrid.css";

const features = [
  { title: "AI chat", text: "Discuss your documents with grounded answers." },
  { title: "Flashcards", text: "Convert dense content into study-ready cards." },
  { title: "Key points", text: "Extract the essentials in seconds." },
  { title: "Quizzes", text: "Test retention with adaptive questions." },
];

function FeatureGrid() {
  return (
    <section className="feature-grid">
      {features.map((feature) => (
        <article key={feature.title} className="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </section>
  );
}

export default FeatureGrid;
