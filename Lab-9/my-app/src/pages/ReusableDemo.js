import Card from "../components/Card";

function ReusableDemo() {
  const lessons = [["JSX", "Describe interfaces with JavaScript."], ["State", "Make a screen respond to interaction."], ["Props", "Share data between components."]];
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 03 / COMPOSITION</p><h1>Reusable Components</h1><p>One Card component, three different data sets. Reuse keeps interfaces consistent.</p></div><div className="demo-grid three-col">{lessons.map(([title, description], index) => <Card key={title} title={title} description={description} accent={index === 1 ? "orange" : "teal"}><span className="pill">Lesson 0{index + 1}</span></Card>)}</div></section>;
}

export default ReusableDemo;
