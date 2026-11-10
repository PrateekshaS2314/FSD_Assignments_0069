import { Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function AppShell() {
  const { notice, dismissNotice } = useApp();
  const location = useLocation();

  return <div className="app-shell">
    <Navbar />
    <main key={location.pathname}><Outlet /></main>
    <Footer />
    {notice && <div className={`toast-notice ${notice.type}`} role="status"><i className={`bi ${notice.type === 'error' ? 'bi-exclamation-circle-fill' : 'bi-check-circle-fill'}`} />{notice.message}<button aria-label="Dismiss notification" onClick={dismissNotice}><i className="bi bi-x" /></button></div>}
  </div>;
}
