import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="not-found"><span>404 &nbsp; / &nbsp; A LITTLE DETOUR</span><div className="not-found-star"><i className="bi bi-paw" /></div><h1>This page wandered off.</h1><p>Good thing the way back is easy to find.</p><Link to="/" className="button button-primary">Back to the beginning <i className="bi bi-arrow-up-right" /></Link></div>;
}
