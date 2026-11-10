import { ArrowDown, ArrowRight, ArrowUpRight, Fingerprint, KeyRound, Layers3, LockKeyhole, Orbit, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const features = [
  {
    icon: LockKeyhole,
    title: 'Security at every step',
    description: 'Passwords are hashed before they are stored. Sessions are verified with signed, expiring tokens.',
    label: '01 / PROTECTED'
  },
  {
    icon: Fingerprint,
    title: 'A smoother sign-in',
    description: 'A focused, friendly sign-in flow gets you to your account without getting in your way.',
    label: '02 / PERSONAL'
  },
  {
    icon: Layers3,
    title: 'The right access, built in',
    description: 'Student and admin roles keep account experiences and protected tools in their proper place.',
    label: '03 / ROLE-AWARE'
  }
];

export default function HomePage() {
  const { user } = useAuth();

  return <div className="orbit-home">
    <section className="orbit-hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="eyebrow-pulse" /> YOUR DIGITAL SPACE, MADE SIMPLE</div>
          <h1>Identity that feels<br />like <span>second nature.</span></h1>
          <p>One calm, considered place to sign in, understand your account, and get on with what matters.</p>
          <div className="hero-actions">
            <Link className="hero-primary" to={user ? '/profile' : '/register'}>{user ? 'Go to your dashboard' : 'Create your account'} <ArrowRight size={17} /></Link>
            <Link className="hero-secondary" to={user ? '/pets' : '/login'}>{user ? 'Explore workspace' : 'Sign in'} <ArrowUpRight size={15} /></Link>
          </div>
          <div className="hero-proof"><span className="proof-icon"><ShieldCheck size={16} /></span><span>Secure by design <i /> Simple by nature</span></div>
        </div>

        <div className="hero-art" aria-label="Illustration of the Orbit account security features">
          <div className="art-aura" />
          <div className="art-orbit orbit-track-one" />
          <div className="art-orbit orbit-track-two" />
          <span className="art-sparkle art-sparkle-one"><Sparkles size={17} /></span>
          <span className="art-sparkle art-sparkle-two"><Sparkles size={12} /></span>
          <div className="art-core"><div className="art-core-inner"><Orbit size={42} strokeWidth={1.5} /></div><span className="art-core-dot" /></div>
          <div className="orbit-float-card float-card-top"><span className="float-icon"><ShieldCheck size={17} /></span><span><b>Protected access</b><small>Verified at every step</small></span><span className="float-check">✓</span></div>
          <div className="orbit-float-card float-card-bottom"><span className="float-icon float-icon-lilac"><UserRoundCheck size={17} /></span><span><b>Just your space</b><small>Your profile, your role</small></span></div>
          <span className="art-caption">A little more peace of mind.</span>
        </div>
      </div>
      <a className="hero-scroll" href="#about"><span>MEET ORBIT</span><ArrowDown size={14} /></a>
      <div className="hero-bottom-line" />
    </section>

    <section id="about" className="about-section">
      <div className="section-overline"><span>01</span> A MORE THOUGHTFUL SIGN-IN</div>
      <div className="about-heading">
        <h2>All the important things.<br /><span>Nothing in your way.</span></h2>
        <p>Great account security should work quietly in the background. Orbit makes the essentials feel clear, considered, and easy to navigate.</p>
      </div>
      <div className="feature-grid">{features.map(({ icon: Icon, title, description, label }) => <article className="feature-card" key={title}>
        <div className="feature-card-top"><span className="feature-icon"><Icon size={20} strokeWidth={1.8} /></span><span>{label}</span></div>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="feature-arrow"><ArrowUpRight size={17} /></span>
      </article>)}</div>
    </section>

    <section className="privacy-section">
      <div className="privacy-orb"><div><KeyRound size={25} /></div><span className="privacy-orb-ring ring-a" /><span className="privacy-orb-ring ring-b" /></div>
      <div className="privacy-copy"><span className="section-overline"><span>02</span> SECURITY, WITHOUT THE NOISE</span><h2>Thoughtful security.<br /><span>Clear at every step.</span></h2><p>Your password is never stored in plain text. Your signed-in session is checked against the server, so your account stays yours as you move around.</p><Link to="/#about" className="privacy-link">A closer look at Orbit <ArrowUpRight size={15} /></Link></div>
      <div className="privacy-aside"><div className="privacy-aside-row"><ShieldCheck size={17} /><span><b>Password protection</b><small>Passwords are securely hashed</small></span><span className="privacy-status">ON</span></div><div className="privacy-aside-row"><Fingerprint size={17} /><span><b>Verified sessions</b><small>Access checked by the API</small></span><span className="privacy-status">ON</span></div><div className="privacy-aside-row"><Layers3 size={17} /><span><b>Role-aware access</b><small>Permissions match your role</small></span><span className="privacy-status">ON</span></div></div>
    </section>

    <section className="closing-cta"><div className="cta-star"><Sparkles size={19} /></div><div><span>YOUR NEXT STEP STARTS HERE</span><h2>Make room for a better sign-in.</h2><p>Set up your Orbit account in just a moment.</p></div><Link to={user ? '/profile' : '/register'}>{user ? 'Open dashboard' : 'Get started'} <ArrowRight size={16} /></Link></section>
  </div>;
}
