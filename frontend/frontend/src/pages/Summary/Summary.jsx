import { useState } from "react";
import { generateSummary } from "../../services/api";
import "./Summary.css";

function parseSections(text) {
  // Split text into sections by lines starting with # or ##
  const lines = text.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h1 = line.match(/^#\s+(.+)/);
    if (h1 || h2) {
      if (current) sections.push(current);
      current = { heading: (h1 || h2)[1], lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      if (line.trim()) {
        if (!sections.length) sections.push({ heading: "Overview", lines: [] });
        sections[sections.length - 1].lines.push(line);
      }
    }
  }
  if (current) sections.push(current);
  return sections.length ? sections : [{ heading: "Summary", lines: lines }];
}

function Summary() {
  const [topic, setTopic] = useState("");
  const [rawSummary, setRawSummary] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setRawSummary("");
    setSections([]);
    setActiveSection(0);
    try {
      const result = await generateSummary(topic.trim());
      if (!result) {
        setError("No summary generated. Try a different topic.");
      } else {
        setRawSummary(result);
        setSections(parseSections(result));
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawSummary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const hasSummary = sections.length > 0;

  return (
    <div className="summary-page">
      {/* Header Form */}
      <div className="summary-header-card">
        <div>
          <h2 className="section-title">Summary</h2>
          <p className="section-sub">Generate a structured AI summary for any topic</p>
        </div>
        <form className="summary-form" onSubmit={handleGenerate}>
          <input
            className="summary-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Attention mechanisms in transformers…"
            disabled={loading}
          />
          <button className="summary-generate-btn" type="submit" disabled={loading || !topic.trim()}>
            {loading ? <><span className="btn-spinner" /> Generating…</> : "📝 Generate"}
          </button>
        </form>
      </div>

      {error && <p className="summary-error">{error}</p>}

      {hasSummary && (
        <div className="summary-viewer">
          {/* Table of Contents */}
          <aside className="summary-toc">
            <p className="toc-label">Contents</p>
            <nav className="toc-nav">
              {sections.map((s, i) => (
                <button
                  key={i}
                  className={`toc-item ${activeSection === i ? "active" : ""}`}
                  onClick={() => setActiveSection(i)}
                >
                  <span className="toc-num">{i + 1}</span>
                  {s.heading}
                </button>
              ))}
            </nav>
            <button className={`export-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
              {copied ? "✅ Copied!" : "📋 Copy Summary"}
            </button>
          </aside>

          {/* Content */}
          <div className="summary-content">
            {sections.map((s, i) => (
              <div
                key={i}
                className={`summary-section ${activeSection === i ? "summary-section--active" : ""}`}
                onClick={() => setActiveSection(i)}
              >
                <h3 className="summary-section-title">{s.heading}</h3>
                <div className="summary-text">
                  {s.lines.map((line, j) => {
                    if (!line.trim()) return <br key={j} />;
                    if (line.startsWith("- ") || line.startsWith("* ")) {
                      return <li key={j} className="summary-li">{line.slice(2)}</li>;
                    }
                    return <p key={j} className="summary-p">{line}</p>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasSummary && !loading && !error && (
        <div className="summary-empty">
          <div className="summary-empty-icon">📝</div>
          <p>Enter a topic to generate your summary!</p>
        </div>
      )}
    </div>
  );
}

export default Summary;
