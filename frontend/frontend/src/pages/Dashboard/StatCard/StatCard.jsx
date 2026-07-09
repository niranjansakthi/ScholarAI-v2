import "./StatCard.css";

function StatCard({ title, value, icon, trend = 12, color = "gold", progress = 70 }) {
  // Let's render a custom mini sparkline path based on the color to make it look premium
  const getSparklineColor = () => {
    switch(color) {
      case "gold": return "#E76F51";
      case "blue": return "#457B9D";
      case "purple": return "#9B5DE5";
      case "green": return "#2A7B54";
      default: return "#E76F51";
    }
  };

  const sparklineColor = getSparklineColor();

  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card-header">
        <div className="stat-icon-wrapper">
          <span className="stat-icon" aria-hidden="true">{icon}</span>
        </div>
        {trend !== undefined && (
          <span className="stat-trend">
            <span className="trend-arrow">↑</span> {trend}%
          </span>
        )}
      </div>

      <div className="stat-card-body">
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
      </div>

      <div className="stat-card-footer">
        {/* Sparkline visualization */}
        <div className="stat-sparkline" aria-hidden="true">
          <svg viewBox="0 0 100 30" width="100%" height="30">
            <path
              d="M0,25 Q15,5 30,20 T60,10 T90,25"
              fill="none"
              stroke={sparklineColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0,25 Q15,5 30,20 T60,10 T90,25 L100,30 L0,30 Z"
              fill={`url(#gradient-${color})`}
              opacity="0.1"
            />
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparklineColor} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Modern progress bar */}
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${sparklineColor}, var(--accent-hover))`
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default StatCard;