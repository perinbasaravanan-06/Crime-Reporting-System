import React from "react";
import "./toast.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
/* ================= TOAST IMPORTS ================= */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./Context/ThemeContext";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/public/Home/Home.jsx";
import Contact from "./components/common/Contact/Contact.jsx";

/* ================= LOGIN & REGISTER ================= */
import LoginUser from "./pages/public/Login/LoginUser/LoginUser.jsx";
import LoginPolice from "./pages/public/Login/LoginPolice/LoginPolice.jsx";
import RegisterUser from "./pages/public/Register/RegisterUser/RegisterUser.jsx";
import RegisterPolice from "./pages/public/Register/RegisterPolice/RegisterPolice.jsx";

/* ================= LAYOUTS ================= */
import PublicLayout from "./components/layout/PublicLayout/PublicLayout.jsx";
import UserLayout from "./components/layout/UserLayout/UserLayout.jsx";
import PoliceLayout from "./components/layout/PoliceLayout/PoliceLayout.jsx";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout.jsx";

/* ================= USER PAGES ================= */
import UserDashboard from "./pages/user/UserDashboard/UserDashboard.jsx";
import ReportCrime from "./pages/user/ReportCrime/ReportCrime.jsx";
import ReportMissing from "./pages/user/ReportMissing/ReportMissing.jsx";
import MyReports from "./pages/user/MyReports/MyReports.jsx";
import SubmitEvidence from "./pages/user/SubmitEvidence/SubmitEvidence.jsx";

/* ================= POLICE PAGES ================= */
import PoliceDashboard from "./pages/police/Dashboard/PoliceDashboard.jsx";
import PoliceCrimeCases from "./pages/police/CrimeCases/PoliceCrimeCases.jsx";
import PoliceMissingCases from "./pages/police/MissingCases/PoliceMissingCases.jsx";
import PoliceEvidence from "./pages/police/Evidence/PoliceEvidence.jsx";
import PoliceMyReports from "./pages/police/MyReports/PoliceMyReports.jsx";

/* ================= ADMIN PAGES ================= */
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import PoliceOverview from "./pages/Admin/Police/PoliceOverview.jsx";
import PoliceRequests from "./pages/Admin/Police/PoliceRequests.jsx";
import PoliceTotal from "./pages/Admin/Police/PoliceTotal.jsx";
import PoliceApproved from "./pages/Admin/Police/PoliceApproved.jsx";
import PoliceRejected from "./pages/Admin/Police/PoliceRejected.jsx";
import UserManagement from "./pages/Admin/UserManagement/UserManagement.jsx";
import CrimeCases from "./pages/Admin/CrimeCases/CrimeCases.jsx";
import MissingCases from "./pages/Admin/MissingCases/MissingCases.jsx";
import Evidence from "./pages/Admin/Evidence/Evidence.jsx";

/* ================= JWT PROTECTED ROUTE ================= */
const ProtectedRoute = ({ children, role }) => {
  const { user, token, loading } = useAuth();

  //  Wait until auth is restored
  if (loading) return null;

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  //  Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  //  Stay on SAME page
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/login/police" element={<LoginPolice />} />
        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/register/police" element={<RegisterPolice />} />

        {/* ================= USER ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="report-crime" element={<ReportCrime />} />
          <Route path="report-missing" element={<ReportMissing />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="submit-evidence" element={<SubmitEvidence />} />
        </Route>

        {/* ================= POLICE ================= */}
        <Route
          path="/police"
          element={
            <ProtectedRoute role="POLICE">
              <PoliceLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<PoliceDashboard />} />
          <Route path="crime-cases" element={<PoliceCrimeCases />} />
          <Route path="missing-cases" element={<PoliceMissingCases />} />
          <Route path="evidence" element={<PoliceEvidence />} />
          <Route path="my-reports" element={<PoliceMyReports />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="police" element={<PoliceOverview />} />
          <Route path="police/total" element={<PoliceTotal />} />
          <Route path="police/requests" element={<PoliceRequests />} />
          <Route path="police/approved" element={<PoliceApproved />} />
          <Route path="police/rejected" element={<PoliceRejected />} />
          <Route path="crimes" element={<CrimeCases />} />
          <Route path="missing-cases" element={<MissingCases />} />
          <Route path="evidence" element={<Evidence />} />
        </Route>
      </Routes>
      {/* ✅ GLOBAL TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        pauseOnHover={false}
        draggable
        closeButton={false}
      />
    </ThemeProvider>
  );
}

export default App;
