import React from "react";
import "./UserManagement.css";
import UserOverview from "./UserOverview.jsx";
import UserTable from "./UserTable.jsx";

const UserManagement = () => {
  return (
    <div className="admin-user-management">
      <div className="page-header">
        <h2>User Management</h2>
        <p>View and monitor registered citizens</p>
      </div>

      <UserOverview />
      <UserTable />
    </div>
  );
};

export default UserManagement;
