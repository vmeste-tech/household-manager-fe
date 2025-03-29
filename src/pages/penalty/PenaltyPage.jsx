import { useState, useEffect } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import PenaltyTable from "../../components/Penalty/PenaltyTable";
import StatCardsGrid from "../../components/Tasks/TaskStats";
import Heading from "../../components/Universal/Heading";
import { penaltyApi } from "../../api";

const PenaltyPage = () => {
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apartmentId = localStorage.getItem("apartmentId");

    if (!apartmentId) {
      console.error("Apartment ID not found in localStorage");
      setLoading(false);
      return;
    }

    penaltyApi.getApartmentPenalties(apartmentId, {}, (error, data) => {
      setLoading(false);
      if (error) {
        console.error("Ошибка получения штрафов:", error);
      } else {
        setPenalties(data);
      }
    });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  const sampleCardsData = [
    {
      title: "Всего штрафов",
      value: penalties.length,
      changeText: `${penalties.length} штрафов на текущий момент`,
      isIncrease: false,
    },
    {
      title: "Оплаченные штрафы",
      value: penalties.filter((p) => p.status === "PAID").length,
      changeText: "Оплачено",
      isIncrease: true,
    },
    {
      title: "Неоплаченные штрафы",
      value: penalties.filter((p) => p.status === "UNPAID").length,
      changeText: "Неоплачено",
      isIncrease: false,
    },
    {
      title: "Общая сумма штрафов",
      value: `${penalties.reduce((acc, p) => acc + p.fineAmount, 0)}₽`,
      changeText: "Общая сумма",
      isIncrease: true,
    },
  ];

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <Heading>Статистика выполнения</Heading>
        <StatCardsGrid cardsData={sampleCardsData} />
        <Heading>История штрафов</Heading>
        <PenaltyTable penalties={penalties} />
      </div>
    </div>
  );
};

export default PenaltyPage;
