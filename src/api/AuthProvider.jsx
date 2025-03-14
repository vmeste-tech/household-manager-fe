import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { login as loginApi } from "./authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
  });

  const login = async (username, password) => {
    // Проверка наличия username и password
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const tokenData = await loginApi(username, password);
    setAuth({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
    });
  };

  const logout = () => {
    setAuth({ accessToken: null, refreshToken: null });
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Валидация пропсов для AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
