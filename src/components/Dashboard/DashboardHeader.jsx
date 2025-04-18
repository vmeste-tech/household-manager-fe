import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DashboardHeader = ({ avatarUrl }) => {
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/main");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  const handleLogout = () => {
    // Clear auth tokens and apartmentId from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("apartmentId");
    // Redirect to signin page
    navigate("/signin");
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

  // Default SVG avatar if no avatar is provided
  const defaultAvatarSvg = (
    <svg
      className="w-10 h-10 rounded-full bg-blue-100 p-2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="#6366F1"
      />
      <path
        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
        fill="#6366F1"
      />
    </svg>
  );

  return (
    <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
        <div
          onClick={handleTitleClick}
          className="text-xl font-bold text-blue-900 cursor-pointer"
        >
          Vmeste<span className="text-indigo-800">.tech</span>
        </div>
        <div className="flex items-center space-x-4">
          <span
            ref={notificationRef}
            onClick={handleNotificationClick}
            className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block"
          >
            уведомления
          </span>
          
          {avatarUrl ? (
            <img
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 object-cover"
              src={avatarUrl}
              alt="Profile"
            />
          ) : (
            <div
              onClick={handleProfileClick}
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              {defaultAvatarSvg}
            </div>
          )}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-indigo-800 transition-transform duration-300 hover:scale-110"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

DashboardHeader.propTypes = {
  avatarUrl: PropTypes.string,
};

export default DashboardHeader;
