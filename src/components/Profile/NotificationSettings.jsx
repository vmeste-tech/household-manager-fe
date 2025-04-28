import { useState, useEffect } from "react";
import { notifApi } from "../../api";
import NotificationSettingDto from "../../generated-notif-client-js/src/model/NotificationSettingDto";

const notificationCategories = [
  {
    id: "taskEnabled",
    title: "Задачи",
    description: "Уведомления о новых задачах и их статусах",
  },
  {
    id: "ruleEnabled",
    title: "Правила",
    description: "Изменения или новые правила проживания",
  },
  {
    id: "penaltyEnabled",
    title: "Штрафы",
    description: "Оповещения о назначении или оплате штрафов",
  },
  {
    id: "financeEnabled",
    title: "Финансы",
    description: "Уведомления о расходах, балансах, затратах и совместных покупках",
  },
  {
    id: "userEnabled",
    title: "Квартира",
    description: "Изменения в настройках квартиры и новых жильцах",
  },
];

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState([]);

  // Загрузка настроек при монтировании компонента
  useEffect(() => {
    loadSettings();
  }, []);

  // Функция для загрузки настроек с сервера
  const loadSettings = () => {
    setIsLoading(true);
    notifApi.getSetting((error, data) => {
      if (error) {
        console.error("Ошибка при загрузке настроек:", error);
        showToast("Не удалось загрузить настройки уведомлений", "danger");
        setIsLoading(false);
        return;
      }
      
      if (data) {
        // Создаем массив уведомлений на основе данных API
        const updatedNotifications = notificationCategories.map(item => ({
          ...item,
          checked: data[item.id] === true,
        }));
        setNotifications(updatedNotifications);
      } else {
        // Если данные не пришли, установим все настройки как выключенные
        const emptyNotifications = notificationCategories.map(item => ({
          ...item,
          checked: false,
        }));
        setNotifications(emptyNotifications);
      }
      setIsLoading(false);
    });
  };

  // Вспомогательная функция для отображения toast-уведомлений
  const showToast = (message, type) => {
    console.log(`[${type}] ${message}`);
  };

  // Функция для отправки обновленных настроек на сервер
  const updateSettings = (updatedSettings) => {
    const settingDto = new NotificationSettingDto();
    
    // Заполняем все поля из обновленных настроек
    for (const key in updatedSettings) {
      settingDto[key] = updatedSettings[key];
    }
    
    notifApi.updateSetting(settingDto, (error, data) => {
      if (error) {
        console.error("Ошибка при сохранении настроек:", error);
        showToast("Не удалось сохранить настройки", "danger");
        loadSettings();
        return;
      }
      
      // Если API вернул данные, обновляем UI
      if (data) {
        setNotifications(prev => 
          prev.map(item => ({
            ...item,
            checked: data[item.id] === true,
          }))
        );
        showToast("Настройки успешно обновлены", "success");
      } else {
        loadSettings();
      }
    });
  };

  // Переключить все уведомления (Select all)
  const handleSelectAll = () => {
    const allSelected = notifications.every((n) => n.checked);
    const newValue = !allSelected;
    
    // Обновляем все локально
    const updatedNotifications = notifications.map(item => ({ 
      ...item, 
      checked: newValue 
    }));
    setNotifications(updatedNotifications);
    
    // Подготовка данных для API в формате NotificationSettingDto
    const updatedSettings = updatedNotifications.reduce((acc, item) => {
      acc[item.id] = item.checked;
      return acc;
    }, {});
    
    updateSettings(updatedSettings);
  };

  // Переключить одно уведомление
  const handleToggle = (id) => {
    if (updatingItems.includes(id)) return;
    
    setUpdatingItems(prev => [...prev, id]);
    
    // Обновляем локально
    const updatedNotifications = notifications.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setNotifications(updatedNotifications);
    
    // Подготовка данных в формате NotificationSettingDto
    const updatedSettings = updatedNotifications.reduce((acc, item) => {
      acc[item.id] = item.checked;
      return acc;
    }, {});
    
    notifApi.updateSetting(updatedSettings, (error, data) => {
      setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
      
      if (error) {
        console.error("Ошибка при сохранении настройки:", error);
        showToast("Не удалось изменить настройку", "danger");
        loadSettings();
        return;
      }
      
      // Обновляем UI на основе ответа
      if (data && data[id] !== undefined) {
        setNotifications(prev => 
          prev.map(item => 
            item.id === id ? { ...item, checked: data[id] === true } : item
          )
        );
      }
    });
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

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Настройки уведомлений не доступны
        </div>
      ) : (
        notifications.map(({ id, title, description, checked }) => (
          <div
            key={id}
            className="flex items-start justify-between mb-3 px-4 py-3 border rounded-md border-gray-200 hover:bg-gray-50 transition"
          >
            {/* Левая часть: текст уведомления */}
            <div className="mr-4">
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
                disabled={updatingItems.includes(id) || isLoading}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 ${updatingItems.includes(id) ? 'bg-gray-400' : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative ${updatingItems.includes(id) ? 'opacity-70' : ''}`}>
                {updatingItems.includes(id) && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-3 h-3 border-t-2 border-r-2 border-white rounded-full animate-spin"></span>
                  </span>
                )}
              </div>
            </label>
          </div>
        ))
      )}
    </div>
  );
}
