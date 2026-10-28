import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => { if (!response.ok) throw new Error("User not found."); return response.json(); }).then(setUser).catch((requestError) => setError(requestError.message)); }, [id]);
  return <section className="lab-page"><div className="page-intro"><p className="eyebrow">ROUTING / USER : ID</p><h1>Dynamic Routing</h1><p>The URL parameter <code>id</code> selects which remote record to display.</p></div>{error && <div className="status-box error-box">{error}</div>}{user && <article className="detail-card"><span className="user-number">USER / {user.id}</span><h2>{user.name}</h2><p className="detail-handle">@{user.username}</p><div className="detail-grid"><div><span>Email</span><strong>{user.email}</strong></div><div><span>Phone</span><strong>{user.phone}</strong></div><div><span>Company</span><strong>{user.company.name}</strong></div><div><span>Website</span><strong>{user.website}</strong></div></div><Link className="text-link" to="/api">Back to API lab -&gt;</Link></article>}</section>;
}

export default UserDetails;
