import { useEffect, useState } from "react";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

function SearchUser() {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Load the same user collection used by the even and odd user routes.
  useEffect(() => {
    fetch(USERS_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load users.");
        return response.json();
      })
      .then(setUsers)
      .catch((error) => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedId = userId.trim();

    if (!trimmedId) {
      setResult(null);
      setMessage("Please enter a User ID.");
      return;
    }

    if (!/^\d+$/.test(trimmedId)) {
      setResult(null);
      setMessage("User ID must contain only numbers.");
      return;
    }

    const matchingUser = users.find((user) => user.id === Number(trimmedId));
    setResult(matchingUser || null);
    setMessage(matchingUser ? "" : "User Not Found");
  };

  return (
    <section className="search-panel">
      <div className="page-heading">
        <p className="eyebrow">DIRECTORY / LOOKUP</p>
        <h1>Search User</h1>
        <p>Enter a numeric ID to find a user and see whether the ID is even or odd.</p>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="user-id">User ID</label>
        <input id="user-id" className="search-input" type="text" inputMode="numeric" value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="Enter User ID" aria-describedby="search-message" />
        <button className="search-button" type="submit">Search</button>
      </form>
      {loading && <p className="status-message">Loading users...</p>}
      {fetchError && <p className="status-message error" role="alert">Error: {fetchError}</p>}
      {!loading && !fetchError && message && <p id="search-message" className="status-message error" role="alert">{message}</p>}
      {result && <article className="user-card search-result"><span className="parity-badge">ID {result.id} is {result.id % 2 === 0 ? "Even" : "Odd"}</span><h2>{result.name}</h2><dl><div><dt>ID</dt><dd>{result.id}</dd></div><div><dt>Username</dt><dd>{result.username}</dd></div><div><dt>Email</dt><dd>{result.email}</dd></div><div><dt>Phone</dt><dd>{result.phone}</dd></div><div><dt>Company</dt><dd>{result.company.name}</dd></div></dl></article>}
    </section>
  );
}

export default SearchUser;