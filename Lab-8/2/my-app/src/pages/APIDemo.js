import { useEffect, useState } from "react";
import UserList from "../components/UserList";

function APIDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    // useEffect starts the network request after the first render.
    fetch("https://jsonplaceholder.typicode.com/users").then((response) => { if (!response.ok) throw new Error("Could not load the user API."); return response.json(); }).then(setUsers).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">LAB 10 / REMOTE DATA</p><h1>API Fetching</h1><p>Loading real JSON teaches the same states used by production interfaces.</p></div>{loading && <div className="status-box">Loading users<span className="loading-dots">...</span></div>}{error && <div className="status-box error-box">{error}</div>}{!loading && !error && <><div className="result-meta"><span>JSONPlaceholder / users</span><strong>{users.length} records</strong></div><UserList users={users} /></>}</section>;
}

export default APIDemo;
