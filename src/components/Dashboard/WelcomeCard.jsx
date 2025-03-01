import { useState, useEffect } from "react";

const WelcomeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Обновление каждую секунду
    return () => clearInterval(timer);
  }, []);

  // Форматируем время в виде "HH:MM"
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Форматируем дату в виде "ДД Месяц" (например, "1 марта")
  const formattedDate = currentTime.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  // Объединяем дату и время в одну строку
  const dateTimeString = `${formattedDate} ${formattedTime}`;

  return (
    <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
      <h2 className="text-4xl md:text-5xl text-blue-900">
        С возвращением,
        <br />
        <strong>Егор</strong>
      </h2>
      <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
        {dateTimeString}
      </span>
    </div>
  );
};

export default WelcomeCard;
