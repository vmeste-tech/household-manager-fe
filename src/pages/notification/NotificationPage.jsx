import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import NotificationList from "../../components/Notification/NotificationList";
import NotificationDetails from "../../components/Notification/NotificationDetails";
import NotificationFilter from "../../components/Notification/NotificationFilter";

function NotificationPage() {
  const initialNotifications = [
    {
      id: 1,
      category: "задачи",
      description: "Выполните ежедневное обновление данных.",
      datetime: "2023-03-01T10:00:00Z",
    },
    {
      id: 2,
      category: "правила",
      description: "Обновлены правила использования платформы.",
      datetime: "2023-03-01T11:15:00Z",
    },
    {
      id: 3,
      category: "штрафы",
      description: "Штраф за несоблюдение сроков.",
      datetime: "2023-03-01T12:30:00Z",
    },
    {
      id: 4,
      category: "затраты",
      description: "Затраты на обслуживание системы увеличились.",
      datetime: "2023-03-01T13:45:00Z",
    },
    {
      id: 5,
      category: "финансы",
      description: "Финансовый отчёт за первый квартал готов.",
      datetime: "2023-03-01T14:00:00Z",
    },
    {
      id: 6,
      category: "квартира",
      description: "Объявление о продаже квартиры в центре города.",
      datetime: "2023-03-01T15:20:00Z",
      read: true,
    },
    {
      id: 7,
      category: "задачи",
      description: "Новая задача: обновить базу данных.",
      datetime: "2023-03-01T16:30:00Z",
      read: true,
    },
    {
      id: 8,
      category: "правила",
      description: "Пересмотр правил работы с документами.",
      datetime: "2023-03-01T17:00:00Z",
      read: true,
    },
    {
      id: 9,
      category: "штрафы",
      description: "Штраф за нарушение графика работ.",
      datetime: "2023-03-01T18:15:00Z",
      read: true,
    },
    {
      id: 10,
      category: "затраты",
      description: "Снижение затрат на обслуживание серверов.",
      datetime: "2023-03-01T19:30:00Z",
      read: true,
    },
    {
      id: 11,
      category: "финансы",
      description: "Новый финансовый план утверждён.",
      datetime: "2023-03-02T09:00:00Z",
      read: true,
    },
    {
      id: 12,
      category: "квартира",
      description: "Скидки на покупку квартиры только сегодня.",
      datetime: "2023-03-02T10:15:00Z",
      read: true,
    },
    {
      id: 13,
      category: "задачи",
      description: "Проведите ревизию оборудования.",
      datetime: "2023-03-02T11:30:00Z",
      read: true,
    },
    {
      id: 14,
      category: "правила",
      description: "Новые правила проведения собраний.",
      datetime: "2023-03-02T12:45:00Z",
      read: true,
    },
    {
      id: 15,
      category: "штрафы",
      description: "Штраф за опоздание на встречу.",
      datetime: "2023-03-02T14:00:00Z",
      read: true,
    },
    {
      id: 16,
      category: "затраты",
      description: "Увеличение затрат на ремонт оборудования.",
      datetime: "2023-03-02T15:15:00Z",
      read: true,
    },
    {
      id: 17,
      category: "финансы",
      description: "Финансовая отчетность за февраль.",
      datetime: "2023-03-02T16:30:00Z",
      read: true,
    },
    {
      id: 18,
      category: "квартира",
      description: "Новая квартира в жилом комплексе.",
      datetime: "2023-03-02T17:45:00Z",
      read: true,
    },
    {
      id: 19,
      category: "задачи",
      description: "Подготовьте презентацию для клиентов.",
      datetime: "2023-03-02T19:00:00Z",
      read: true,
    },
    {
      id: 20,
      category: "правила",
      description: "Обновление правил внутреннего распорядка.",
      datetime: "2023-03-02T20:15:00Z",
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleSelectNotification = (notification) => {
    // Обновляем уведомление, помечая его как прочитанное
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);

    // Передаём обновлённое уведомление в выбранное
    setSelectedNotification({ ...notification, read: true });
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
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <NotificationFilter
          filter={filter}
          onChangeFilter={(newFilter) => setFilter(newFilter)}
        />
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
      </div>
    </div>
  );
}

export default NotificationPage;
