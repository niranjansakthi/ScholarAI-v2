import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

const actions = [
  { label: "Upload PDF",      icon: "📄", path: "/upload",     color: "amber"  },
  { label: "Upload Image",    icon: "🖼️",  path: "/upload",     color: "blue"   },
  { label: "YouTube Video",   icon: "🎥", path: "/upload",     color: "red"    },
  { label: "New Chat",        icon: "💬", path: "/chat",       color: "green"  },
  { label: "Generate Quiz",   icon: "🎯", path: "/quiz",       color: "purple" },
  { label: "Make Flashcards", icon: "🃏", path: "/flashcards", color: "teal"   },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="quick-actions">
      <div className="section-header">
        <div className="section-header-left">
          <h2 className="section-title">Quick Actions</h2>
          <p className="section-sub">Jump right into your workflow</p>
        </div>
      </div>

      <div className="action-grid">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`action-btn action-btn--${action.color}`}
            onClick={() => navigate(action.path)}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;