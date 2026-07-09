import { useLocation } from "react-router-dom";
import "./Topbar.css";

const routeTitles = {
  "/": "Dashboard",
  "/chat": "AI Chat",
  "/upload": "Documents",
  "/flashcards": "Flashcards",
  "/quiz": "Quiz",
  "/summary": "Summary",
  "/keypoints": "Key Points",
  "/settings": "Settings",
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function Topbar() {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] || "Page";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <p className="topbar-breadcrumb">ScholarAI</p>
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="topbar-right">
        <div className="topbar-search">
          <SearchIcon />
          <input
            type="text"
            className="search-input"
            placeholder="Search knowledge base…"
          />
        </div>

        <button className="topbar-icon-btn" aria-label="Notifications">
          <BellIcon />
          <span className="notif-dot" aria-hidden="true" />
        </button>

        <div className="topbar-profile">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="profile-avatar"
          />
          <div className="profile-info">
            <span className="profile-name">Scholar User</span>
            <span className="profile-role">AI Engineer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;