import { useState, useEffect, useRef } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import StatCardsGrid from "../../components/Tasks/TaskStats";
import CustomButton from "../../components/Universal/CustomButton";
import Heading from "../../components/Universal/Heading";
import CreateTaskModal from "../../components/Modal/CreateTaskModal";
import TaskList from "../../components/Tasks/TaskList";
import { taskApi, userApi, ruleApi } from "../../api";

function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFilter, setUserFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      setError("");
      try {
        const apartmentId = localStorage.getItem("apartmentId");
        if (!apartmentId) {
          console.error("Apartment ID not found in localStorage");
          setError("ID квартиры не найден");
          setLoading(false);
          return;
        }

        await new Promise((resolve) => {
          userApi.getApartmentUsers(apartmentId, (error, data) => {
            if (error) {
              console.error("Error fetching users:", error);
              setError("Ошибка загрузки пользователей");
            } else {
              setUsers(data || []);
            }
            resolve();
          });
        });

        await new Promise((resolve) => {
          ruleApi.getApartmentRules(apartmentId, (error, data) => {
            if (error) {
              console.error("Error fetching rules:", error);
              setError("Ошибка загрузки правил");
            } else {
              const activeRules = (data || []).filter(rule => rule.status === "ACCEPTED");
              setRules(activeRules);
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
            setError("Ошибка загрузки задач");
            setLoading(false);
          } else {
            taskApi.getOverdueTasks(apartmentId, (overdueError, overdueData) => {
              if (overdueError) {
                console.error("Error fetching overdue tasks:", overdueError);
                setTasks(data || []);
              } else {
                // Mark overdue tasks with OVERDUE status
                const overdueTasksWithStatus = (overdueData || []).map(task => ({
                  ...task,
                  status: "OVERDUE"
                }));
                
                // Filter out tasks that are already in the overdue list
                const overdueIds = new Set(overdueTasksWithStatus.map(task => task.id));
                const nonDuplicateTasks = (data || []).filter(task => !overdueIds.has(task.id));
                
                setTasks([...overdueTasksWithStatus, ...nonDuplicateTasks]);
              }
              setLoading(false);
            });
          }
        });
      } catch (error) {
        console.error("Error in fetch data:", error);
        setError("Ошибка загрузки данных");
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
    setError("");

    if (!taskData.ruleId) {
      setError("Необходимо выбрать правило для задачи");
      return;
    }

    if (!taskData.assignedTo) {
      setError("Необходимо выбрать исполнителя задачи");
      return;
    }

    taskApi.create({
      ...taskData,
      status: "CREATED"
    }, (error, data) => {
      if (error) {
        console.error("Error creating task:", error);
        setError("Ошибка создания задачи: " + (error.message || "неизвестная ошибка"));
      } else {
        setTasks(prevTasks => [...prevTasks, data]);
        setIsModalOpen(false);
      }
    });
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
    if (userFilter === "all") return true;
    if (!task.assignedTo) return false;
    return task.assignedTo === userFilter;
  });

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pb-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
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
          rules={rules}
          error={error}
        />
      )}
    </div>
  );
}

export default TaskPage;
