import React, {useState} from 'react';
import './Counter.css';

const Counter = () => {
	const [count, setCount] = useState(0);

	const incrementCounter = () => {
		setCount(count + 1);
	}

	const decrementCounter = () => {
		setCount(count > 0 ? count - 1 : 0);
	}

	return(
		<section className="counter-section">
		<h3>Counter Application</h3>
		<h4>Counter: <span>{count}</span></h4>
		<div className="btn-group">
		  <button className="btn increment" onClick={incrementCounter}>Increment</button>
		  <button className="btn decrement" onClick={decrementCounter}>Decrement</button>
		</div>
	  </section>
	);
};

export default Counter;
