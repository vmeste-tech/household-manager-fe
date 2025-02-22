import PageHeader from "../../components/PageHeader/PageHeader";
import taskIcon from "../../assets/task.svg";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./TaskPage.css";

function TaskPage() {
  // Обработчик клика по карточке (для примера)
  const handleCardClick = (title) => {
    console.log(`Карточка "${title}" нажата!`);
  };

  // Генерируем массив из 100 задач
  const tasks = Array.from({ length: 100 }, (_, i) => ({
    title: `Задача №${i + 1}`,
    executor: `Исполнитель ${i + 1}`,
    deadline: `2024-01-${(i % 30) + 1}`, // Для примера, подставляем день месяца
    status: "Назначена",
  }));

  // Обработчик клика на кнопку "Добавить задачу"
  const handleAddTask = () => {
    console.log("Нажата кнопка: Добавить задачу");
    // Здесь ваша логика: открыть модальное окно, перейти на форму и т.д.
  };

  return (
    <div className="task-page">
      <PageHeader
        title="ЗАДАЧИ"
        icon={taskIcon}
        gradientStart="#41A6C2"
        gradientEnd="#000000"
      />

      <div className="task-cards">
        {tasks.map((task, index) => (
          <TaskCard
            key={index} // Ключ для списка
            title={task.title}
            executor={task.executor}
            deadline={task.deadline}
            status={task.status}
            onCardClick={() => handleCardClick(task.title)}
          />
        ))}
      </div>

      <button className="add-task-button" onClick={handleAddTask}>
        + Добавить задачу
      </button>
    </div>
  );
}

export default TaskPage;
