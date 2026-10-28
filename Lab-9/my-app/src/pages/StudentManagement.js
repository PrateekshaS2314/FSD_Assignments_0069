import { useState } from "react";

const starterStudents = [{ id: 1, name: "Aarav Mehta", course: "React Fundamentals" }, { id: 2, name: "Sofia Laurent", course: "Frontend Engineering" }, { id: 3, name: "Noah Williams", course: "JavaScript Essentials" }];

function StudentManagement() {
  const [students, setStudents] = useState(starterStudents);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("React Fundamentals");
  const [search, setSearch] = useState("");
  const addStudent = (event) => { event.preventDefault(); if (!name.trim()) return; setStudents((current) => [...current, { id: Date.now(), name: name.trim(), course }]); setName(""); };
  const visibleStudents = students.filter((student) => `${student.name} ${student.course}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">MINI PROJECT / CRUD</p><h1>Student Management</h1><p>A small app that combines state, forms, lists, search, and delete actions.</p></div><div className="student-layout"><div className="student-controls"><form className="stack-form" onSubmit={addStudent}><label>Student name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Sam Rivera" /></label><label>Course<select value={course} onChange={(event) => setCourse(event.target.value)}><option>React Fundamentals</option><option>Frontend Engineering</option><option>JavaScript Essentials</option></select></label><button className="button button-primary" type="submit">+ Add student</button></form><div className="project-note"><strong>What this combines</strong><span>useState / controlled form / array map / filter / delete</span></div></div><div className="student-list"><div className="list-toolbar"><div><span className="demo-label">ROSTER</span><strong>{visibleStudents.length} students</strong></div><input className="text-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" /></div>{visibleStudents.map((student) => <div className="student-row" key={student.id}><span className="avatar">{student.name.slice(0, 1)}</span><div><strong>{student.name}</strong><span>{student.course}</span></div><button className="delete-button" title={`Delete ${student.name}`} onClick={() => setStudents((current) => current.filter((item) => item.id !== student.id))}>Delete</button></div>)}{visibleStudents.length === 0 && <p className="muted-text">No students match your search.</p>}</div></div></section>;
}

export default StudentManagement;
