import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("strapi_token");
    const storedUser = localStorage.getItem("strapi_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const { data } = await axios.post(`${API_BASE}/auth/local`, {
        identifier,
        password,
      });

      if (data.jwt) {
        setToken(data.jwt);
        setUser(data.user);
        localStorage.setItem("strapi_token", data.jwt);
        localStorage.setItem("strapi_user", JSON.stringify(data.user));
        return true; // Login successful
      }
    } catch (err) {
      console.error("Login failed:", err);
      return false; // Login failed
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("strapi_token");
    localStorage.removeItem("strapi_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);