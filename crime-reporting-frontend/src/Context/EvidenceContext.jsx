import { createContext, useContext, useEffect, useState } from "react";
import {
  getMyEvidence,
  getAllEvidence,
} from "../api/evidenceApi";
import { useAuth } from "../auth/AuthContext";

import React from "react";

const EvidenceContext = createContext();

export const EvidenceProvider = ({ children }) => {
  const { user } = useAuth();
  const [evidenceListByUser, setEvidenceListByUser] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyEvidence = async () => {
    try {
      setLoading(true);
      const res = await getMyEvidence();
      setEvidenceListByUser(res.data);
    } catch (error) {
      console.error("Failed to fetch my evidence", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEvidence = async () => {
    try {
      const res = await getAllEvidence();
      setEvidenceList(res.data);
    } catch (error) {
      console.error("Failed to fetch all evidence", error);
    }
  };

useEffect(() => {
  if (!user) return; // 🔐 stop on home

  fetchMyEvidence();

    fetchAllEvidence();
}, [user]);

  return (
    <EvidenceContext.Provider
      value={{
        evidenceListByUser,
        evidenceList,
        loading,
        fetchMyEvidence,
        fetchAllEvidence,
      }}
    >
      {children}
    </EvidenceContext.Provider>
  );
};

export const useEvidence = () => useContext(EvidenceContext);
