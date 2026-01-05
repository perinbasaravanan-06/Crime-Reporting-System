// auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { toastSuccess, toastError } from "../utils/toast";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // 🔁 Restore on refresh
//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("authUser");
//     const storedToken = sessionStorage.getItem("authToken");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (data) => {
//   setUser(data.user);
//   setToken(data.token);

//   sessionStorage.setItem("authUser", JSON.stringify(data.user));
//   sessionStorage.setItem("authToken", data.token);
// };
//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     sessionStorage.removeItem("authUser");
//     sessionStorage.removeItem("authToken");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 NEW

  const login = (data) => {
  setUser(data.user);
  setToken(data.token);

  sessionStorage.setItem("authUser", JSON.stringify(data.user));
  sessionStorage.setItem("authToken", data.token);
};
  const logout = () => {
    setUser(null);
    setToken(null);

    sessionStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem("authUser");
    const storedToken = sessionStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false); // 👈 DONE restoring
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading,login ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);