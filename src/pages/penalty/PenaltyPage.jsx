import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import PenaltyTable from "../../components/Penalty/PenaltyTable";
import StatCardsGrid from "../../components/TaskStats/TaskStats";
import Heading from "../../components/Universal/Heading";

function PenaltyPage() {
  const sampleCardsData = [
    {
      title: "Всего штрафов",
      value: "53",
      changeText: "3 добавлено",
      isIncrease: false,
    },
    {
      title: "Оплаченные штрафы",
      value: "51",
      changeText: "2 новых оплачено",
      isIncrease: true,
    },
    {
      title: "Неоплаченные штрафы",
      value: "4",
      changeText: "1 новый штраф",
      isIncrease: false,
    },
    {
      title: "Общая сумма штрафов",
      value: "12400₽",
      changeText: "новые штрафы на 400₽",
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
        <PenaltyTable />
      </div>
    </div>
  );
}

export default PenaltyPage;
