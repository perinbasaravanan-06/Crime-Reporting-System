import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/Footer/Footer";
import "./PoliceLayout.css";

const PoliceLayout = () => {
  return (
    <>
      <Navbar />
      <main className="layout-container police-layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PoliceLayout;
