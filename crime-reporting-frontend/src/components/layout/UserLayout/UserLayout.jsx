import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/Footer/Footer";
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="layout-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
