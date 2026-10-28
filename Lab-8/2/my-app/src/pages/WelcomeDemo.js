function Welcome({ name = "React learner" }) {
  return <div className="welcome-demo"><span className="welcome-icon">W</span><div><p className="eyebrow">FUNCTION COMPONENT</p><h2>Welcome, {name}.</h2><p>This greeting is rendered by a plain JavaScript function that returns JSX.</p></div></div>;
}

function WelcomeDemo() {
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 02 / COMPONENTS</p><h1>First Functional Component</h1><p>A function component is a small, focused unit of UI.</p></div><Welcome name="React explorer" /></section>;
}

export default WelcomeDemo;
