import "./MessageBubble.css";

function TypingIndicator({ content }) {
  return (
    <div className="message message--assistant">
      <div className="message-avatar" aria-hidden="true">🧠</div>
      <div className="message-body">
        <div className="bubble">
          <span className="thinking-bubble">
            <span>{content}</span>
            <span className="thinking-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
