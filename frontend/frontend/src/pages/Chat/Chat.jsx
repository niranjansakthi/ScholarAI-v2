import "./Chat.css";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "../../components/chat/MessageBubble";
import ChatPreview from "../../components/chat/ChatPreview";
import TypingIndicator from "../../components/chat/TypingIndicator";
import { sendChat, getUserChats, getChatHistory } from "../../services/api";

import ChatHeader from "./ChatHeader/ChatHeader";
import EmptyState from "./EmptyState/EmptyState";

const INITIAL_MESSAGE = {
  id: 0,
  role: "assistant",
  content:
    "Hello! I'm your AI Study Assistant. Upload a PDF or paste a YouTube link, then ask me anything about your knowledge base.",
};

function Chat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  
  const messagesEndRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      const chats = await getUserChats();
      setChatHistory(chats);
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const addMessage = (role, content) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.floor(Math.random() * 1000), role, content },
    ]);
  };

  const setThinking = (value) => {
    setIsThinking(value);
    window.dispatchEvent(new CustomEvent("chat:thinking", { detail: value }));
  };

  useEffect(() => {
    const handleExternalMessage = (event) => {
      const { role = "assistant", content = "" } = event.detail || {};
      addMessage(role, content);
    };
    window.addEventListener("chat:message", handleExternalMessage);
    return () => window.removeEventListener("chat:message", handleExternalMessage);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    const userInput = input.trim();
    addMessage("user", userInput);
    setInput("");
    setThinking(true);
    setStatusMessage("Searching knowledge base…");

    try {
      const response = await sendChat(userInput, currentChatId);
      addMessage("assistant", response.answer);
      
      // If it was a new chat, set the ID and refresh the sidebar list
      if (!currentChatId && response.chat_id) {
        setCurrentChatId(response.chat_id);
        fetchChatHistory();
      }
    } catch (error) {
      console.error(error);
      addMessage("assistant", "⚠️ Something went wrong. Please check the backend and try again.");
    } finally {
      setThinking(false);
      setStatusMessage("");
    }
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setStatusMessage("");
    setIsThinking(false);
  };

  const loadSpecificChat = async (id) => {
    if (id === currentChatId) return;
    
    setIsThinking(true);
    setStatusMessage("Loading conversation...");
    try {
      const history = await getChatHistory(id);
      
      const loadedMessages = history.map((msg) => ({
        id: msg.id,
        role: msg.role === 'ai' ? 'assistant' : msg.role, // normalize backend 'ai' role to 'assistant'
        content: msg.content
      }));

      setMessages(loadedMessages);
      setCurrentChatId(id);
    } catch (error) {
      console.error(error);
      alert("Failed to load chat conversation.");
    } finally {
      setIsThinking(false);
      setStatusMessage("");
    }
  };

  const hasUserMessages = messages.length > 1 || (messages.length === 1 && messages[0].id !== 0);

  return (
    <div className="chat-page">
      {/* Sidebar: Chat History */}
      <aside className="chat-history-panel">
        <p className="chat-history-label">Chat History</p>
        <div className="chat-history-list">
          {chatHistory.length === 0 && <p className="history-time" style={{padding: '0 12px'}}>No past chats.</p>}
          {chatHistory.map((item) => (
            <button 
              key={item.id} 
              className={`history-item ${item.id === currentChatId ? 'active' : ''}`}
              onClick={() => loadSpecificChat(item.id)}
            >
              <span className="history-icon">💬</span>
              <div className="history-info">
                <p className="history-title">{item.title}</p>
                <p className="history-time">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </button>
          ))}
        </div>
        <button className="history-new-btn" onClick={handleNewChat}>
          + New Session
        </button>
      </aside>

      {/* Main Chat Area */}
      <div className="chat-main">
        <ChatHeader onNewChat={handleNewChat} />

        <div className="messages" role="log" aria-live="polite">
          <div className="messages-container">
            {!hasUserMessages ? (
              <EmptyState onSuggest={(text) => setInput(text)} />
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                  />
                ))}

                {isThinking && <TypingIndicator content="AI is thinking" />}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        <div className="input-area">
          <ChatPreview
            input={input}
            setInput={setInput}
            onSend={handleSend}
            disabled={isThinking}
          />
          {statusMessage && (
            <p className="status-pill">
              <span className="status-spinner" aria-hidden="true" />
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
