function ConditionalRenderingExamples() {
	const isLoggedIn = true;
	const messages = ["Message 1", "Message 2"];
  
	return (
	  <div>
		<h2>Using if Statement:</h2>
		{isLoggedIn ? <h3>Welcome back!</h3> : <h3>Please sign up.</h3>}
  
		<h2>Using && Operator:</h2>
		{messages.length > 0 && (
		  <h3>You have {messages.length} unread messages.</h3>
		)}
	  </div>
	);
  }
  
  export default ConditionalRenderingExamples;
  