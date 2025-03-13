import KanbanBoard from "../../components/Board/KanbanBoard";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatCardsGrid from "../../components/TaskStats/TaskStats";
import Heading from "../../components/Universal/Heading";

function TaskPage() {
  const sampleCardsData = [
    {
      title: "Всего задач",
      value: "53",
      changeText: "3 добавлено",
      isIncrease: true,
    },
    {
      title: "Выполнено",
      value: "12",
      changeText: "2 выполнено",
      isIncrease: true,
    },
    {
      title: "Просрочено",
      value: "9",
      changeText: "3 просрочено",
      isIncrease: false,
    },
  ];

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <KanbanBoard />
        <Heading>Статистика выполнения</Heading>
        <StatCardsGrid cardsData={sampleCardsData} />
      </div>
    </div>
  );
}

export default TaskPage;
