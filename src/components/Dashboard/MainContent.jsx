import PropTypes from "prop-types";
import ApartmentCard from "./ApartmentCard";
import FinancesCard from "./FinancesCard";
import InboxCard from "./InboxCard";
import PenaltyCard from "./PenaltyCard";
import PurchasesCard from "./PurchasesCard";
import RulesCard from "./RulesCard";
import TasksCard from "./TasksCard";
import WelcomeCard from "./WelcomeCard";

const MainContent = ({ 
  apartment, 
  userData, 
  taskStats, 
  ruleStats, 
  penaltyStats, 
  financeData, 
  purchaseData, 
  notifications 
}) => {
  // Рассчитываем количество дней проживания, если есть данные
  const calculateDaysLived = () => {
    if (!apartment?.createdAt) return 0;
    const createdDate = new Date(apartment.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Преобразуем данные о расходах для графика
  const preparePurchaseData = () => {
    if (!purchaseData || purchaseData.length === 0) return [];
    
    return purchaseData.map(item => item.amount || 0);
  };

  // Подготавливаем статистику по задачам для недельного графика
  const prepareTaskData = () => {
    // Если нет данных о задачах, возвращаем пустой массив
    if (!taskStats) return null;
    
    const daysOfWeek = ["П", "В", "С", "Ч", "П", "С", "В"];
    return daysOfWeek.map((day, index) => ({
      label: day,
      count: Math.floor(Math.random() * (taskStats.total || 10)) // Симуляция данных для визуализации
    }));
  };

  // Подготавливаем количество непрочитанных уведомлений
  const countUnreadNotifications = () => {
    if (!notifications) return 0;
    return notifications.filter(notification => !notification.read).length;
  };

  return (
    <main className="flex-1 p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <WelcomeCard userName={userData?.firstName || "Пользователь"} />
        <InboxCard unreadCount={countUnreadNotifications()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TasksCard tasksData={prepareTaskData()} />
        
        <RulesCard 
          activeRules={ruleStats?.activeRules || 0} 
          votingRules={ruleStats?.votingRules || 0} 
        />
        
        <PenaltyCard 
          finesCount={penaltyStats?.finesCount || 0} 
          totalFines={penaltyStats?.totalFines || 0} 
        />
        
        <FinancesCard balance={financeData?.balance || 0} />
        
        <PurchasesCard purchasesData={preparePurchaseData()} />
        
        <ApartmentCard
          apartmentName={apartment?.name || "Квартира не выбрана"}
          residentsCount={apartment?.users?.length || 0}
          daysLived={calculateDaysLived()}
        />
      </div>
    </main>
  );
};

MainContent.propTypes = {
  apartment: PropTypes.object,
  userData: PropTypes.object,
  taskStats: PropTypes.object,
  ruleStats: PropTypes.object,
  penaltyStats: PropTypes.object,
  financeData: PropTypes.object,
  purchaseData: PropTypes.array,
  notifications: PropTypes.array
};

export default MainContent;
