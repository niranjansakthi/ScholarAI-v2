import { useNavigate } from "react-router-dom";
import "./FeatureGrid.css";

const features = [
  {
    title: "AI Chat",
    description: "Ask anything about your uploaded knowledge base with contextual RAG responses.",
    icon: "💬",
    path: "/chat",
    color: "blue",
    badge: "Ready",
  },
  {
    title: "Summary",
    description: "Generate concise, structured notes from long documents in seconds.",
    icon: "📝",
    path: "/summary",
    color: "green",
    badge: "AI",
  },
  {
    title: "Flashcards",
    description: "Create AI-generated flashcards with flip animations for active recall.",
    icon: "🃏",
    path: "/flashcards",
    color: "purple",
    badge: "Popular",
  },
  {
    title: "Quiz",
    description: "Test your understanding with adaptive AI-generated multiple choice quizzes.",
    icon: "🎯",
    path: "/quiz",
    color: "orange",
    badge: "New",
  },
  {
    title: "Key Points",
    description: "Extract the most important ideas from any topic with visual bullet cards.",
    icon: "✨",
    path: "/keypoints",
    color: "teal",
    badge: "AI",
  },
  {
    title: "Documents",
    description: "Upload PDFs, images, handwritten notes, and YouTube videos to your knowledge base.",
    icon: "📄",
    path: "/upload",
    color: "amber",
    badge: "Upload",
  },
];

function FeatureGrid() {
  const navigate = useNavigate();

  return (
    <section className="feature-grid">
      <div className="section-header">
        <div className="section-header-left">
          <h2 className="section-title">AI Features</h2>
          <p className="section-sub">Everything you need to study smarter</p>
        </div>
      </div>

      <div className="feature-cards">
        {features.map((f) => (
          <button
            key={f.title}
            className={`feature-card feature-card--${f.color}`}
            onClick={() => navigate(f.path)}
          >
            <div className="feature-card-top">
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-badge">{f.badge}</span>
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.description}</p>
            <span className="feature-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;