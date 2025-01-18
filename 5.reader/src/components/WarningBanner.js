import React, { useState } from "react";

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}

function WarningControl() {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div>
      <h2>Warning Banner</h2>
      <WarningBanner warn={showWarning} />
      <button onClick={() => setShowWarning(!showWarning)}>
        {showWarning ? "Hide" : "Show"} Warning
      </button>
    </div>
  );
}

export default WarningControl;
