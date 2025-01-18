function UserGreeting(props) {
	return <h1>Welcome back, {props.name}!</h1>;
  }
  
  function GuestGreeting() {
	return <h1>Please sign up.</h1>;
  }
  
  function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
	  return <UserGreeting name="John" />;
	} else {
	  return <GuestGreeting />;
	}
  }
  
  export default Greeting;
  