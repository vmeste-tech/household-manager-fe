import { useState } from "react";

const notificationsList = [
  {
    id: "tasks",
    title: "Задачи",
    description: "Уведомления о новых задачах и их статусах",
    defaultChecked: true,
  },
  {
    id: "rules",
    title: "Правила",
    description: "Изменения или новые правила проживания",
    defaultChecked: false,
  },
  {
    id: "penalties",
    title: "Штрафы",
    description: "Оповещения о назначении или оплате штрафов",
    defaultChecked: true,
  },
  {
    id: "expenses",
    title: "Затраты",
    description: "Сообщения о новых расходах и совместных покупках",
    defaultChecked: false,
  },
  {
    id: "finances",
    title: "Финансы",
    description: "Уведомления о балансах и платежах",
    defaultChecked: true,
  },
  {
    id: "apartment",
    title: "Квартира",
    description: "Изменения в настройках квартиры и новых жильцах",
    defaultChecked: true,
  },
];

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState(
    notificationsList.map((item) => ({
      ...item,
      checked: item.defaultChecked,
    }))
  );

  // Переключить все уведомления (Select all)
  const handleSelectAll = () => {
    const allSelected = notifications.every((n) => n.checked);
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, checked: !allSelected }))
    );
  };

  // Переключить одно уведомление
  const handleToggle = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="p-8 bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold">Уведомления</div>
        <div
          className="text-indigo-600 cursor-pointer text-sm font-medium"
          onClick={handleSelectAll}
        >
          Выбрать все
        </div>
      </div>

      {notifications.map(({ id, title, description, checked }) => (
        <div
          key={id}
          className="flex items-start justify-between mb-3 px-4 py-3 border rounded-md border-gray-200 hover:bg-gray-50 transition"
        >
          {/* Левая часть: текст уведомления */}
          <div className="mr-4">
            {/* Заголовок в стиле ваших label (немного скорректирован для читабельности) */}
            <div className="block mb-1 text-xs font-medium uppercase tracking-wider">
              {title}
            </div>
            <div className="text-sm text-gray-500">{description}</div>
          </div>

          {/* Правая часть: сам переключатель */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleToggle(id)}
              className="sr-only peer"
            />
            {/* Сам переключатель */}
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative"></div>
          </label>
        </div>
      ))}
    </div>
  );
}
