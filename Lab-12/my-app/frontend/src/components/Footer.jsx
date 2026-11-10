import { ArrowUpRight, Orbit, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="orbit-footer">
    <div className="footer-inner">
      <div className="footer-brand-block">
        <Link className="orbit-brand footer-brand" to="/"><span className="orbit-brand-mark"><Orbit size={18} /></span><span>orbit<span className="brand-period">.</span></span></Link>
        <p>Identity that feels simple.<br />Security you can feel good about.</p>
        <span className="footer-security"><ShieldCheck size={14} /> Built with security in mind</span>
      </div>
      <div className="footer-links">
        <span className="footer-label">EXPLORE</span>
        <Link to="/#about">About Orbit <ArrowUpRight size={13} /></Link>
        <Link to="/login">Log in <ArrowUpRight size={13} /></Link>
        <Link to="/register">Create account <ArrowUpRight size={13} /></Link>
      </div>
      <div className="footer-note">
        <span className="footer-label">A BETTER WAY TO SIGN IN</span>
        <p>Thoughtful authentication for every kind of team.</p>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Orbit Identity</span><span>Private by design. Simple by nature.</span></div>
  </footer>;
}
