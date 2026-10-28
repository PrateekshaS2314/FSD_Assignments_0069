import { NavLink } from "react-router-dom";

const links = [
  ["/", "Home"], ["/jsx", "JSX"], ["/components", "Components"], ["/props", "Props"], ["/state", "State"], ["/hooks", "Hooks"], ["/forms", "Forms"], ["/api", "API"], ["/students", "Students"]
];

// NavLink provides active route styling while every lab remains one click away.
function Navbar() {
  return <header className="site-header"><NavLink className="site-brand" to="/"><span className="brand-mark">R</span><span>React Lab<span className="brand-dot">.</span></span></NavLink><nav className="site-nav" aria-label="Learning modules">{links.map(([path, label]) => <NavLink key={path} end={path === "/"} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} to={path}>{label}</NavLink>)}<NavLink className="nav-item nav-user" to="/user/1">User #1</NavLink></nav></header>;
}

export default Navbar;
