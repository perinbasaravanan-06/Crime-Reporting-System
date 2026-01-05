import { AdminProvider } from "../../../Context/AdminContext";
import React from "react";
import Navbar from "../../common/Navbar/Navbar";
import AdminNavBar from "../../admin/AdminNavBar/AdminNavBar";
import { Outlet } from 'react-router-dom'
import Footer from "../../common/Footer/Footer";

const AdminLayout = () => {
  return (
    <AdminProvider>
      <Navbar />
      <AdminNavBar />
      <Outlet />
      <Footer />
    </AdminProvider>
  );
};

export default AdminLayout;
 