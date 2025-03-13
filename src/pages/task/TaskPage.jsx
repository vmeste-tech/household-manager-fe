import KanbanBoard from "../../components/Board/KanbanBoard";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatCardsGrid from "../../components/Tasks/TaskStats";
import CustomButton from "../../components/Universal/CustomButton";
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
        <div className="flex justify-center">
          <CustomButton text="+ Добавить задачу" variant="filled" />
        </div>
        <Heading>Статистика выполнения</Heading>
        <StatCardsGrid cardsData={sampleCardsData} />
      </div>
    </div>
  );
}

export default TaskPage;
