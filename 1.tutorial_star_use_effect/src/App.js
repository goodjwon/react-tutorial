import { useState, useEffect } from 'react';
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleUpate = ()=>{
    setCount(count+1);
  }

  const handleInputChange = (e)=>{
    setName(e.target.value);
  };

  useEffect(()=>{
    console.log('화면이랜더링될때만찍여효');
  });

  useEffect(()=>{
    console.log('카운트가 변화 될때만 찍혀요.');
  },[count])

  useEffect(()=>{
    console.log('이름이 바뀔때만 찍혀요.');
  }, [name]);

  useEffect(()=>{
    console.log('마운트될때만 찍혀요.');
  },[]);

  return (
    <div>
      <button onClick={handleUpate}>update</button>
      <span>count : {count}</span>
      <br />
      <input type='text' value={name} onChange={handleInputChange}></input>
      <span>name : {name}</span>
    </div>
  );
}

export default App;
