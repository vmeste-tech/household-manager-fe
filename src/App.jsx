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
  const [hasApartment, setHasApartment] = useState(null); // null означает "загрузка"

  useEffect(() => {
    // Проверяем состояние авторизации при загрузке приложения
    const token = localStorage.getItem("access_token");
    if (token) {
      setLoggedIn(true);

      // Здесь должен быть запрос к API для проверки наличия квартиры
      // Имитация API-запроса
      setTimeout(() => {
        // В реальном приложении здесь должен быть запрос к API
        const hasApt = localStorage.getItem("apartmentId") !== null;
        setHasApartment(hasApt);
      }, 500);
    } else {
      setLoggedIn(false);
      setHasApartment(false);
    }
  }, []);

  // Функция для проверки, должен ли пользователь иметь доступ к защищенным маршрутам
  const checkAuth = (element) => {
    if (!loggedIn) {
      return <Navigate to="/signin" />;
    }
    return element;
  };

  // Отображаем загрузку, пока не определили, есть ли у пользователя квартира
  if (loggedIn && hasApartment === null) {
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
                <Navigate to="/main" />
              ) : (
                <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
              )
            }
          />
          <Route
            path="/signup"
            element={loggedIn ? <Navigate to="/main" /> : <SignUp />}
          />
          <Route path="/main" element={checkAuth(<Main />)} />
          <Route path="/tasks" element={checkAuth(<TaskPage />)} />
          <Route path="/rules" element={checkAuth(<RulePage />)} />
          <Route path="/penalties" element={checkAuth(<PenaltyPage />)} />
          <Route path="/finances" element={checkAuth(<FinancesPage />)} />
          <Route path="/purchases" element={checkAuth(<PurchasesPage />)} />
          <Route
            path="/apartments"
            element={checkAuth(
              hasApartment ? <ApartmentPage /> : <NoApartmentPage />
            )}
          />
          <Route
            path="/notifications"
            element={checkAuth(<NotificationPage />)}
          />
          <Route path="/profile" element={checkAuth(<ProfilePage />)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
