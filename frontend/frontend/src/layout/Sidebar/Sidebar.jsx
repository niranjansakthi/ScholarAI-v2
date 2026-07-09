import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

function SidebarIcon({ type }) {
  const p = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "dashboard":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...p}>
          <path d="M7 7h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9.5l-4 3V9a2 2 0 0 1 1.5-2Z" />
        </svg>
      );
    case "documents":
      return (
        <svg {...p}>
          <path d="M7 3h6l4 4v14H7z" />
          <path d="M13 3v5h5" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      );
    case "flashcards":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 3v3" />
          <path d="M16 3v3" />
        </svg>
      );
    case "quiz":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "summary":
      return (
        <svg {...p}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      );
    case "keypoints":
      return (
        <svg {...p}>
          <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
          <path d="M12 12v10" />
          <path d="M8 16l4-4 4 4" />
        </svg>
      );
    case "settings":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7.5 7.5 0 0 0-.1-1l2.1-1.6-2-3.5-2.5 1a7.6 7.6 0 0 0-1.7-1L14 2h-4l-.8 2.4a7.6 7.6 0 0 0-1.7 1l-2.5-1-2 3.5 2.1 1.6A7.5 7.5 0 0 0 5 12a7.5 7.5 0 0 0 .1 1l-2.1 1.6 2 3.5 2.5-1a7.6 7.6 0 0 0 1.7 1L10 22h4l.8-2.4a7.6 7.6 0 0 0 1.7-1l2.5 1 2-3.5-2.1-1.6c.1-.3.1-.7.1-1Z" />
        </svg>
      );
    case "logout":
      return (
        <svg {...p}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
  }
}

const menuItems = [
  { name: "Dashboard",  path: "/",          icon: "dashboard"  },
  { name: "AI Chat",    path: "/chat",       icon: "chat"       },
  { name: "Documents",  path: "/upload",     icon: "documents"  },
  { name: "Flashcards", path: "/flashcards", icon: "flashcards" },
  { name: "Quiz",       path: "/quiz",       icon: "quiz"       },
  { name: "Summary",    path: "/summary",    icon: "summary"    },
  { name: "Key Points", path: "/keypoints",  icon: "keypoints"  },
];

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  const displayUsername = user?.email ? user.email.split('@')[0] : "Scholar User";

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">🧠</div>
          <div className="logo-text">
            <h2>ScholarAI</h2>
            <span>Knowledge Hub</span>
          </div>
        </div>

        {/* Navigation */}
        <span className="nav-section-label">Menu</span>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <SidebarIcon type={item.icon} />
              <span className="link-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="sidebar-bottom">
        <div className="profile-card">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="profile"
            className="profile-image"
          />
          <div className="profile-info">
            <h4>{displayUsername}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {user?.email || "Pro Plan"}
            </span>
          </div>
          <button className="logout-btn" aria-label="Log out" onClick={logout} title="Log out">
            <SidebarIcon type="logout" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;