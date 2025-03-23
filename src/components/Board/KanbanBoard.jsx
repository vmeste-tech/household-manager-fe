import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Filter from "./Filter";
import KanbanColumn from "./KanbanColumn";
import TasksDefaultApi from "../../generated-task-client-js/src/api/DefaultApi";
import tasksApiClient from "../../api/setupTasksApi";
import apiClient from "../../api/setupApi";
import DefaultApi from "../../generated-client-js/src/api/DefaultApi";

const tasksApi = new TasksDefaultApi(tasksApiClient);
const userApi = new DefaultApi(apiClient);

const columns = ["CREATED", "IN_PROGRESS", "COMPLETED"];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const mapUserData = (user) => {
  return {
    id: user.id, // UUID пользователя
    name: `${user.firstName} ${user.lastName}`, // Имя и фамилия
    avatar:
      user.profilePictureUrl || "https://randomuser.me/api/portraits/men/1.jpg", // Используем заглушку, если аватар отсутствует
  };
};

const fetchTasks = (apartmentId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    tasksApi.getTasks(apartmentId, startDate, endDate, (error, data) => {
      if (error) {
        console.error("Ошибка при получении задач:", error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const fetchUsers = (apartmentId) => {
  return new Promise((resolve, reject) => {
    userApi.getApartmentUsers(apartmentId, (error, data) => {
      if (error) {
        console.error("Ошибка при получении пользователей:", error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const getApartmentId = () => {
  const apartmentId = localStorage.getItem("apartmentId");
  if (!apartmentId) {
    console.warn("Apartment ID не найден в localStorage");
  }
  return apartmentId;
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadTasksAndUsers = async () => {
      try {
        const apartmentId = getApartmentId();
        if (!apartmentId) {
          console.error("Отсутствует apartmentId в localStorage");
          return;
        }

        const today = formatDate(new Date());
        const weekLater = formatDate(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );

        const [taskData, userData] = await Promise.all([
          fetchTasks(apartmentId, today, weekLater),
          fetchUsers(apartmentId),
        ]);

        const mappedUsers = userData.map(mapUserData);

        setTasks(taskData);
        setUsers(mappedUsers);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    loadTasksAndUsers();
  }, []);

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
