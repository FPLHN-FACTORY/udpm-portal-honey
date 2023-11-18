import React, { useState, useEffect } from "react";

export const CountdownTimer = ({ initialTime }) => {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="">
      {countdown <= 0 ? (
        <span style={{ color: "#fffa37" }}>Đã đóng</span>
      ) : (
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {formatTime(countdown)}
        </span>
      )}
    </div>
  );
};
