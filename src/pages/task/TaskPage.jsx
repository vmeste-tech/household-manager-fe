import KanbanBoard from "../../components/Board/KanbanBoard";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import TaskStats from "../../components/TaskStats/TaskStats";

function TaskPage() {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <KanbanBoard />
        <TaskStats />
      </div>
    </div>
  );
}

export default TaskPage;
