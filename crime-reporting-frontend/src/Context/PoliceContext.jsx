import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getPoliceCrimes,
  getPoliceMissing,
  getPoliceEvidence,
} from "../api/policeApi";
import { useAuth } from "../auth/AuthContext";


const PoliceContext = createContext();

export const PoliceProvider = ({ children }) => {
  const { user } = useAuth();
  const [crimeCases, setCrimeCases] = useState([]);
  const [missingCases, setMissingCases] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPoliceData = async () => {

    try {
      setLoading(true);

      const [crimeRes, missingRes, evidenceRes] = await Promise.all([
        getPoliceCrimes(),
        getPoliceMissing(),
        getPoliceEvidence(),
      ]);

      setCrimeCases(crimeRes.data || []);
      setMissingCases(missingRes.data || []);
      setEvidenceList(evidenceRes.data || []);
    } catch (err) {
      console.error("Failed to load police data", err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (!user || user.role !== "POLICE") return;

  fetchPoliceData();
}, [user]);


  return (
    <PoliceContext.Provider
      value={{
        crimeCases,
        missingCases,
        evidenceList,
        loading,
        fetchPoliceData,
      }}
    >
      {children}
    </PoliceContext.Provider>
  );
};

export const usePolice = () => useContext(PoliceContext);
