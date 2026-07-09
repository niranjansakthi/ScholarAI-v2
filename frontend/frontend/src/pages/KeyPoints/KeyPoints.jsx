import { useState } from "react";
import { generateKeyPoints } from "../../services/api";
import "./KeyPoints.css";

const BULLET_ICONS = ["💡", "🔑", "⚡", "🎯", "📌", "🧩", "✨", "🔍", "📊", "🚀"];

function parsePoints(text) {
  return text
    .split("\n")
    .map((l) => l.replace(/^[-*•]\s+/, "").replace(/^\d+\.\s+/, "").trim())
    .filter((l) => l.length > 0);
}

function KeyPoints() {
  const [topic, setTopic] = useState("");
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setPoints([]);
    try {
      const result = await generateKeyPoints(topic.trim());
      if (!result) {
        setError("No key points generated. Try a different topic.");
      } else {
        setPoints(parsePoints(result));
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to generate key points.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="keypoints-page">
      {/* Header Form */}
      <div className="kp-header-card">
        <div>
          <h2 className="section-title">Key Points</h2>
          <p className="section-sub">Extract the most important ideas from any topic</p>
        </div>
        <form className="kp-form" onSubmit={handleGenerate}>
          <input
            className="kp-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quantum Computing, React Hooks…"
            disabled={loading}
          />
          <button className="kp-generate-btn" type="submit" disabled={loading || !topic.trim()}>
            {loading ? <><span className="btn-spinner" /> Extracting…</> : "✨ Extract"}
          </button>
        </form>
      </div>

      {error && <p className="kp-error">{error}</p>}

      {loading && (
        <div className="kp-loading">
          <span className="kp-loading-spinner" />
          <p>Extracting key points from your knowledge base…</p>
        </div>
      )}

      {points.length > 0 && (
        <>
          <div className="kp-stats">
            <span className="kp-count-badge">{points.length} Key Points</span>
            <span className="kp-topic-badge">Topic: {topic}</span>
          </div>

          <div className="kp-grid">
            {points.map((point, i) => (
              <div
                key={i}
                className="kp-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="kp-card-icon">
                  {BULLET_ICONS[i % BULLET_ICONS.length]}
                </div>
                <div className="kp-card-content">
                  <span className="kp-card-num">#{i + 1}</span>
                  <p className="kp-card-text">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!points.length && !loading && !error && (
        <div className="kp-empty">
          <div className="kp-empty-icon">✨</div>
          <p>Enter a topic to extract its key points!</p>
        </div>
      )}
    </div>
  );
}

export default KeyPoints;
