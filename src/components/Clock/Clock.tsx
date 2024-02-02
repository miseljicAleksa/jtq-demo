import React from "react";

const Clock: React.FC<{ currentTime: string }> = ({ currentTime }) => {
  return (
    <div className="timediv">
      <p className="time">{currentTime}</p>
    </div>
  );
};

export default Clock;
