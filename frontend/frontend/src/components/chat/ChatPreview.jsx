import "./ChatPreview.css";

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ChatPreview({ input, setInput, onSend, disabled = false }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="chat-input-bar">
      <textarea
        className="chat-input-field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your uploaded knowledge…"
        disabled={disabled}
        rows={1}
      />

      <button
        className="chat-send-btn"
        onClick={onSend}
        disabled={disabled || !input.trim()}
        aria-label="Send message"
      >
        <SendIcon />
      </button>
    </div>
  );
}

export default ChatPreview;