import { useState, useEffect } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import NotificationList from "../../components/Notification/NotificationList";
import NotificationDetails from "../../components/Notification/NotificationDetails";
import NotificationFilter from "../../components/Notification/NotificationFilter";
import { notifApi } from "../../api";

function NotificationPage() {
  // Заменяем моковые данные на данные с сервера
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка уведомлений с сервера при монтировании компонента
  useEffect(() => {
    const fetchNotifications = () => {
      setLoading(true);
      setError(null);

      notifApi.getNotifications((err, data) => {
        setLoading(false);
        if (err) {
          console.error("Ошибка при загрузке уведомлений:", err);
          setError("Не удалось загрузить уведомления");
        } else {
          console.log("Уведомления получены:", data);
          
          // Словарь перевода категорий на русский язык
          const categoryTranslations = {
            "USER": "Пользователи",
            "TASK": "Задачи",
            "RULE": "Правила",
            "PENALTY": "Штрафы",
            "FINANCE": "Финансы"
          };
          
          // Преобразуем данные с бэкенда в формат, понятный компонентам
          const transformedNotifications = Array.isArray(data) ? data.map(notification => {
            // Получаем оригинальную категорию
            const originalCategory = notification.categoryName || notification.category || "OTHER";
            
            // Переводим категорию на русский или используем оригинал, если перевода нет
            const translatedCategory = categoryTranslations[originalCategory] || originalCategory || "Уведомление";
            
            return {
              id: notification.id,
              category: translatedCategory,
              description: notification.message || notification.description || "",
              datetime: notification.timestamp,
              read: notification.read || notification.isRead || false
            };
          }) : [];
          
          setNotifications(transformedNotifications);
        }
      });
    };

    fetchNotifications();
  }, []);

  const handleSelectNotification = (notification) => {
    // Отметить уведомление как прочитанное через API
    notifApi.readNotification(notification.id, (err, data) => {
      if (err) {
        console.error("Ошибка при отметке уведомления как прочитанное:", err);
      } else {
        console.log("Уведомление отмечено как прочитанное:", data);
        
        // Обновляем список уведомлений с учетом прочитанного
        setNotifications(prevNotifications =>
          prevNotifications.map(n =>
            n.id === notification.id ? { ...n, read: true } : n
          )
        );
        
        // Устанавливаем выбранное уведомление как прочитанное
        setSelectedNotification({ ...notification, read: true });
      }
    });
  };

  // Фильтруем уведомления в зависимости от значения filter
  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true; // если понадобится вариант "все", или другая логика
  });

  return (
    <div className="bg-indigo-50 min-h-screen overflow-hidden">
      <DashboardHeader />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <NotificationFilter
          filter={filter}
          onChangeFilter={(newFilter) => setFilter(newFilter)}
        />
        {/* Отображение состояния загрузки */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-red-500">
            {error}
          </div>
        ) : (
          <>
            {/* Мобильная версия */}
            <div className="block md:hidden bg-white rounded-xl shadow-sm overflow-hidden">
              {selectedNotification ? (
                <NotificationDetails
                  notification={selectedNotification}
                  onBack={() => setSelectedNotification(null)}
                />
              ) : (
                <NotificationList
                  notifications={filteredNotifications}
                  onSelect={handleSelectNotification}
                />
              )}
            </div>
            {/* Десктопная версия */}
            <div className="hidden md:flex h-[calc(100vh-80px)] bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Левая колонка со списком уведомлений с независимой прокруткой */}
              <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
                <NotificationList
                  notifications={filteredNotifications}
                  onSelect={handleSelectNotification}
                />
              </div>
              {/* Правая колонка – подробности уведомления */}
              <div className="w-1/2 overflow-y-auto">
                <NotificationDetails notification={selectedNotification} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
