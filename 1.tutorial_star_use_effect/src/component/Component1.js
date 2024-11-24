import React, { useEffect } from 'react';

const Component1 = () => {
  useEffect(() => {
    console.log("Component mounted");
  }, []); // 빈 배열을 넣으면 컴포넌트가 처음 렌더링될 때만 실행됩니다.

  return (
    <div>
      <h1>Hello, useEffect!</h1>
    </div>
  );
};

export default Component1;
