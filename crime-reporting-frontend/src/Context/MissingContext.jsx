import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllMissingPersonsById,
  getAllMissingPersons,
} from "../api/missingApi";
import React from "react";
import { useAuth } from "../auth/AuthContext";


const MissingPersonsContext = createContext();

export const MissingPersonsProvider = ({ children }) => {
  const { user } = useAuth();
  const [missingPersonsListById, setMissingPersonsListById] = useState([]);
  const [missingPersonsList, setMissingPersonsList] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchMissingPersonsById = async () => {

    try {
      setLoading(true);
      const res = await getAllMissingPersonsById();
      setMissingPersonsListById(res.data);
    } catch (error) {
      console.error("Failed to fetch missing persons by user", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMissingPersons = async () => {
    try {
      const res = await getAllMissingPersons();
      setMissingPersonsList(res.data);
    } catch (error) {
      console.error("Failed to fetch all missing persons", error);
    }
  };

useEffect(() => {
  if (!user || user.role !== "USER") return;

  fetchMissingPersonsById();

  if (user.role === "ADMIN") {
    fetchAllMissingPersons();
  }
}, [user]);


  return (
    <MissingPersonsContext.Provider
      value={{
        missingPersonsList,
        missingPersonsListById,
        loading,
        fetchMissingPersonsById,
      }}
    >
      {children}
    </MissingPersonsContext.Provider>
  );
};

export const useMissing = () => useContext(MissingPersonsContext);
