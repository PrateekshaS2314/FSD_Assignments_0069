import { ArrowDownLeft, ArrowUpRight, BadgeCheck, CircleUserRound, Fingerprint, Home, KeyRound, LayoutDashboard, LogOut, Orbit, PawPrint, Settings2, ShieldCheck, ShieldHalf, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate('/');
  }

  return <div className="dashboard-layout">
    <aside className="dashboard-sidebar">
      <Link className="dashboard-brand" to="/"><span><Orbit size={19} /></span> orbit<span className="brand-period">.</span></Link>
      <div className="sidebar-workspace"><span className="workspace-avatar"><Orbit size={16} /></span><span><b>Personal space</b><small>{user.role === 'admin' ? 'Administrator' : 'Student account'}</small></span><Settings2 size={15} /></div>
      <span className="sidebar-label">YOUR SPACE</span>
      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        <Link className="sidebar-link active" to="/profile"><LayoutDashboard size={17} /> Overview</Link>
        <Link className="sidebar-link" to="/pets"><PawPrint size={17} /> Workspace <ArrowUpRight className="sidebar-link-external" size={14} /></Link>
        {user.role === 'admin' && <Link className="sidebar-link" to="/requests"><ShieldHalf size={17} /> Access requests</Link>}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-help"><span><ShieldCheck size={17} /></span><b>Your account is protected</b><p>Your session is verified securely when you access your profile.</p></div>
        <button className="sidebar-signout" onClick={signOut}><LogOut size={16} /> Sign out</button>
        <Link className="sidebar-home-link" to="/"><ArrowDownLeft size={14} /> Back to Orbit home</Link>
      </div>
    </aside>

    <div className="dashboard-main">
      <header className="dashboard-topbar"><div><span className="dashboard-breadcrumb">Your space <span>/</span> Overview</span><h1>Account overview</h1></div><div className="dashboard-user"><span className="dashboard-avatar">{user.name.trim().charAt(0).toUpperCase()}</span><span><b>{user.name}</b><small>{user.email}</small></span></div></header>
      <section className="dashboard-welcome"><div className="welcome-orbit"><Orbit size={18} /></div><div><span className="welcome-overline">YOUR ORBIT ACCOUNT</span><h2>Welcome back, {user.name.split(' ')[0]}.</h2><p>Your account is all set. Here’s your personal space at a glance.</p></div><span className="welcome-sparkle">✳</span></section>

      <div className="dashboard-section-title"><div><span>ACCOUNT</span><h2>Your profile</h2></div><span className="profile-live"><span /> ACTIVE</span></div>
      <section className="dashboard-profile-card">
        <div className="profile-card-top"><div className="profile-large-avatar"><CircleUserRound size={28} strokeWidth={1.6} /></div><div className="profile-identity"><h3>{user.name}</h3><span>{user.email}</span></div><span className={`dashboard-role ${user.role}`}><BadgeCheck size={14} /> {user.role === 'admin' ? 'Administrator' : 'Student'}</span></div>
        <div className="profile-details-grid"><div className="dashboard-detail"><span className="detail-icon"><UserRound size={16} /></span><span><small>FULL NAME</small><b>{user.name}</b></span></div><div className="dashboard-detail"><span className="detail-icon"><KeyRound size={16} /></span><span><small>EMAIL ADDRESS</small><b>{user.email}</b></span></div><div className="dashboard-detail"><span className="detail-icon"><ShieldHalf size={16} /></span><span><small>ACCOUNT ROLE</small><b className="role-text">{user.role}</b></span></div></div>
        <div className="profile-protection"><ShieldCheck size={16} /><span>Your profile is connected to your verified account.</span><span className="protection-secure">SECURE</span></div>
      </section>

      <div className="dashboard-bottom-grid">
        <section className="dashboard-security-card"><div className="dashboard-mini-heading"><span className="mini-card-icon"><Fingerprint size={18} /></span><span><b>Account security</b><small>Your access is protected</small></span></div><div className="security-status"><span><ShieldCheck size={16} /> Password protected</span><i>ACTIVE</i></div><div className="security-status"><span><KeyRound size={16} /> Verified sign-in</span><i>ACTIVE</i></div></section>
        <section className="dashboard-next-card"><span className="next-card-icon"><Home size={17} /></span><span className="next-card-overline">KEEP EXPLORING</span><h3>Your workspace awaits.</h3><p>Head to your workspace to browse and discover what’s there.</p><Link to="/pets">Explore workspace <ArrowUpRight size={15} /></Link></section>
      </div>
      {user.role === 'admin' && <div className="dashboard-admin-note"><ShieldHalf size={16} /><span><b>Administrator access</b><small>Your account has access to protected management tools.</small></span><Link to="/admin">Open admin <ArrowUpRight size={14} /></Link></div>}
    </div>
  </div>;
}
