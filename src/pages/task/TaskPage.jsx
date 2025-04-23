import { useState, useEffect } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatCardsGrid from "../../components/Tasks/TaskStats";
import CustomButton from "../../components/Universal/CustomButton";
import Heading from "../../components/Universal/Heading";
import CreateTaskModal from "../../components/Modal/CreateTaskModal";
import TaskList from "../../components/Tasks/TaskList";
import { taskApi, userApi } from "../../api";

function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFilter, setUserFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks and users data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apartmentId = localStorage.getItem("apartmentId");
        if (!apartmentId) {
          console.error("Apartment ID not found in localStorage");
          setLoading(false);
          return;
        }

        // Fetch users first
        await new Promise((resolve) => {
          userApi.getApartmentUsers(apartmentId, (error, data) => {
            if (error) {
              console.error("Error fetching users:", error);
            } else {
              setUsers(data || []);
            }
            resolve();
          });
        });

        // Then fetch tasks
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
            endDate = formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
            break;
          default:
            endDate = formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        }

        taskApi.getTasks(apartmentId, today, endDate, (error, data) => {
          if (error) {
            console.error("Error fetching tasks:", error);
          } else {
            setTasks(data || []);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Error in fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [timeFilter]);

  // Format date helper
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Sample card data for statistics
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
    // Call the API to create a task
    taskApi.create({
      ...taskData,
      status: "CREATED"
    }, (error, data) => {
      if (error) {
        console.error("Error creating task:", error);
      } else {
        // Refresh the task list
        setTasks(prevTasks => [...prevTasks, data]);
      }
    });
    setIsModalOpen(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    taskApi.changeStatus(taskId, newStatus, (error) => {
      if (error) {
        console.error("Error updating task status:", error);
      } else {
        // Update the task in the local state
        setTasks(prevTasks =>
          prevTasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    });
  };

  // Create a mapping of user IDs to user data
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = {
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.profilePictureUrl || null
    };
    return acc;
  }, {});

  // Enrich tasks with user data
  const enrichedTasks = tasks.map(task => {
    const assignedUser = task.assignedTo ? userMap[task.assignedTo] : null;
    return {
      ...task,
      assignedUserInfo: assignedUser || { name: "Не назначено", avatar: null }
    };
  });

  // Filter tasks based on userFilter
  const filteredTasks = enrichedTasks.filter(task => {
    if (userFilter !== "all" && task.assignedTo !== userFilter) return false;
    return true;
  });

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pb-8">
        <TaskList 
          tasks={filteredTasks}
          userFilter={userFilter}
          timeFilter={timeFilter}
          setUserFilter={setUserFilter}
          setTimeFilter={setTimeFilter}
          loading={loading}
          onStatusChange={handleStatusChange}
          users={users}
        />
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
          users={users}
        />
      )}
    </div>
  );
}

export default TaskPage;
