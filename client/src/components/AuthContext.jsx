import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = (user, userType) => {
    setCurrentUser(user);
    if (userType === "admin") {
      navigate("/admin-dashboard");
    } else if (userType === "student") {
      navigate("/student-dashboard");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
