import { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import violationIcon from "../../assets/violation.svg";
import ViolationCard from "../../components/ViolationCard/ViolationCard";
import DashboardStats from "../../components/Statistics/DashboardStats";

function ViolationPage() {
  const [view, setView] = useState("violations");

  const violations = Array.from({ length: 10 }, (_, index) => ({
    user: "Егор",
    status: "не оплачен",
    date: "17.01.2025",
    amount: "500 руб.",
    description:
      "Это подробное описание нарушения. Здесь может быть дополнительная информация о событии.",
  }));

  const statsData = [
    {
      title: "Unique views",
      value: "192.1k",
      change: "32k increase",
      isIncrease: true,
    },
    {
      title: "Bounce rate",
      value: "21%",
      change: "7% increase",
      isIncrease: false,
    },
    {
      title: "Average time on page",
      value: "03:12",
      change: "3% increase",
      isIncrease: true,
    },
  ];

  return (
    <div className="task-page">
      <PageHeader
        title="ШТРАФЫ"
        icon={violationIcon}
        gradientStart="#C24141"
        gradientEnd="#000000"
      />

      {/* Блок переключения между штрафами и статистикой */}
      <div className="flex justify-center gap-4 my-4">
        <button
          className={`px-4 py-2 rounded ${
            view === "violations" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("violations")}
        >
          Штрафы
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "stats" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("stats")}
        >
          Статистика
        </button>
      </div>

      {view === "violations" ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {violations.map((violation, index) => (
            <ViolationCard
              key={index}
              user={violation.user}
              status={violation.status}
              date={violation.date}
              amount={violation.amount}
              description={violation.description}
            />
          ))}
        </div>
      ) : (
        <div className="p-8">
          <DashboardStats stats={statsData} />
        </div>
      )}
    </div>
  );
}

export default ViolationPage;
