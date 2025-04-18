import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/SignInPage";
import SignUp from "./pages/register/SignUpPage";
import Main from "./pages/main/Main";
import TaskPage from "./pages/task/TaskPage";
import RulePage from "./pages/rule/RulePage";
import PenaltyPage from "./pages/penalty/PenaltyPage";
import FinancesPage from "./pages/finance/FinancesPage";
import PurchasesPage from "./pages/purchases/PurchasesPage";
import ApartmentPage from "./pages/apartment/ApartmentPage";
import NoApartmentPage from "./pages/apartment/NoApartmentPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoadingScreen from "./components/Loading/LoadingScreen";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [hasApartment, setHasApartment] = useState(!!localStorage.getItem("apartmentId"));

  useEffect(() => {
    // Проверяем состояние авторизации при загрузке приложения
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");

      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []); // Empty dependency array so this only runs once

  // Функция для проверки, должен ли пользователь иметь доступ к защищенным маршрутам
  const checkAuth = (element, path) => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (!loggedIn) {
      // Store the path the user was trying to access
      sessionStorage.setItem("redirectPath", path);
      return <Navigate to="/signin" />;
    }
    return element;
  };

  // Показываем загрузку только при инициализации
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                // Redirect to the stored path or main if none exists
                <Navigate to={"/main"} />
              ) : (
                <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
              )
            }
          />
          <Route
            path="/signup"
            element={loggedIn ? <Navigate to={"/main"} /> : <SignUp />}
          />
          <Route path="/main" element={checkAuth(<Main />, "/main")} />
          <Route path="/tasks" element={checkAuth(<TaskPage />, "/tasks")} />
          <Route path="/rules" element={checkAuth(<RulePage />, "/rules")} />
          <Route path="/penalties" element={checkAuth(<PenaltyPage />, "/penalties")} />
          <Route path="/finances" element={checkAuth(<FinancesPage />, "/finances")} />
          <Route path="/purchases" element={checkAuth(<PurchasesPage />, "/purchases")} />
          <Route
            path="/apartments"
            element={checkAuth(
              hasApartment ? <ApartmentPage /> : <NoApartmentPage setHasApartment={setHasApartment} />,
              "/apartments"
            )}
          />
          <Route
            path="/notifications"
            element={checkAuth(<NotificationPage />, "/notifications")}
          />
          <Route path="/profile" element={checkAuth(<ProfilePage />, "/profile")} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
