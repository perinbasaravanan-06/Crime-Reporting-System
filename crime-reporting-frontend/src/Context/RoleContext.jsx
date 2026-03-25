import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [loginRole, setLoginRole] = useState("USER");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Load saved role on app start
  useEffect(() => {
    const savedRole = localStorage.getItem("loginRole");
    if (savedRole) {
      setLoginRole(savedRole);
    }
  }, []);

  const updateRole = (role) => {
    setLoginRole(role);
    localStorage.setItem("loginRole", role);
  };

  return (
    <RoleContext.Provider value={{ loginRole, updateRole ,BASE_URL}}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
