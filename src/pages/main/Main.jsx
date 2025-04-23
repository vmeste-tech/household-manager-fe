import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { userApi, taskApi, ruleApi, penaltyApi, financeApi, notifApi } from "../../api";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";

const Main = () => {
  // Состояние для основной информации
  const [apartment, setApartment] = useState(null);
  const [user, setUser] = useState(null);
  
  // Состояния для данных карточек
  const [taskStats, setTaskStats] = useState(null);
  const [ruleStats, setRuleStats] = useState(null);
  const [penaltyStats, setPenaltyStats] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);
  const [notifications, setNotifications] = useState(null);
  
  // Состояния для отслеживания загрузки
  const [loading, setLoading] = useState({
    apartment: true,
    user: true,
    tasks: true,
    rules: true,
    penalties: true,
    finances: true,
    purchases: true,
    notifications: true
  });
  
  // Состояние для ошибок
  const [errors, setErrors] = useState({});

  // Проверка завершения всех загрузок
  const isLoading = Object.values(loading).some(value => value);

  // Загрузка данных о пользователе
  useEffect(() => {
    userApi.getUser((error, data) => {
      setLoading(prev => ({ ...prev, user: false }));
      if (error) {
        console.error("Ошибка получения данных пользователя:", error);
        setErrors(prev => ({ ...prev, user: "Не удалось загрузить данные пользователя" }));
      } else {
        setUser(data);
      }
    });
  }, []);

  // Загрузка данных о квартире
  useEffect(() => {
    userApi.findApartmentByUser((error, data) => {
      setLoading(prev => ({ ...prev, apartment: false }));
      if (error) {
        console.error("Ошибка получения квартиры:", error);
        
        // Проверяем, является ли ошибка 404 (квартира не найдена)
        if (error.status === 404) {
          console.log("У пользователя нет квартиры");
          // Устанавливаем apartment в null и отмечаем все загрузки как выполненные
          setApartment(null);
          setLoading(prev => ({
            ...prev,
            tasks: false,
            rules: false,
            penalties: false,
            finances: false,
            purchases: false,
            notifications: false
          }));
        } else {
          // В случае других ошибок сохраняем информацию в состоянии ошибок
          setErrors(prev => ({ ...prev, apartment: "Не удалось загрузить данные квартиры" }));
        }
      } else {
        setApartment(data);
        if (data?.apartmentId) {
          localStorage.setItem("apartmentId", data.apartmentId);
          
          // Загружаем остальные данные только если есть квартира
          loadTaskStats(data.apartmentId);
          loadRuleStats(data.apartmentId);
          loadPenaltyStats(data.apartmentId);
          loadFinanceData(data.apartmentId);
          loadPurchaseData(data.apartmentId);
          loadNotifications();
        } else {
          // Если квартиры нет, отмечаем остальные загрузки как завершенные
          setLoading(prev => ({
            ...prev,
            tasks: false,
            rules: false,
            penalties: false,
            finances: false,
            purchases: false,
            notifications: false
          }));
        }
      }
    });
  }, []);

  // Загрузка статистики задач
  const loadTaskStats = (apartmentId) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30); // статистика за последние 30 дней
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    taskApi.getTasks(
      apartmentId, 
      formatDate(startDate), 
      formatDate(today), 
      (error, data) => {
        setLoading(prev => ({ ...prev, tasks: false }));
        if (error) {
          console.error("Ошибка получения задач:", error);
          setErrors(prev => ({ ...prev, tasks: "Не удалось загрузить задачи" }));
        } else {
          // Считаем статистику по задачам
          const total = data.length;
          const completed = data.filter(task => task.status === "DONE").length;
          const overdue = data.filter(task => {
            const deadline = new Date(task.deadline);
            return deadline < today && task.status !== "DONE";
          }).length;

          setTaskStats({
            total,
            completed,
            overdue
          });
        }
      }
    );
  };

  // Загрузка статистики правил
  const loadRuleStats = (apartmentId) => {
    ruleApi.getApartmentRules(apartmentId, (error, data) => {
      setLoading(prev => ({ ...prev, rules: false }));
      if (error) {
        console.error("Ошибка получения правил:", error);
        setErrors(prev => ({ ...prev, rules: "Не удалось загрузить правила" }));
      } else {
        const activeRules = data.filter(rule => rule.status === "ACCEPTED").length;
        const votingRules = data.filter(rule => rule.status === "VOTING").length;
        
        setRuleStats({
          activeRules,
          votingRules
        });
      }
    });
  };

  // Загрузка статистики штрафов
  const loadPenaltyStats = (apartmentId) => {
    penaltyApi.getApartmentPenalties(apartmentId, {}, (error, data) => {
      setLoading(prev => ({ ...prev, penalties: false }));
      if (error) {
        console.error("Ошибка получения штрафов:", error);
        setErrors(prev => ({ ...prev, penalties: "Не удалось загрузить штрафы" }));
      } else {
        const totalFines = data.reduce((sum, penalty) => sum + penalty.amount, 0);
        
        setPenaltyStats({
          finesCount: data.length,
          totalFines
        });
      }
    });
  };

  // Загрузка данных финансов
  const loadFinanceData = (apartmentId) => {
    // Получаем текущий период в формате YYYYMM
    const now = new Date();
    const currentPeriod = now.getFullYear() * 100 + (now.getMonth() + 1);
    
    financeApi.getUserFinances(apartmentId, currentPeriod, (error, data) => {
      setLoading(prev => ({ ...prev, finances: false }));
      if (error) {
        console.error("Ошибка получения финансов:", error);
        setErrors(prev => ({ ...prev, finances: "Не удалось загрузить финансы" }));
      } else {
        // Находим данные текущего пользователя
        const userData = data.find(item => item.email === user?.email) || {};
        setFinanceData({
          balance: userData.creditorAmount - userData.debtorAmount || 0
        });
      }
    });
  };

  // Загрузка данных о покупках
  const loadPurchaseData = () => {
    // Формируем параметры для запроса расходов за последние 30 дней
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const opts = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
    
    financeApi.getExpenses(opts, (error, data) => {
      setLoading(prev => ({ ...prev, purchases: false }));
      if (error) {
        console.error("Ошибка получения расходов:", error);
        setErrors(prev => ({ ...prev, purchases: "Не удалось загрузить расходы" }));
      } else {
        setPurchaseData(data || []);
      }
    });
  };

  // Загрузка уведомлений
  const loadNotifications = () => {
    notifApi.getNotifications((error, data) => {
      setLoading(prev => ({ ...prev, notifications: false }));
      if (error) {
        console.error("Ошибка получения уведомлений:", error);
        setErrors(prev => ({ ...prev, notifications: "Не удалось загрузить уведомления" }));
      } else {
        setNotifications(data || []);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="bg-indigo-50 min-h-screen">
        <DashboardHeader />
        <div className="pt-20 flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          <span className="ml-4 text-xl text-indigo-800">Загрузка данных...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Dashboard 
        apartment={apartment} 
        userData={user}
        taskStats={taskStats}
        ruleStats={ruleStats}
        penaltyStats={penaltyStats}
        financeData={financeData}
        purchaseData={purchaseData}
        notifications={notifications}
        errors={errors}
      />
    </div>
  );
};

export default Main;
