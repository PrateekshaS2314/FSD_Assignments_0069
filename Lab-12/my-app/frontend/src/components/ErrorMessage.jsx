export default function ErrorMessage({ message, onRetry }) {
  return <div className="error-message" role="alert"><i className="bi bi-exclamation-circle" /><span>{message}</span>{onRetry && <button className="text-button" onClick={onRetry}>Try again</button>}</div>;
}
