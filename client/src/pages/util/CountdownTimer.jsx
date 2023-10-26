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

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {countdown <= 0 ? (
        <p>Đã đóng</p>
      ) : (
        <p style={{ fontSize: "18px" }}>{formatTime(countdown)}</p>
      )}
    </div>
  );
};
