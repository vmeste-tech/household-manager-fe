import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { AuthProvider } from "./api/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/rules" element={<RulePage />} />
            <Route path="/penalties" element={<PenaltyPage />} />
            <Route path="/finances" element={<FinancesPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/apartments" element={<ApartmentPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
