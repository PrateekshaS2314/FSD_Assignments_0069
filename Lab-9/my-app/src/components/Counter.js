import { useState } from "react";

// useState stores the changing counter value and triggers a re-render after updates.
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-demo">
      <span className="counter-value">{count}</span>
      <div className="button-row">
        <button className="button button-secondary" onClick={() => setCount(count - 1)}>Decrement</button>
        <button className="button button-primary" onClick={() => setCount(count + 1)}>Increment</button>
        <button className="button button-quiet" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
