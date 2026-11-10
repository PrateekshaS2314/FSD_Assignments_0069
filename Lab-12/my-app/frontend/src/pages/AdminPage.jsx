import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi, getErrorMessage } from '../services/api.js';

export default function AdminPage() {
  const [status, setStatus] = useState({ loading: true, error: '', message: '' });

  useEffect(() => {
    let active = true;
    authApi.admin()
      .then((result) => { if (active) setStatus({ loading: false, error: '', message: result.message }); })
      .catch((error) => { if (active) setStatus({ loading: false, error: getErrorMessage(error), message: '' }); });
    return () => { active = false; };
  }, []);

  return <div className="page-wrap admin-page">
    <div className="eyebrow"><span className="eyebrow-dot" /> ADMINISTRATION</div>
    <h1>Admin dashboard<span className="heading-period">.</span></h1>
    {status.loading ? <div className="admin-status"><span className="spinner" /> Verifying administrator access…</div> : status.error ? <div className="admin-status denied" role="alert"><i className="bi bi-shield-exclamation" /><span><strong>Access not granted</strong>{status.error}</span></div> : <div className="admin-status granted" role="status"><i className="bi bi-shield-check" /><span><strong>{status.message}</strong>Your admin role has been verified by the API.</span></div>}
    <div className="admin-actions"><Link className="button button-primary" to="/pets/new"><i className="bi bi-plus-lg" /> Add a pet</Link><Link className="button button-light" to="/requests"><i className="bi bi-chat-heart" /> Manage adoption requests</Link></div>
  </div>;
}
