import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import { taskApi, userApi } from "../../api";
import TaskFilters from "../Tasks/TaskFilters";

const columns = ["CREATED", "IN_PROGRESS", "COMPLETED"];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const mapUserData = (user) => {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    avatar: user.profilePictureUrl || null, // Remove default avatar URL
  };
};

const fetchTasks = (apartmentId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    taskApi.getTasks(apartmentId, startDate, endDate, (error, data) => {
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

const KanbanBoard = ({ userFilter, timeFilter, setUserFilter, setTimeFilter }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadTasksAndUsers = async () => {
      try {
        const apartmentId = getApartmentId();
        if (!apartmentId) {
          console.error("Отсутствует apartmentId в localStorage");
          return;
        }

        const today = formatDate(new Date());
        let endDate;

        switch (timeFilter) {
          case "today":
            endDate = today;
            break;
          case "week":
            endDate = formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
            break;
          case "month":
            endDate = formatDate(
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            );
            break;
          default:
            endDate = formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        }

        const [taskData, userData] = await Promise.all([
          fetchTasks(apartmentId, today, endDate),
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
  }, [timeFilter]);

  const filteredTasks = tasks.filter((task) => {
    if (userFilter !== "all" && task.assignedTo !== userFilter) return false;
    return true;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const movedTask = tasks.find((task) => task.id === draggableId);
    if (!movedTask) return;
    const updatedTask = { ...movedTask, status: destination.droppableId };
    setTasks(
      tasks.map((task) => (task.id === movedTask.id ? updatedTask : task))
    );

    // Here you would typically make an API call to update the task status
    // taskApi.updateTaskStatus(movedTask.id, destination.droppableId, (error, data) => {
    //   if (error) {
    //     console.error("Error updating task status:", error);
    //   }
    // });
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold uppercase tracking-wider text-indigo-800 m-0 p-0">
            Доска задач
          </p>
        </div>

        <TaskFilters
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          users={users}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
KanbanBoard.propTypes = {
  userFilter: PropTypes.string.isRequired,
  timeFilter: PropTypes.string.isRequired,
  setUserFilter: PropTypes.func.isRequired,
  setTimeFilter: PropTypes.func.isRequired,
};

export default KanbanBoard;
