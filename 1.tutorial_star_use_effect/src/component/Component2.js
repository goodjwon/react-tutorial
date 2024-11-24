import React, { useState, useEffect } from 'react';

const Component2 = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count is now: ${count}`);
  }, [count]); // count가 변경될 때마다 실행됩니다.

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default Component2;
