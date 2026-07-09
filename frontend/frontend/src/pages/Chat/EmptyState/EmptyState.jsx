import "./EmptyState.css";

const suggestions = [
  "Summarize the key concepts from my notes",
  "What is the difference between supervised and unsupervised learning?",
  "Create a study plan for my uploaded content",
  "Explain backpropagation in simple terms",
];

function EmptyState({ onSuggest }) {
  return (
    <div className="empty-state">
      <div className="empty-orb" aria-hidden="true" />
      <div className="empty-icon">🧠</div>
      <h3 className="empty-title">Ready to learn</h3>
      <p className="empty-desc">
        Upload documents first, then ask me anything. I'll search your
        entire knowledge base to give you accurate, sourced answers.
      </p>

      <div className="suggestion-grid">
        {suggestions.map((s) => (
          <button
            key={s}
            className="suggestion-pill"
            onClick={() => onSuggest && onSuggest(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;