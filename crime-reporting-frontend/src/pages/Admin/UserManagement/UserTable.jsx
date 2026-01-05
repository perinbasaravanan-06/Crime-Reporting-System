import React, { useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";

const UserTable = () => {
  const {
    userList,
    userLoading,
    getCrimeCountByUser,
    getEvidenceCountByUser,
    getMissingCountByUser
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = userList.filter((user) =>
    `${user.name} ${user.email} ${user.phone} ${user.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (userLoading) return <p>Loading users...</p>;

  return (
    <div className="user-table-card">
      <div className="table-header">
        <h3>Registered Users</h3>

        <input
          type="text"
          placeholder="🔍 Search by name, email, phone or city"
          className="table-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Crime Reports</th>
              <th>Missing Reports</th>
              <th>Evidence</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.userId}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.city}</td>
                  <td>{getCrimeCountByUser(u.userId)}</td>
                  <td>{getMissingCountByUser(u.userId)}</td>
                  <td>{getEvidenceCountByUser(u.userId)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
