import Card from "../components/Card";

function LearnerCard({ name, role, completed }) {
  return <Card title={name} description={role}><div className="progress-row"><span>Course progress</span><strong>{completed}%</strong></div><div className="progress-track"><i style={{ width: `${completed}%` }} /></div></Card>;
}

function PropsDemo() {
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 04 / DATA FLOW</p><h1>Props</h1><p>Props are the parent-to-child handoff. The child receives data and decides how to present it.</p></div><div className="demo-grid three-col"><LearnerCard name="Mina Patel" role="UI explorer" completed={72} /><LearnerCard name="Jon Bell" role="State architect" completed={48} /><LearnerCard name="Inez Kim" role="API navigator" completed={91} /></div><div className="callout"><strong>Parent -&gt; child</strong><span>Props are read-only inputs. The parent owns the data; the child renders it.</span></div></section>;
}

export default PropsDemo;
