import React, { useState, useEffect } from 'react';

const Component3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // 컴포넌트가 마운트될 때만 실행

  return (
    <div>
      <h1>API Data</h1>
      <p>{data ? JSON.stringify(data) : 'Loading...'}</p>
    </div>
  );
};

export default Component3;
