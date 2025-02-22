import PageHeader from "../../components/PageHeader/PageHeader";
import taskIcon from "../../assets/task.svg";

function TaskPage() {
  return (
    <PageHeader
      title="ЗАДАЧИ"
      icon={taskIcon}
      gradientStart="#41A6C2"
      gradientEnd="#000000"
    />
  );
}

export default TaskPage;
