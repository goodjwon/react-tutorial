import React, {useRef, useEffect} from 'react';

const UseRef2 = () => {

  const inputRef = useRef();

  useEffect(()=>{
	//console.log(inputRef);
	inputRef.current.focus();
  }, [])

  const login = () => {
	alert(`Welcome to ${inputRef.current.value}`)
	inputRef.current.focus();
  }


  return (
    <div>
      <input ref={inputRef} type="text" placeholder='username' />
      <button onClick={login}>로그인</button>
    </div>
  )
}

export default UseRef2;
