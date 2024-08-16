import {useState, useRef, useEffect} from 'react'

function App() {
  const [count, setCount] = useState(1);  
  const renderCount = useRef(1)
  // 무한 loop error count statue update -> userEffect update -> userEffect update -> ...
  // const [renderCountError, setRenderCountError] = useState(1)

  useEffect(()=>{
    renderCount.current = renderCount.current + 1;
    //  setRenderCountError(renderCountError + 1);
    console.log('renderCount Number: ' + renderCount.current)
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={()=>setCount(count+1)}>올려</button>
    </div>
  );
}

export default App;
