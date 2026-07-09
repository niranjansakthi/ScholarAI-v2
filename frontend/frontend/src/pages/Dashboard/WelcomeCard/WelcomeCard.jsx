import { useNavigate } from "react-router-dom";
import "./WelcomeCard.css";

function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <section className="welcome-card">
      <div className="welcome-orb welcome-orb-1" aria-hidden="true" />
      <div className="welcome-orb welcome-orb-2" aria-hidden="true" />

      <div className="welcome-content">
        <div className="welcome-badge">✨ AI-Powered Learning</div>

        <h1 className="welcome-heading">
          Welcome back,{" "}
          <span className="welcome-name">Scholar</span> 👋
        </h1>

        <p className="welcome-description">
          Your AI study assistant is ready. Upload documents, generate
          summaries, create flashcards, and test your knowledge with
          intelligent quizzes.
        </p>

        <div className="welcome-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/chat")}
          >
            <span>💬</span> Start Chat
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/upload")}
          >
            <span>📄</span> Upload Document
          </button>
        </div>
      </div>

      <div className="welcome-illustration" aria-hidden="true">
        <div className="illus-ring illus-ring-1" />
        <div className="illus-ring illus-ring-2" />
        <div className="illus-core">🧠</div>
      </div>
    </section>
  );
}

export default WelcomeCard;