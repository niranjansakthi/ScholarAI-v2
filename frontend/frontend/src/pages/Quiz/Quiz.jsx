import { useState } from "react";
import { generateQuiz } from "../../services/api";
import "./Quiz.css";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [numQ, setNumQ] = useState(5);
  const [quizzes, setQuizzes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setQuizzes([]);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    try {
      const result = await generateQuiz(topic.trim(), numQ);
      if (!result || result.length === 0) {
        setError("No quiz questions generated. Try a different topic.");
      } else {
        setQuizzes(result);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option === quizzes[current].answer;
    setAnswers((prev) => [...prev, { question: quizzes[current].question, selected: option, correct: quizzes[current].answer, isCorrect }]);
  };

  const handleNext = () => {
    if (current + 1 >= quizzes.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  };

  const score = answers.filter((a) => a.isCorrect).length;
  const pct = quizzes.length > 0 ? Math.round((score / quizzes.length) * 100) : 0;

  const q = quizzes[current];

  return (
    <div className="quiz-page">
      {/* Topic Form */}
      <div className="quiz-header-card">
        <div className="quiz-header-left">
          <h2 className="section-title">Quiz</h2>
          <p className="section-sub">Test your knowledge with AI-generated questions</p>
        </div>
        <form className="quiz-form" onSubmit={handleGenerate}>
          <input
            className="quiz-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Machine Learning, Databases…"
            disabled={loading}
          />
          <select
            className="quiz-select"
            value={numQ}
            onChange={(e) => setNumQ(Number(e.target.value))}
            disabled={loading}
          >
            {[3, 5, 10, 15].map((n) => (
              <option key={n} value={n}>{n} Qs</option>
            ))}
          </select>
          <button className="quiz-generate-btn" type="submit" disabled={loading || !topic.trim()}>
            {loading ? <><span className="btn-spinner" /> Generating…</> : "🎯 Generate"}
          </button>
        </form>
      </div>

      {error && <p className="quiz-error">{error}</p>}

      {/* Score Screen */}
      {finished && (
        <div className="quiz-score-screen">
          <div className="score-ring-wrap">
            <svg className="score-ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" className="score-track" />
              <circle
                cx="60" cy="60" r="50"
                className="score-fill"
                style={{ strokeDashoffset: `${314 - (314 * pct) / 100}` }}
              />
            </svg>
            <div className="score-center">
              <span className="score-pct">{pct}%</span>
              <span className="score-label">Score</span>
            </div>
          </div>
          <h3 className="score-title">
            {pct >= 80 ? "🎉 Excellent!" : pct >= 50 ? "👍 Good effort!" : "📚 Keep studying!"}
          </h3>
          <p className="score-sub">
            You got <strong>{score}</strong> out of <strong>{quizzes.length}</strong> correct.
          </p>

          {/* Answer Review */}
          <div className="quiz-review">
            {answers.map((a, i) => (
              <div key={i} className={`review-row ${a.isCorrect ? "correct" : "wrong"}`}>
                <span className="review-num">{i + 1}.</span>
                <div className="review-content">
                  <p className="review-q">{a.question}</p>
                  <p className="review-a">
                    Your answer: <strong>{a.selected}</strong>
                    {!a.isCorrect && <> — Correct: <strong>{a.correct}</strong></>}
                  </p>
                </div>
                <span className="review-icon">{a.isCorrect ? "✅" : "❌"}</span>
              </div>
            ))}
          </div>

          <div className="quiz-score-actions">
            <button className="btn-primary" onClick={handleRestart}>Retake Quiz</button>
            <button className="btn-secondary" onClick={() => { setQuizzes([]); setFinished(false); }}>New Topic</button>
          </div>
        </div>
      )}

      {/* Active Quiz */}
      {!finished && quizzes.length > 0 && (
        <div className="quiz-active">
          {/* Progress */}
          <div className="quiz-progress-row">
            <span className="quiz-counter">{current + 1} / {quizzes.length}</span>
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${((current) / quizzes.length) * 100}%` }} />
            </div>
            <span className="quiz-score-live">
              ✅ {answers.filter(a => a.isCorrect).length} correct
            </span>
          </div>

          {/* Question */}
          <div className="quiz-question-card">
            <p className="quiz-q-label">Question {current + 1}</p>
            <h3 className="quiz-question">{q.question}</h3>
          </div>

          {/* Options */}
          <div className="quiz-options">
            {q.options.map((opt) => {
              let cls = "quiz-option";
              if (selected !== null) {
                if (opt === q.answer) cls += " correct";
                else if (opt === selected) cls += " wrong";
                else cls += " dimmed";
              }
              return (
                <button key={opt} className={cls} onClick={() => handleSelect(opt)} disabled={selected !== null}>
                  <span className="option-marker" />
                  {opt}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="quiz-feedback">
              {selected === q.answer ? (
                <p className="feedback-correct">✅ Correct! Well done.</p>
              ) : (
                <p className="feedback-wrong">❌ Incorrect. Correct answer: <strong>{q.answer}</strong></p>
              )}
              <button className="btn-primary" onClick={handleNext}>
                {current + 1 >= quizzes.length ? "See Results →" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}

      {!quizzes.length && !loading && !error && (
        <div className="quiz-empty">
          <div className="quiz-empty-icon">🎯</div>
          <p>Enter a topic to generate your quiz!</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
