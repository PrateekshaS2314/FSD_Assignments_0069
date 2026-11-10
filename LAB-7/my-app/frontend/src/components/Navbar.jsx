import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/pets', label: 'Meet the pets' },
  { to: '/requests', label: 'Adoption requests' }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="topbar">
    <div className="topbar-inner">
      <Link className="brand" to="/" aria-label="PawConnect home"><span className="brand-icon"><i className="bi bi-heart-fill" /></span><span>paw<span className="brand-accent">connect</span><small>FIND YOUR FOREVER FRIEND</small></span></Link>
      <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}><i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} /></button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
        <Link className="nav-report" to="/pets/new" onClick={() => setMenuOpen(false)}><i className="bi bi-plus-lg" /> Add a pet</Link>
      </nav>
    </div>
  </header>;
}
