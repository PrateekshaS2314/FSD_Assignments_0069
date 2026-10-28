import { useEffect, useState } from "react";

function HooksDemo() {
  const [seconds, setSeconds] = useState(0);
  const [theme, setTheme] = useState("day");
  useEffect(() => {
    // Effects synchronize React with an external timer and clean it up on unmount.
    const timer = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    document.title = `React Lab | ${seconds}s`;
    return () => window.clearInterval(timer);
  }, [seconds]);
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 07 / HOOKS</p><h1>React Hooks</h1><p>Hooks let function components use state and synchronize with effects.</p></div><div className="demo-grid two-col"><div className="hook-readout"><span className="demo-label">useState + useEffect</span><strong>{seconds}<small> sec</small></strong><p>The timer is a side effect. It is cleaned up when this page unmounts.</p></div><div className={`hook-readout theme-${theme}`}><span className="demo-label">EFFECTIVE UI</span><h2>{theme === "day" ? "Day mode" : "Focus mode"}</h2><p>The button updates state; the class uses that state to change this panel.</p><button className="button button-quiet" onClick={() => setTheme(theme === "day" ? "focus" : "day")}>Switch mode</button></div></div></section>;
}

export default HooksDemo;
