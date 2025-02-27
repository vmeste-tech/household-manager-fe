import DashboardHeader from "./DashboardHeader";
import MainContent from "./MainContent";

const Dashboard = () => {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-16 max-w-7xl mx-auto flex">
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
