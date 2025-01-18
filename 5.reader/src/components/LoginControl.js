import React, { useState } from "react";

function LoginControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => setIsLoggedIn(true);
  const handleLogoutClick = () => setIsLoggedIn(false);

  return (
    <div>
      <h2>Login Control</h2>
      {isLoggedIn ? (
        <>
          <h3>Welcome back!</h3>
          <button onClick={handleLogoutClick}>Logout</button>
        </>
      ) : (
        <>
          <h3>Please log in.</h3>
          <button onClick={handleLoginClick}>Login</button>
        </>
      )}
    </div>
  );
}

export default LoginControl;
