import React from "react";

const UserProfile = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
    </div>
  );
};

export default UserProfile;
