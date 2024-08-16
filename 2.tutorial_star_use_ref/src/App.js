import {useState, useRef} from 'react'

function App() {

  const [count, setCount] = useState(0);
  const countRef = useRef(0)

  console.log('랜더링 됩니까?');
  
  const increaseCountState = () => {
    setCount(count+1);
  };

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log(countRef.current)
  }

  return (
    <div>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <button onClick={increaseCountState}>State 올리기</button>
      <button onClick={increaseCountRef}> Ref 올리기</button>
    </div>
  );
}

export default App;
