import "./ChatHeader.css";

function ChatHeader({ onNewChat }) {
  return (
    <header className="chat-header">
      <div className="chat-header__left">
        <div className="chat-header-icon">🧠</div>
        <div>
          <h2 className="chat-header-title">AI Study Assistant</h2>
          <p className="chat-header-sub">
            Ask anything about your uploaded knowledge base
          </p>
        </div>
      </div>

      <div className="chat-header__right">
        <div className="chat-status">
          <span className="status-dot" />
          <span>Knowledge Base Active</span>
        </div>

        <button className="new-chat-btn" onClick={onNewChat}>
          <span>+</span> New Chat
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;