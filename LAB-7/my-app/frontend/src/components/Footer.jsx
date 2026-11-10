import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer"><Link className="brand footer-brand" to="/"><span className="brand-icon"><i className="bi bi-heart-fill" /></span><span>paw<span className="brand-accent">connect</span></span></Link><p>Every pet deserves a loving place to call home.</p><span className="footer-note">Made with love (and a few paw prints) <i className="bi bi-heart-fill" /></span></footer>;
}
