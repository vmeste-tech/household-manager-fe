import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ column, tasks, users }) => {
  const columnLabels = {
    "To Do": "Запланировано",
    "In Progress": "В процессе",
    Done: "Выполнено",
  };

  return (
    <Droppable droppableId={column}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in"
        >
          <p className="text-xl font-semibold mb-4">{columnLabels[column]}</p>
          <div className="space-y-4">
            {tasks.map((task, index) => {
              const user = users.find((u) => u.id === task.assignedTo);
              return (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <TaskCard task={task} user={user} provided={provided} />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

KanbanColumn.propTypes = {
  column: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string,
      assignedTo: PropTypes.number,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default KanbanColumn;
