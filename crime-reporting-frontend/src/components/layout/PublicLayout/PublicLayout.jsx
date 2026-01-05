import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/Footer/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
