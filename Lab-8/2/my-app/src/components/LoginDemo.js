import { useState } from "react";

// Conditional rendering switches the interface based on the logged-in state.
function LoginDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="conditional-demo">
      {isLoggedIn ? <><p className="success-text">Welcome back, learner. Your dashboard is ready.</p><button className="button button-secondary" onClick={() => setIsLoggedIn(false)}>Log out</button></> : <><p className="muted-text">You are currently signed out.</p><button className="button button-primary" onClick={() => setIsLoggedIn(true)}>Log in</button></>}
    </div>
  );
}

export default LoginDemo;
