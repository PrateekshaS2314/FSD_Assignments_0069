import Card from "../components/Card";

function JSXDemo() {
  const learner = "Ada";
  const lessonNumber = 1;
  const topics = ["variables", "expressions", "elements"];
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 01 / SYNTAX</p><h1>JSX Basics</h1><p>JSX lets you describe UI with a familiar HTML-like syntax inside JavaScript.</p></div><div className="demo-grid three-col"><Card title="Variables" description="JavaScript values can be placed directly into JSX."><div className="code-preview"><span>const learner =</span> <strong>"{learner}"</strong><br /><span>&lt;h3&gt;Hello, &#123;learner&#125;!&lt;/h3&gt;</span><b>Hello, {learner}!</b></div></Card><Card title="Expressions" description="Curly braces evaluate JavaScript expressions."><div className="expression-result">Lesson {lessonNumber} <span>/</span> {lessonNumber + 1}</div><p className="muted-text">The expression <code>lessonNumber + 1</code> becomes <strong>{lessonNumber + 1}</strong>.</p></Card><Card title="JSX syntax" description="Attributes, mapping, and nesting work together."><ul className="clean-list">{topics.map((topic) => <li key={topic}>JSX supports {topic}</li>)}</ul></Card></div></section>;
}

export default JSXDemo;
