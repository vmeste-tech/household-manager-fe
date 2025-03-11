import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Filter from "./Filter";
import KanbanColumn from "./KanbanColumn";

const users = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    name: "Bob Johnson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Дизайн интерфейса",
    description: "Создать каркас макетов",
    status: "To Do",
    assignedTo: 1,
    dueDate: "2023-06-30",
  },
  {
    id: 2,
    title: "Реализовать API",
    description: "Настроить конечные точки",
    status: "In Progress",
    assignedTo: 2,
    dueDate: "2023-07-15",
  },
  {
    id: 3,
    title: "Написать тесты",
    description: "Модульные и интеграционные тесты",
    status: "Done",
    assignedTo: 3,
    dueDate: "2023-06-25",
  },
  {
    id: 4,
    title: "Рефакторинг кода",
    description: "Улучшить производительность",
    status: "To Do",
    assignedTo: 1,
    dueDate: "2023-07-10",
  },
  {
    id: 5,
    title: "Деплой на staging",
    description: "Подготовка к тестированию",
    status: "In Progress",
    assignedTo: 2,
    dueDate: "2023-07-20",
  },
];

const columns = ["To Do", "In Progress", "Done"];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.assignedTo === parseInt(filter, 10));

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const movedTask = tasks.find((task) => task.id.toString() === draggableId);
    if (!movedTask) return;
    const updatedTask = { ...movedTask, status: destination.droppableId };
    setTasks(
      tasks.map((task) => (task.id === movedTask.id ? updatedTask : task))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-3xl font-bold text-blue-900">Доска задач</p>
        <Filter filter={filter} onChange={handleFilterChange} users={users} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column
            );
            return (
              <KanbanColumn
                key={column}
                column={column}
                tasks={columnTasks}
                users={users}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
