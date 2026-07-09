import { useState } from "react";
import { generateFlashcards } from "../../services/api";
import "./Flashcards.css";

function Flashcards() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setCards([]);
    setCurrent(0);
    setFlipped(false);
    try {
      const result = await generateFlashcards(topic.trim());
      if (!result || result.length === 0) {
        setError("No flashcards were generated. Try a different topic.");
      } else {
        setCards(result);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c + 1) % cards.length), 150);
  };

  const goPrev = () => {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c - 1 + cards.length) % cards.length), 150);
  };

  const shuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrent(0);
    setFlipped(false);
  };

  const hasCards = cards.length > 0;
  const card = hasCards ? cards[current] : null;

  return (
    <div className="flashcards-page">
      {/* Topic Input */}
      <div className="fc-header-card">
        <div className="fc-header-left">
          <h2 className="section-title">Flashcards</h2>
          <p className="section-sub">Generate AI flashcards for any topic in your knowledge base</p>
        </div>
        <form className="fc-form" onSubmit={handleGenerate}>
          <input
            className="fc-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Neural Networks, Operating Systems…"
            disabled={loading}
          />
          <button className="fc-generate-btn" type="submit" disabled={loading || !topic.trim()}>
            {loading ? (
              <>
                <span className="btn-spinner" /> Generating…
              </>
            ) : (
              "✨ Generate"
            )}
          </button>
        </form>
      </div>

      {error && <p className="fc-error">{error}</p>}

      {/* Flashcard Viewer */}
      {hasCards && (
        <>
          {/* Progress */}
          <div className="fc-progress-row">
            <span className="fc-counter">
              {current + 1} / {cards.length}
            </span>
            <div className="fc-progress-bar">
              <div
                className="fc-progress-fill"
                style={{ width: `${((current + 1) / cards.length) * 100}%` }}
              />
            </div>
            <button className="fc-shuffle-btn" onClick={shuffle} title="Shuffle">
              🔀 Shuffle
            </button>
          </div>

          {/* Card */}
          <div className="fc-card-area">
            <div
              className={`fc-card ${flipped ? "flipped" : ""}`}
              onClick={() => setFlipped((f) => !f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
              aria-label={flipped ? "Answer side" : "Question side"}
            >
              <div className="fc-card-inner">
                <div className="fc-card-face fc-card-front">
                  <span className="fc-face-label">Question</span>
                  <p className="fc-card-text">{card.question}</p>
                  <span className="fc-tap-hint">Tap to reveal answer</span>
                </div>
                <div className="fc-card-face fc-card-back">
                  <span className="fc-face-label fc-face-label--answer">Answer</span>
                  <p className="fc-card-text">{card.answer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="fc-controls">
            <button className="fc-nav-btn" onClick={goPrev}>
              ← Previous
            </button>
            <button className="fc-nav-btn fc-nav-btn--next" onClick={goNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {!hasCards && !loading && !error && (
        <div className="fc-empty">
          <div className="fc-empty-icon">🃏</div>
          <p>Enter a topic above and generate your flashcards!</p>
        </div>
      )}
    </div>
  );
}

export default Flashcards;
