import InboxCard from "./InboxCard";
import TasksCard from "./TasksCard";
import WelcomeCard from "./WelcomeCard";

const MainContent = () => {
  return (
    <main className="flex-1 p-4">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <WelcomeCard />
        <InboxCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TasksCard />
        <div
          className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="text-xl font-bold text-indigo-800">Stats Card 2</h3>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-xl font-bold text-indigo-800">Stats Card 3</h3>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-xl font-bold text-indigo-800">Stats Card 3</h3>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-xl font-bold text-indigo-800">Stats Card 3</h3>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-xl font-bold text-indigo-800">Stats Card 3</h3>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
