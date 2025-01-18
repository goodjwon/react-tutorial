import React, { useState } from "react";
import Greeting from "./components/Greeting";
import ConditionalRenderingExamples from "./components/ConditionalRenderingExamples";
import WarningBanner from "./components/WarningBanner";
import LoginControl from "./components/LoginControl";
import UserProfile from "./components/UserProfile";

const App = () => {

  const [user, setUser] = useState({ name: "John Doe" });

  return (
    <div>
      <h1>React Conditional Rendering Examples</h1>
      <Greeting isLoggedIn={true} />
      <ConditionalRenderingExamples />
      <LoginControl />
      <WarningBanner />
      <UserProfile user={user} />

    </div>
  );
};

export default App;
