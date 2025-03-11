import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaUser, FaFilter } from "react-icons/fa";

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
    title: "Design UI",
    description: "Create wireframes",
    status: "To Do",
    assignedTo: 1,
    dueDate: "2023-06-30",
  },
  {
    id: 2,
    title: "Implement API",
    description: "Set up endpoints",
    status: "In Progress",
    assignedTo: 2,
    dueDate: "2023-07-15",
  },
  {
    id: 3,
    title: "Write tests",
    description: "Unit and integration tests",
    status: "Done",
    assignedTo: 3,
    dueDate: "2023-06-25",
  },
  {
    id: 4,
    title: "Refactor code",
    description: "Improve performance",
    status: "To Do",
    assignedTo: 1,
    dueDate: "2023-07-10",
  },
  {
    id: 5,
    title: "Deploy to staging",
    description: "Prepare for QA",
    status: "In Progress",
    assignedTo: 2,
    dueDate: "2023-07-20",
  },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const columns = ["To Do", "In Progress", "Done"];

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.assignedTo === parseInt(filter));

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDragEnd = (result) => {
    // If dropped outside a droppable area, do nothing.
    if (!result.destination) return;

    const { draggableId, destination } = result;
    // Find the task by id (convert draggableId from string to number)
    const movedTask = tasks.find((task) => task.id.toString() === draggableId);
    if (!movedTask) return;

    // Update the task's status to the destination droppable's id (which is the column name)
    const updatedTask = { ...movedTask, status: destination.droppableId };

    // Update the state with the updated task
    const newTasks = tasks.map((task) =>
      task.id === movedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={handleFilterChange}
            aria-label="Filter tasks by user"
          >
            <option value="all">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaFilter className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  className="bg-gray-100 p-4 rounded-lg"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-xl font-semibold mb-4">{column}</h2>
                  <div className="space-y-4">
                    {filteredTasks
                      .filter((task) => task.status === column)
                      .map((task, index) => {
                        const user = users.find(
                          (u) => u.id === task.assignedTo
                        );
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                tabIndex="0"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-lg font-semibold">
                                    {task.title}
                                  </h3>
                                  {user ? (
                                    <img
                                      src={user.avatar}
                                      alt={user.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  ) : (
                                    <FaUser className="w-8 h-8 text-gray-400" />
                                  )}
                                </div>
                                <p className="text-gray-600 mb-2">
                                  {task.description}
                                </p>
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>Due: {task.dueDate}</span>
                                  <span>{user ? user.name : "Unassigned"}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
