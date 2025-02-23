import { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import ruleIcon from "../../assets/rule.svg";
import RuleCard from "../../components/RuleCard/RuleCard";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./RulePage.css";

// Регистрируем необходимые элементы для Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Пример данных – обычно они приходят с сервера
const rulesData = [
  {
    id: 1,
    title: "Не шуметь после 22:00",
    frequency: "ежедневно",
    fine: "300 руб.",
    status: "accepted",
    votingActive: false,
  },
  {
    id: 2,
    title: "Убирать за собой",
    frequency: "еженедельно",
    fine: "100 руб.",
    status: "pending",
    votingActive: true,
  },
  {
    id: 3,
    title: "Запрещено оставлять мусор",
    frequency: "ежемесячно",
    fine: "500 руб.",
    status: "rejected",
    votingActive: false,
  },
  // Можно добавить дополнительные правила
];

const TABS = [
  { key: "all", label: "Все правила" },
  { key: "accepted", label: "Принятые" },
  { key: "pending", label: "На голосовании" },
  { key: "rejected", label: "Отклонённые" },
];

function RulesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const handleCreateRule = () => {
    console.log("Создать правило");
    // Здесь можно открыть модальное окно или перенаправить пользователя на форму создания правила
  };

  const handleVote = (vote, id) => {
    console.log(`Пользователь проголосовал "${vote}" по правилу с id:`, id);
  };

  // Фильтруем правила по активной вкладке
  const filteredRules =
    activeTab === "all"
      ? rulesData
      : rulesData.filter((rule) => rule.status.toLowerCase() === activeTab);

  // Вычисляем статистику
  const totalRules = rulesData.length;
  const acceptedCount = rulesData.filter(
    (rule) => rule.status.toLowerCase() === "accepted"
  ).length;
  const pendingCount = rulesData.filter(
    (rule) => rule.status.toLowerCase() === "pending"
  ).length;
  const rejectedCount = rulesData.filter(
    (rule) => rule.status.toLowerCase() === "rejected"
  ).length;

  // Данные для графика
  const chartData = {
    labels: ["Принятые", "На голосовании", "Отклонённые"],
    datasets: [
      {
        label: "Правила",
        data: [acceptedCount, pendingCount, rejectedCount],
        backgroundColor: [
          "#2e7d32", // принятые
          "#856404", // на голосовании
          "#c62828", // отклонённые
        ],
        hoverBackgroundColor: ["#388e3c", "#a67c00", "#e53935"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="rules-page">
      <PageHeader
        title="ПРАВИЛА ПРОЖИВАНИЯ"
        icon={ruleIcon}
        gradientStart="#C26E41"
        gradientEnd="#000000"
      />

      <div className="rules-container">
        <div className="rules-main">
          <div className="tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-button ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rules-layout">
            {filteredRules.map((rule) => (
              <RuleCard
                key={rule.id}
                title={rule.title}
                frequency={rule.frequency}
                fine={rule.fine}
                status={rule.status}
                votingActive={rule.votingActive}
                onVote={(vote) => handleVote(vote, rule.id)}
              />
            ))}
          </div>
        </div>

        <div className="sidebar">
          <h2>Статистика</h2>
          <div className="stats-info">
            <p>Всего правил: {totalRules}</p>
            <p>Принятые: {acceptedCount}</p>
            <p>На голосовании: {pendingCount}</p>
            <p>Отклонённые: {rejectedCount}</p>
          </div>
          <div className="chart-container">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <button className="create-rule-button" onClick={handleCreateRule}>
        + Создать правило
      </button>
    </div>
  );
}

export default RulesPage;
