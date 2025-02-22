import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/register/Signup";
import Main from "./pages/main/Main";
import TaskPage from "./pages/task/TaskPage";
import RulePage from "./pages/rule/RulePage";

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
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/rules" element={<RulePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
