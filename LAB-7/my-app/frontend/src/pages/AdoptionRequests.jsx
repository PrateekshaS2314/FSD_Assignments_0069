import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import { adoptionApi, getErrorMessage } from '../services/api.js';

export default function AdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setRequests(await adoptionApi.list());
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function updateStatus(request, requestStatus) {
    setBusyId(request._id);
    setError('');
    try {
      await adoptionApi.update(request._id, requestStatus);
      await refresh();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusyId('');
    }
  }

  async function remove(request) {
    if (!window.confirm(`Delete the adoption request from ${request.applicantName}?`)) return;
    setBusyId(request._id);
    setError('');
    try {
      await adoptionApi.remove(request._id);
      setRequests((current) => current.filter((entry) => entry._id !== request._id));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusyId('');
    }
  }

  return <div className="page-wrap requests-page">
    <div className="page-intro"><div className="eyebrow">THE FIRST HELLO</div><h1>Adoption requests<span className="heading-period">.</span></h1><p>Follow each new connection from that first message to a forever home.</p><div className="intro-counter"><i className="bi bi-chat-heart-fill" /> {requests.length} {requests.length === 1 ? 'request' : 'requests'}</div></div>
    {error && <ErrorMessage message={error} onRetry={refresh} />}
    {loading ? <Loading label="Finding adoption requests..." /> : error ? null : requests.length ? <div className="request-list">{requests.map((request) => <article className="request-card" key={request._id}>
      <div className="request-pet-image">{request.petId?.image ? <img src={request.petId.image} alt="" /> : <i className={`bi ${request.petId?.animalType === 'Cat' ? 'bi-heart-fill' : 'bi-house-heart-fill'}`} />}</div>
      <div className="request-main">
        <div className="request-header"><div><span className="request-label">ADOPTION REQUEST FOR</span><h2>{request.petId?.petName || 'Pet listing removed'}</h2></div><span className={`request-status ${request.requestStatus.toLowerCase()}`}>{request.requestStatus}</span></div>
        <div className="request-applicant"><strong>{request.applicantName}</strong><a href={`mailto:${request.email}`}>{request.email}</a><a href={`tel:${request.phone}`}>{request.phone}</a></div>
        <p className="request-message">“{request.message}”</p>
        <div className="request-footer"><span>Received {new Date(request.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span><div className="request-actions">
          {request.requestStatus !== 'Approved' && request.petId?.adoptionStatus !== 'Adopted' && <button className="request-action approve" disabled={busyId === request._id} onClick={() => updateStatus(request, 'Approved')}><i className="bi bi-check-lg" /> Approve</button>}
          {request.requestStatus === 'Pending' && <button className="request-action reject" disabled={busyId === request._id} onClick={() => updateStatus(request, 'Rejected')}><i className="bi bi-x-lg" /> Decline</button>}
          {request.petId && <Link className="request-action" to={`/pets/${request.petId._id}`}><i className="bi bi-arrow-up-right" /> Pet profile</Link>}
          <button className="request-action remove-request" disabled={busyId === request._id} onClick={() => remove(request)} aria-label="Delete request"><i className="bi bi-trash3" /></button>
        </div></div>
      </div>
    </article>)}</div> : <div className="empty-state"><span className="empty-icon"><i className="bi bi-chat-heart" /></span><h2>No requests yet</h2><p>When someone applies to adopt a pet, their note will appear here.</p><Link className="button button-primary" to="/pets">Meet the pets <i className="bi bi-arrow-up-right" /></Link></div>}
  </div>;
}
