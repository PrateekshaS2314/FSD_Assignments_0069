import { useState } from "react";

function EventDemo() {
  const [message, setMessage] = useState("Waiting for an event...");
  const [text, setText] = useState("");
  const [hovering, setHovering] = useState(false);
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 06 / RESPONSES</p><h1>Event Handling</h1><p>Events connect user intent to state updates and visible feedback.</p></div><div className="demo-grid three-col"><div className="event-tile"><span className="demo-label">CLICK</span><button className="button button-primary" onClick={() => setMessage("The button was clicked.")}>Click me</button><p>{message}</p></div><div className="event-tile"><span className="demo-label">INPUT</span><input className="text-input" value={text} onChange={(event) => setText(event.target.value)} placeholder="Type something" /><p>{text || "Your input appears here."}</p></div><div className={`event-tile hover-tile ${hovering ? "is-hovered" : ""}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}><span className="demo-label">HOVER</span><strong>{hovering ? "Pointer detected" : "Move over this tile"}</strong><p>Mouse enter and leave update state.</p></div></div></section>;
}

export default EventDemo;
