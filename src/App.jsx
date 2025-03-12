import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

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
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/rules" element={<RulePage />} />
          <Route path="/penalties" element={<PenaltyPage />} />
          <Route path="/finances" element={<FinancesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
