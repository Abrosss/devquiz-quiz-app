import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime*60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      clearInterval(interval);
      onTimeout(); 
    }

    return () => clearInterval(interval);
  }, [timeRemaining, onTimeout]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  };

  return <div>{formatTime(timeRemaining)}</div>;
};

export default Timer;
