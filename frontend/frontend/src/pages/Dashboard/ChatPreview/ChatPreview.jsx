import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserChats } from "../../../services/api";
import "./ChatPreview.css";

function ChatPreview() {
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadChats() {
      try {
        const chats = await getUserChats();
        // Limit to 3 most recent chats
        setRecentChats(chats.slice(0, 3));
      } catch (err) {
        console.error("Error loading chats for dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadChats();
  }, []);

  return (
    <section className="chat-preview-panel">
      <div className="section-header">
        <div className="section-header-left">
          <h2 className="section-title">Recent Chats</h2>
          <p className="section-sub">Resume your active conversations</p>
        </div>
      </div>

      <div className="chat-preview-list">
        {loading ? (
          <div className="chat-preview-skeleton">
            <div className="skeleton-item" />
            <div className="skeleton-item" />
            <div className="skeleton-item" />
          </div>
        ) : recentChats.length === 0 ? (
          <div className="chat-preview-empty">
            <span className="empty-icon">💬</span>
            <p>No recent chats found.</p>
            <button className="btn-secondary btn-sm" onClick={() => navigate("/chat")}>
              Start a new session
            </button>
          </div>
        ) : (
          recentChats.map((chat) => (
            <div 
              key={chat.id} 
              className="chat-preview-row"
              onClick={() => navigate("/chat")}
            >
              <div className="chat-preview-icon">💬</div>
              <div className="chat-preview-info">
                <h4 className="chat-preview-title">{chat.title}</h4>
                <span className="chat-preview-date">
                  {new Date(chat.created_at).toLocaleDateString()}
                </span>
              </div>
              <span className="chat-preview-arrow">→</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ChatPreview;
