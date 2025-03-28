import { useState } from "react";
import PropTypes from "prop-types";
import RuleCard from "./RuleCard";
import RuleDetails from "./RuleDetails";

const RuleCards = ({ activeFilter }) => {
  const [selectedRule, setSelectedRule] = useState(null);

  // Status-based styling configuration
  const statusStyles = {
    Принятые: {
      gradientClass: "from-green-500 to-teal-600",
      svgPath: "M5 13l4 4L19 7",
      svgViewBox: "0 0 24 24",
      badgeClass: "bg-green-100 text-green-800",
    },
    "На голосовании": {
      gradientClass: "from-amber-400 to-orange-500",
      svgPath:
        "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      svgViewBox: "0 0 24 24",
      badgeClass: "bg-amber-100 text-amber-800",
    },
    Отклонённые: {
      gradientClass: "from-red-400 to-red-600",
      svgPath: "M6 18L18 6M6 6l12 12",
      svgViewBox: "0 0 24 24",
      badgeClass: "bg-red-100 text-red-800",
    },
  };

  const rules = [
    {
      id: 1,
      title: "Тишина после 22:00",
      description:
        "Запрещается шуметь после 22:00, чтобы не мешать другим жильцам отдыхать перед следующим рабочим днем.",
      status: "Принятые",
      fine: "500₽",
      votesFor: 4,
      votesAgainst: 1,
      createdBy: "Иван Иванов",
      createdAt: "2023-09-15",
      cronExpression: "0 22 * * *",
      timeZone: "Europe/Moscow",
    },
    {
      id: 2,
      title: "График уборки",
      description:
        "Ежедневная уборка общественных зон согласно установленному графику. Каждый жилец обязан следовать своему расписанию.",
      status: "Принятые",
      fine: "300₽",
      votesFor: 5,
      votesAgainst: 0,
      createdBy: "Анна Смирнова",
      createdAt: "2023-09-10",
      cronExpression: "0 10 * * MON,WED,FRI",
      timeZone: "Europe/Moscow",
    },
    {
      id: 3,
      title: "Ограничение на использование ванной",
      description:
        "Максимальное время использования ванной в часы пик (утром с 7:00 до 9:00 и вечером с 19:00 до 21:00) - 30 минут.",
      status: "На голосовании",
      fine: "200₽",
      votesFor: 2,
      votesAgainst: 1,
      createdBy: "Петр Петров",
      createdAt: "2023-09-20",
      cronExpression: "0 7,19 * * *",
      timeZone: "Europe/Moscow",
    },
    {
      id: 4,
      title: "Запрет на курение в помещении",
      description:
        "Запрещается курение в квартире. Для курения необходимо выходить на балкон или улицу.",
      status: "Принятые",
      fine: "1000₽",
      votesFor: 3,
      votesAgainst: 2,
      createdBy: "Мария Иванова",
      createdAt: "2023-08-15",
      cronExpression: "0 0 * * *",
      timeZone: "Europe/Moscow",
    },
    {
      id: 5,
      title: "Использование стиральной машины",
      description:
        "Запрещается использовать стиральную машину после 23:00, чтобы не мешать соседям спать.",
      status: "Отклонённые",
      fine: "300₽",
      votesFor: 1,
      votesAgainst: 4,
      createdBy: "Алексей Сидоров",
      createdAt: "2023-09-01",
      cronExpression: "0 23 * * *",
      timeZone: "Europe/Moscow",
    },
  ];

  const filteredRules =
    activeFilter === "Все"
      ? rules
      : rules.filter((rule) => rule.status === activeFilter);

  const handleVote = (ruleId, voteType) => {
    // Здесь будет логика обработки голосования
    console.log(`Проголосовал ${voteType} за правило ${ruleId}`);

    // В реальном приложении здесь был бы API-запрос
    // и обновление состояния после успешного ответа
  };

  const closeDetails = () => {
    setSelectedRule(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRules.map((rule) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            styleConfig={statusStyles[rule.status]}
            onClick={() => setSelectedRule(rule)}
          />
        ))}
      </div>

      {selectedRule && (
        <RuleDetails
          rule={selectedRule}
          styleConfig={statusStyles[selectedRule.status]}
          onClose={closeDetails}
          onVote={handleVote}
        />
      )}
    </>
  );
};

RuleCards.propTypes = {
  activeFilter: PropTypes.string.isRequired,
};

export default RuleCards;
