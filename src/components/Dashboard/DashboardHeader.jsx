import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/main");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationRef.current) {
        notificationRef.current.classList.add("scale-110");
        setTimeout(() => {
          notificationRef.current.classList.remove("scale-110");
        }, 200);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
        <div
          onClick={handleTitleClick}
          className="text-xl font-bold text-blue-900 cursor-pointer"
        >
          Vmeste<span className="text-indigo-800">.tech</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
            поиск
          </span>
          <span
            ref={notificationRef}
            className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block"
          >
            уведомления
          </span>
          <img
            className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
            src="https://i.pinimg.com/736x/bd/d9/aa/bdd9aaee8c129b1d0a7180512c6f7ae5.jpg"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
