import React from "react";
import "./LearningProgress.css";

const PROGRESS_METRICS = [
  { label: "Study Duration", value: "14.5 hrs", detail: "+2.3 hrs this week", pct: 68, color: "var(--accent)" },
  { label: "Flashcards Mastered", value: "32/45 cards", detail: "Active learning high", pct: 71, color: "#457B9D" },
  { label: "Quiz Success Rate", value: "84%", detail: "Top 10% of topics", pct: 84, color: "#2A7B54" },
];

function LearningProgress() {
  return (
    <section className="learning-progress">
      <div className="section-header">
        <div className="section-header-left">
          <h2 className="section-title">Learning Progress</h2>
          <p className="section-sub">Your personal AI-assisted learning trends</p>
        </div>
      </div>

      <div className="progress-card-container">
        {PROGRESS_METRICS.map((metric, idx) => (
          <div className="progress-metric-row" key={idx}>
            <div className="progress-metric-info">
              <div>
                <span className="metric-label">{metric.label}</span>
                <h4 className="metric-value">{metric.value}</h4>
              </div>
              <span className="metric-detail">{metric.detail}</span>
            </div>
            
            <div className="metric-bar-wrapper">
              <div className="metric-bar-bg">
                <div 
                  className="metric-bar-fill" 
                  style={{ width: `${metric.pct}%`, backgroundColor: metric.color }}
                />
              </div>
              <span className="metric-pct-label">{metric.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearningProgress;
