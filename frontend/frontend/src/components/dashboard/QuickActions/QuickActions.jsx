import "./QuickActions.css";

const actions = [
  { label: "New chat", hint: "Ask questions from your uploads" },
  { label: "Create quiz", hint: "Generate practice questions" },
  { label: "Summarize", hint: "Turn notes into concise briefs" },
];

function QuickActions() {
  return (
    <section className="quick-actions">
      <div className="section-heading">
        <h3>Quick actions</h3>
        <span>Jump to your next step</span>
      </div>

      <div className="quick-actions__list">
        {actions.map((action) => (
          <button key={action.label} className="quick-action-card">
            <strong>{action.label}</strong>
            <span>{action.hint}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
