import { useState } from "react";
import KanbanBoard from "../../components/Board/KanbanBoard";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatCardsGrid from "../../components/Tasks/TaskStats";
import CustomButton from "../../components/Universal/CustomButton";
import Heading from "../../components/Universal/Heading";
import CreateTaskModal from "../../components/Modal/CreateTaskModal";

function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCreateTask = (taskData) => {
    console.log("Создание задачи:", taskData);
    // Здесь можно добавить вызов API для создания задачи
    setIsModalOpen(false);
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <KanbanBoard />
        <div className="flex justify-center">
          <CustomButton
            text="+ Добавить задачу"
            variant="filled"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <Heading>Статистика выполнения</Heading>
        <StatCardsGrid cardsData={sampleCardsData} />
      </div>
      {isModalOpen && (
        <CreateTaskModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}

export default TaskPage;
