import PropTypes from "prop-types";
import DashboardHeader from "./DashboardHeader";
import MainContent from "./MainContent";

const Dashboard = ({ 
  apartment, 
  userData, 
  taskStats, 
  ruleStats, 
  penaltyStats, 
  financeData, 
  purchaseData, 
  notifications,
  errors 
}) => {
  // Получаем аватар пользователя, если он есть
  const userAvatar = userData?.photo || userData?.avatar || null;

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader avatarUrl={userAvatar} />
      <div className="pt-16 max-w-7xl mx-auto flex">
        <MainContent 
          apartment={apartment}
          userData={userData}
          taskStats={taskStats}
          ruleStats={ruleStats}
          penaltyStats={penaltyStats}
          financeData={financeData}
          purchaseData={purchaseData}
          notifications={notifications}
          errors={errors}
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  apartment: PropTypes.object,
  userData: PropTypes.object,
  taskStats: PropTypes.object,
  ruleStats: PropTypes.object,
  penaltyStats: PropTypes.object,
  financeData: PropTypes.object,
  purchaseData: PropTypes.array,
  notifications: PropTypes.array,
  errors: PropTypes.object
};

export default Dashboard;
