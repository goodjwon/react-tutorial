import React, { useState, useEffect } from 'react';

const Component5 = () => {
  const [keyPressed, setKeyPressed] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      setKeyPressed(event.key);
    };

    window.addEventListener('keydown', handleKeyPress);

    // 클린업 함수로 이벤트 리스너 해제
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // 컴포넌트가 마운트될 때만 이벤트 리스너 등록

  return (
    <div>
      <h1>Key Pressed: {keyPressed}</h1>
    </div>
  );
};

export default Component5;
