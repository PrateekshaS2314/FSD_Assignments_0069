import { useEffect, useState } from "react";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch data when the even-user route mounts, then filter by the numeric ID.
function EvenUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(USERS_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load users.");
        return response.json();
      })
      .then(setUsers)
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, []);

  return <UserList title="Even ID Users" users={users.filter((user) => user.id % 2 === 0)} loading={loading} error={error} />;
}

function UserList({ title, users, loading, error }) {
  return (
    <section>
      <div className="page-heading"><p className="eyebrow">DIRECTORY / FILTERED VIEW</p><h1>{title}</h1><p>Browse the user records returned by JSONPlaceholder.</p></div>
      {loading && <p className="status-message">Loading users...</p>}
      {error && <p className="status-message error" role="alert">Error: {error}</p>}
      {!loading && !error && <div className="user-grid">{users.map((user) => <UserCard key={user.id} user={user} />)}</div>}
    </section>
  );
}

function UserCard({ user }) {
  return <article className="user-card"><span className="user-id">ID {user.id}</span><h2>{user.name}</h2><dl><div><dt>Username</dt><dd>{user.username}</dd></div><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Phone</dt><dd>{user.phone}</dd></div><div><dt>Company</dt><dd>{user.company.name}</dd></div></dl></article>;
}

export default EvenUsers;