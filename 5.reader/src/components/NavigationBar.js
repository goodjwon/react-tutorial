import React from "react";

const NavigationBar = ({ isLoggedIn }) => {
  return (
    <nav>
      <button>{isLoggedIn ? "Logout" : "Login"}</button>
    </nav>
  );
};

export default NavigationBar;
