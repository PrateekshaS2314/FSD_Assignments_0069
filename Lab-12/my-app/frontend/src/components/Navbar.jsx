import { useState } from 'react';
import { ArrowRight, LayoutDashboard, LogOut, Menu, Orbit, PawPrint, X } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  const closeMenu = () => setMenuOpen(false);

  return <header className="site-header">
    <div className="nav-wrap">
      <Link className="orbit-brand" to="/" aria-label="Orbit home" onClick={closeMenu}>
        <span className="orbit-brand-mark"><Orbit size={19} strokeWidth={2.2} /></span>
        <span>orbit<span className="brand-period">.</span></span>
      </Link>
      <button className="mobile-menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <Link to="/#about" onClick={closeMenu}>About</Link>
        {!loading && (user
          ? <>
            <NavLink to="/pets" onClick={closeMenu}><PawPrint size={15} /> Workspace</NavLink>
            {user.role === 'admin' && <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>}
            <NavLink to="/profile" className="nav-dashboard" onClick={closeMenu}><LayoutDashboard size={15} /> Dashboard</NavLink>
            <button className="nav-logout" onClick={signOut}><LogOut size={15} /> Log out</button>
          </>
          : <>
            <NavLink to="/login" className="nav-login" onClick={closeMenu}>Log in</NavLink>
            <Link to="/register" className="nav-register" onClick={closeMenu}>Get started <ArrowRight size={15} /></Link>
          </>
        )}
      </nav>
    </div>
  </header>;
}
