import LoginDemo from "../components/LoginDemo";

function ConditionalDemo() {
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 09 / UI LOGIC</p><h1>Conditional Rendering</h1><p>React can show different elements depending on a boolean state value.</p></div><div className="single-demo"><span className="demo-label">AUTH STATE SIMULATOR</span><h2>Are you ready to enter?</h2><LoginDemo /></div></section>;
}

export default ConditionalDemo;
