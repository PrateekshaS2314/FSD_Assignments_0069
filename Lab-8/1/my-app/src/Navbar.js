import { NavLink } from "react-router-dom";

// Shared navigation keeps both user lists easy to reach from every route.
function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/even-users">User Directory</NavLink>
      <nav aria-label="Main navigation">
        <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/even-users">Even Users</NavLink>
        <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/odd-users">Odd Users</NavLink>
        <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/search-user">Search User</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;