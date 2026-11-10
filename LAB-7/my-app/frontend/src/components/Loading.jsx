export default function Loading({ label = 'Finding listings...' }) {
  return <div className="loading-state" role="status"><span className="spinner" /><span>{label}</span></div>;
}
