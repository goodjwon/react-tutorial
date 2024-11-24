import React, { useState, useEffect } from 'react';

const Component4 = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // 클린업 함수로 타이머 해제
    return () => {
      clearInterval(interval);
    };
  }, []); // 컴포넌트가 마운트될 때만 타이머 설정

  return (
    <div>
      <h1>Time: {time}</h1>
    </div>
  );
};

export default Component4;
