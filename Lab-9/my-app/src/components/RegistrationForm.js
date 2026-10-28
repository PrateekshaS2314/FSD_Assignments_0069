import { useState } from "react";

const initialForm = { name: "", email: "", phone: "", course: "" };

// Controlled fields keep the form values in React state so validation is predictable.
function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!form.course) nextErrors.course = "Choose a course.";
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0 ? { ...form } : null);
  };

  return (
    <div>
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        {[['name', 'Name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone', 'tel']].map(([name, label, type]) => (
          <label key={name}>{label}<input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={`Enter ${label.toLowerCase()}`} />{errors[name] && <small className="field-error">{errors[name]}</small>}</label>
        ))}
        <label>Course<select name="course" value={form.course} onChange={handleChange}><option value="">Select a course</option><option>React Fundamentals</option><option>Frontend Engineering</option><option>JavaScript Essentials</option></select>{errors.course && <small className="field-error">{errors.course}</small>}</label>
        <button className="button button-primary" type="submit">Register Student</button>
      </form>
      {submitted && <div className="submitted-panel"><strong>Registration submitted</strong><p>{submitted.name} is enrolled in {submitted.course}.</p></div>}
    </div>
  );
}

export default RegistrationForm;
