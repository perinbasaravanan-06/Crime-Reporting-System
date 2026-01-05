import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllUsers,
  getAllPolice,
  getAllCrimes,
  getAllMissingPersons,
  getAllEvidence,
  approvePolice,
  rejectPolice,
} from "../api/adminApi";
import { useAuth } from "../auth/AuthContext";


const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // ================= USER CONTENT =================
  const { user } = useAuth();
  // ================= USERS =================
  const [userList, setUserList] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  // ================= POLICE =================
  const [policeList, setPoliceList] = useState([]);
  const [policeLoading, setPoliceLoading] = useState(true);

  // ================= DATA =================
  const [crimeList, setCrimeList] = useState([]);
  const [missingList, setMissingList] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);

  // ================= COUNTS =================
  const totalUsers = userList.length;
  const totalCrimes = crimeList.length;
  const totalMissing = missingList.length;
  const totalEvidence = evidenceList.length;

  const getCrimeCountByUser = (userId) =>
    crimeList.filter((c) => c.reportedBy?.userId === userId).length;

  const getEvidenceCountByUser = (userId) =>
    evidenceList.filter((e) => e.uploadedBy?.userId === userId).length;

  const getMissingCountByUser = (userId) =>
    missingList.filter((e) => e.reportedBy?.userId === userId).length;

  // ================= CRIME STATUS FILTERS =================
  const pendingCrimes = crimeList.filter(
    (c) => c.status === "PENDING" || c.status === "CRIME REPORTED"
  );

  const underInvestigationCrimes = crimeList.filter(
    (c) => c.status === "UNDER INVESTIGATION"
  );

  const solvedCrimes = crimeList.filter(
    (c) => c.status === "SOLVED" || c.status === "CLOSED"
  );

  // ================= CRIME COUNTS =================
  const pendingCrimeCount = pendingCrimes.length;
  const underInvestigationCrimeCount = underInvestigationCrimes.length;
  const solvedCrimeCount = solvedCrimes.length;

  // ================= POLICE STATUS FILTERS =================
  const approvedPoliceList = policeList.filter((m) => m.approvalStatus  === "APPROVED");

  const pendingPoliceList = policeList.filter( (m) => m.approvalStatus  === "PENDING");

  const rejectedPoliceList = policeList.filter((m) => m.approvalStatus  === "REJECTED");

  // ================= MISSING STATUS FILTERS =================
  const pendingMissing = missingList.filter((m) => m.status === "SUBMITTED");

  const underInvestigationMissing = missingList.filter(
    (m) => m.status === "UNDER INVESTIGATION"
  );

  const foundMissing = missingList.filter((m) => m.status === "FOUND");

  // ================= MISSING COUNTS =================
  const pendingMissingCount = pendingMissing.length;
  const underInvestigationMissingCount =
    underInvestigationMissing.length;
  const foundMissingCount = foundMissing.length;

  // ================= EVIDENCE STATUS FILTERS =================
  const pendingEvidence = evidenceList.filter(
    (e) => e.status === "PENDING"
  );

  const approvedEvidence = evidenceList.filter(
    (e) => e.status === "APPROVED"
  );

  const rejectedEvidence = evidenceList.filter(
    (e) => e.status === "REJECTED"
  );

  // ================= EVIDENCE COUNTS =================
  const pendingEvidenceCount = pendingEvidence.length;
  const approvedEvidenceCount = approvedEvidence.length;
  const rejectedEvidenceCount = rejectedEvidence.length;

  // ================= FETCHERS =================
  const fetchUsers = async () => {
    setUserLoading(true);
    const res = await getAllUsers();
    setUserList(res.data);
    setUserLoading(false);
  };

  const fetchPolice = async () => {
    setPoliceLoading(true);
    const res = await getAllPolice();
    setPoliceList(res.data);
    setPoliceLoading(false);
  };

  const fetchCrimes = async () => {
    const res = await getAllCrimes();
    setCrimeList(res.data);
  };

  const fetchMissing = async () => {
    const res = await getAllMissingPersons();
    setMissingList(res.data);
  };

  const fetchEvidence = async () => {
    const res = await getAllEvidence();
    setEvidenceList(res.data);
  };

  // ================= POLICE ACTIONS =================
  const approvePoliceHandler = async (id) => {
    console.log(id);
    await approvePolice(id);
    fetchPolice();
    fetchApprovedPolice();
    fetchPendingPolice();
  };

  const rejectPoliceHandler = async (id) => {
    await rejectPolice(id);
    fetchPolice();
    fetchRejectedPolice();
    fetchPendingPolice();
  };

  // ================= INIT =================
  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    fetchUsers();
    fetchPolice();
    fetchCrimes();
    fetchMissing();
    fetchEvidence();
  }, [user]);

  return (
    <AdminContext.Provider
      value={{
        // USERS
        userList,
        userLoading,

        // POLICE
        policeList,
        policeLoading,
        approvedPoliceList,
        pendingPoliceList,
        rejectedPoliceList,
        approvePoliceHandler,
        rejectPoliceHandler,

        // DATA
        crimeList,
        missingList,
        evidenceList,

        // CRIME STATUS LISTS
        pendingCrimes,
        underInvestigationCrimes,
        solvedCrimes,

        // CRIME STATUS COUNTS
        pendingCrimeCount,
        underInvestigationCrimeCount,
        solvedCrimeCount,

        // ================= MISSING =================
        pendingMissing,
        underInvestigationMissing,
        foundMissing,

        pendingMissingCount,
        underInvestigationMissingCount,
        foundMissingCount,

        // ================= EVIDENCE =================
        pendingEvidence,
        approvedEvidence,
        rejectedEvidence,

        pendingEvidenceCount,
        approvedEvidenceCount,
        rejectedEvidenceCount,

        // COUNTS
        totalUsers,
        totalCrimes,
        totalMissing,
        totalEvidence,
        getCrimeCountByUser,
        getEvidenceCountByUser,
        getMissingCountByUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
