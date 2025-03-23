import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Filter from "./Filter";
import KanbanColumn from "./KanbanColumn";

const users = [
  {
    id: "1b65c1f0-3b1d-4a90-a3f3-927a89a9e1a1",
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2d65c1f0-4c2d-4a90-a3f3-927a89a9e1a2",
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "3f85c1f0-5d3e-4a90-a3f3-927a89a9e1a3",
    name: "Bob Johnson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const initialTasks = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    title: "Дизайн интерфейса",
    description: "Создать каркас макетов",
    status: "To Do",
    assignedTo: "1b65c1f0-3b1d-4a90-a3f3-927a89a9e1a1",
    scheduledAt: "2023-06-30T10:00:00Z",
    apartmentId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    ruleId: "3r4t5y6u-7i8o-9p0q-1a2s-3d4f5g6h7j8k",
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    title: "Реализовать API",
    description: "Настроить конечные точки",
    status: "In Progress",
    assignedTo: "2d65c1f0-4c2d-4a90-a3f3-927a89a9e1a2",
    scheduledAt: "2023-07-15T15:30:00Z",
    apartmentId: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    ruleId: "4u5i6o7p-8q9r-0s1d-2f3g-4h5j6k7l8m9n",
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    title: "Написать тесты",
    description: "Модульные и интеграционные тесты",
    status: "Done",
    assignedTo: "3f85c1f0-5d3e-4a90-a3f3-927a89a9e1a3",
    scheduledAt: "2023-06-25T12:45:00Z",
    apartmentId: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
    ruleId: "5y6u7i8o-9p0q-1a2s-3d4f-5g6h7j8k9l0m",
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    title: "Рефакторинг кода",
    description: "Улучшить производительность",
    status: "To Do",
    assignedTo: "1b65c1f0-3b1d-4a90-a3f3-927a89a9e1a1",
    scheduledAt: "2023-07-10T08:00:00Z",
    apartmentId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    ruleId: "6j7k8l9m-0n1b-2v3c-4x5z-6w7e8r9t0y1u",
  },
  {
    id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    title: "Деплой на staging",
    description: "Подготовка к тестированию",
    status: "In Progress",
    assignedTo: "2d65c1f0-4c2d-4a90-a3f3-927a89a9e1a2",
    scheduledAt: "2023-07-20T17:00:00Z",
    apartmentId: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    ruleId: "7q8r9s0t-1u2v-3w4x-5y6z-7a8b9c0d1e2f",
  },
];

const columns = ["To Do", "In Progress", "Done"];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.assignedTo === filter);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const movedTask = tasks.find((task) => task.id === draggableId);
    if (!movedTask) return;
    const updatedTask = { ...movedTask, status: destination.droppableId };
    setTasks(
      tasks.map((task) => (task.id === movedTask.id ? updatedTask : task))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xl font-bold uppercase tracking-wider text-indigo-800 m-0 p-0">
          Доска задач
        </p>
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
