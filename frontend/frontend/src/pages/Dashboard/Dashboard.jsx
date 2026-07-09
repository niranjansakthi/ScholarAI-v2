import "./Dashboard.css";

import WelcomeCard from "./WelcomeCard/WelcomeCard";
import QuickActions from "./QuickActions/QuickActions";
import FeatureGrid from "./FeatureGrid/FeatureGrid";
import RecentDocuments from "./RecentDocuments/RecentDocuments";
import StatsGrid from "./StatsGrid/StatsGrid";
import LearningProgress from "./LearningProgress/LearningProgress";
import ChatPreview from "./ChatPreview/ChatPreview";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <WelcomeCard />
      <StatsGrid />
      <QuickActions />
      
      <div className="dashboard-grid-layout">
        <div className="dashboard-main-col">
          <FeatureGrid />
        </div>
        <div className="dashboard-side-col">
          <LearningProgress />
          <ChatPreview />
          <RecentDocuments />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;