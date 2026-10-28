// UserList renders API data in a consistent card layout for the API lab.
function UserList({ users }) {
  return <div className="user-grid">{users.map((user) => <article className="api-user-card" key={user.id}><span className="user-number">0{user.id}</span><h3>{user.name}</h3><p>@{user.username}</p><dl><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Company</dt><dd>{user.company.name}</dd></div></dl></article>)}</div>;
}

export default UserList;
