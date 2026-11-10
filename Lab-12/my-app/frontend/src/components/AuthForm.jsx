import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Fingerprint, LockKeyhole, Mail, Orbit, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getErrorMessage } from '../services/api.js';

export default function AuthForm({ mode }) {
  const registering = mode === 'register';
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(location.state?.notice || '');
  const [passwordVisible, setPasswordVisible] = useState(false);

  function update(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (registering) {
        await register(values);
        navigate('/login', { replace: true, state: { notice: 'Account created. You can now sign in.' } });
      } else {
        await login({ email: values.email, password: values.password });
        navigate(location.state?.from?.pathname || '/profile', { replace: true });
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return <div className={`identity-auth${registering ? ' register-mode' : ' login-mode'}`}>
    <aside className="auth-brand-panel">
      <Link className="auth-orbit-brand" to="/"><span><Orbit size={19} /></span> orbit<span className="brand-period">.</span></Link>
      <div className="auth-panel-art"><span className="auth-art-ring auth-ring-one" /><span className="auth-art-ring auth-ring-two" /><div className="auth-art-center"><Fingerprint size={41} strokeWidth={1.4} /></div><ShieldCheck className="auth-art-badge" size={23} /></div>
      <div className="auth-panel-message"><span className="auth-panel-kicker">{registering ? 'A LITTLE MORE YOU' : 'GOOD TO HAVE YOU BACK'}</span><h1>{registering ? <>A fresh start.<br /><span>On your terms.</span></> : <>Your space is<br /><span>right where you left it.</span></>}</h1><p>{registering ? 'Create an account to find your place in a more thoughtful digital space.' : 'Sign in securely and pick up right where you left off.'}</p></div>
      <div className="auth-panel-bottom"><LockKeyhole size={15} /><span>Your privacy comes first</span><span className="auth-panel-bottom-dot" /> Orbit Identity</div>
    </aside>
    <section className="identity-auth-main" aria-labelledby="auth-heading">
      <Link to="/" className="auth-back-link"><ArrowLeft size={15} /> <span>Back to home</span></Link>
      <div className="identity-auth-card">
        <div className="auth-mobile-brand"><span><Orbit size={18} /></span> orbit<span className="brand-period">.</span></div>
        <span className="auth-step">{registering ? 'GET STARTED' : 'WELCOME BACK'} <span /></span>
        <h2 id="auth-heading">{registering ? 'Create your account' : 'Sign in to Orbit'}</h2>
        <p className="identity-auth-subtitle">{registering ? 'A few details are all we need to get started.' : 'Enter your details to access your account.'}</p>
        {notice && <p className="identity-alert success" role="status"><ShieldCheck size={17} />{notice}</p>}
        {error && <p className="identity-alert error" role="alert"><ShieldCheck size={17} />{error}</p>}
        <form className="identity-form" onSubmit={submit}>
          {registering && <label className="identity-field"><span>Your name</span><div className="identity-input"><UserRound size={17} /><input name="name" type="text" autoComplete="name" placeholder="e.g. Alex Morgan" value={values.name} onChange={update} minLength="2" maxLength="80" required /></div></label>}
          <label className="identity-field"><span>Email address</span><div className="identity-input"><Mail size={17} /><input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={update} maxLength="254" required /></div></label>
          <label className="identity-field"><span>Password</span><div className="identity-input"><LockKeyhole size={17} /><input name="password" type={passwordVisible ? 'text' : 'password'} autoComplete={registering ? 'new-password' : 'current-password'} placeholder={registering ? 'At least 8 characters' : 'Enter your password'} value={values.password} onChange={update} minLength="8" maxLength="72" required /><button className="password-toggle" type="button" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? 'Hide password' : 'Show password'}>{passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{registering && <small className="password-hint">Use at least 8 characters to protect your account.</small>}</label>
          <button className="identity-submit" type="submit" disabled={busy}>{busy ? 'Please wait…' : registering ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button>
        </form>
        <p className="identity-auth-switch">{registering ? 'Already have an account?' : 'New to Orbit?'} <Link to={registering ? '/login' : '/register'}>{registering ? 'Sign in' : 'Create an account'}</Link></p>
        <div className="identity-form-foot"><ShieldCheck size={15} /><span>Your credentials are protected with secure password hashing.</span></div>
      </div>
      <span className="auth-copyright">© {new Date().getFullYear()} Orbit Identity</span>
    </section>
  </div>;
}
