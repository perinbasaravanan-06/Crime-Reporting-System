import { createContext, useContext, useEffect, useState } from "react";
import { getMyCrimes, getAllCrimes } from "../api/crimeApi";
import React from "react";
import { useAuth } from "../auth/AuthContext";


const CrimeContext = createContext();

export const CrimeProvider = ({ children }) => {
  const { user } = useAuth();
  const [crimesListById, setCrimesListById] = useState([]);
  const [crimesList, setCrimesList] = useState([]);
  const [CrimeListByIdLoading, setCrimeListByIdLoading] = useState(false);
  const [crimeListLoading, setCrimeListLoading] = useState(false);


  const fetchCrimesListById = async () => {
    // JWT FIX: user is now { token, user }

    try {
      setCrimeListByIdLoading(true);
      const res = await getMyCrimes();
      setCrimesListById(res.data);
    } catch (error) {
      console.error("Failed to fetch crimes", error);
    } finally {
      setCrimeListByIdLoading(false);
    }
  };

  const fetchCrimesList = async () => {
    try {
      setCrimeListLoading(true);
      const res = await getAllCrimes();
      setCrimesList(res.data);
    } catch (error) {
      console.log("Failed to fetch all crimes", error);
    } finally {
      setCrimeListLoading(false);
    }
  };

  useEffect(() => {
  if (!user || user.role !== "USER") return; // 🔐 not logged in → stop

  fetchCrimesListById();

  if (user.role === "ADMIN") {
    fetchCrimesList();
  }
}, [user]);

  return (
    <CrimeContext.Provider
      value={{
        crimesListById,
        crimesList,
        CrimeListByIdLoading,
        crimeListLoading,
        fetchCrimesListById,
        fetchCrimesList,
        totalCrimes: crimesList.length,
      }}
    >
      {children}
    </CrimeContext.Provider>
  );
};

// Custom hook
export const useCrime = () => useContext(CrimeContext);
