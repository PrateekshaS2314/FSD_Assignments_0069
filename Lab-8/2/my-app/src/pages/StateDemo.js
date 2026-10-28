import Counter from "../components/Counter";

function StateDemo() {
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 05 / INTERACTION</p><h1>State Management</h1><p>useState gives a component memory. Change the value and React updates the screen.</p></div><div className="single-demo"><div><span className="demo-label">LIVE COUNTER</span><h2>What is the current count?</h2><p className="muted-text">Try all three actions. Each one schedules a new render.</p></div><Counter /></div></section>;
}

export default StateDemo;
