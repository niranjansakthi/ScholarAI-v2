import "./StatsGrid.css";
import StatCard from "../StatCard/StatCard";
import { useDocuments } from "../../../context/DocumentContext";

function StatsGrid() {
  const { documents } = useDocuments();

  const stats = [
    {
      title: "Documents",
      // Real count from context; fall back to 0 if none uploaded
      value: documents.length > 0 ? String(documents.length) : "0",
      icon: "📄",
      trend: documents.length > 0 ? null : undefined, // hide trend until real data exists
      color: "gold",
    },
    { title: "Flashcards", value: "—",  icon: "🃏", color: "blue"   },
    { title: "Quizzes",    value: "—",  icon: "🎯", color: "purple" },
    { title: "AI Chats",   value: "—",  icon: "💬", color: "green"  },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}

export default StatsGrid;