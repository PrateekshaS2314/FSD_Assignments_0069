import RegistrationForm from "../components/RegistrationForm";

function FormDemo() {
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 08 / CONTROLLED INPUT</p><h1>Forms &amp; Controlled Components</h1><p>Every field is controlled by React state, validated before submission, and reflected in the result.</p></div><div className="form-layout"><div className="form-guide"><span className="big-index">08</span><h2>Student registration</h2><p>Practice the full form lifecycle: type, validate, submit, and render.</p></div><RegistrationForm /></div></section>;
}

export default FormDemo;
