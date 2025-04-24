import { useState, useEffect, useRef } from "react";
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
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    overdue: 0
  });
  const prevStatsRef = useRef({
    total: 0,
    completed: 0,
    overdue: 0
  });

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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (tasks.length === 0) return;

    const prevStats = {
      total: taskStats.total,
      completed: taskStats.completed,
      overdue: taskStats.overdue
    };
    prevStatsRef.current = prevStats;

    const today = new Date();
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === "COMPLETED").length;
    const overdue = tasks.filter(task => {
      const deadline = new Date(task.deadline);
      return deadline < today && task.status !== "COMPLETED";
    }).length;

    setTaskStats({
      total,
      completed,
      overdue
    });
  }, [tasks]);

  const getCardsData = () => {
    const totalDiff = taskStats.total - prevStatsRef.current.total;
    const completedDiff = taskStats.completed - prevStatsRef.current.completed;
    const overdueDiff = taskStats.overdue - prevStatsRef.current.overdue;

    return [
      {
        title: "Всего задач",
        value: taskStats.total.toString(),
        changeText: `${Math.abs(totalDiff)} ${totalDiff >= 0 ? "добавлено" : "удалено"}`,
        isIncrease: totalDiff >= 0,
      },
      {
        title: "Выполнено",
        value: taskStats.completed.toString(),
        changeText: `${Math.abs(completedDiff)} выполнено`,
        isIncrease: completedDiff >= 0,
      },
      {
        title: "Просрочено",
        value: taskStats.overdue.toString(),
        changeText: `${Math.abs(overdueDiff)} просрочено`,
        isIncrease: overdueDiff <= 0,
      },
    ];
  };

  const handleCreateTask = (taskData) => {
    console.log("Создание задачи:", taskData);
    taskApi.create({
      ...taskData,
      status: "CREATED"
    }, (error, data) => {
      if (error) {
        console.error("Error creating task:", error);
      } else {
        setTasks(prevTasks => [...prevTasks, data]);
      }
    });
    setIsModalOpen(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const currentTask = tasks.find(task => task.id === taskId);
    
    if (!currentTask) {
      console.error("Task not found:", taskId);
      return;
    }
    
    const taskDto = {
      ...currentTask,
      status: newStatus
    };
    
    taskApi.changeStatus(taskDto, (error, data) => {
      if (error) {
        console.error("Error updating task status:", error);
      } else {
        setTasks(prevTasks =>
          prevTasks.map(task => 
            task.id === data.taskId ? { ...task, status: data.status } : task
          )
        );
      }
    });
  };

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = {
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.profilePictureUrl || null
    };
    return acc;
  }, {});

  const enrichedTasks = tasks.map(task => {
    const assignedUser = task.assignedTo ? userMap[task.assignedTo] : null;
    return {
      ...task,
      assignedUserInfo: assignedUser || { name: "Не назначено", avatar: null }
    };
  });

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
        <StatCardsGrid cardsData={getCardsData()} />
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
