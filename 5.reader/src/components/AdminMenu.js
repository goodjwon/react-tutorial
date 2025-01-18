import React from "react";

const AdminMenu = ({ isAdmin }) => {
  return isAdmin ? (
    <div>
      <h3>Admin Menu</h3>
      <ul>
        <li>Manage Users</li>
        <li>View Reports</li>
      </ul>
    </div>
  ) : null;
};

export default AdminMenu;
