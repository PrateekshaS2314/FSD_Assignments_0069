import { useState } from 'react';
import { getErrorMessage } from '../services/api.js';

export default function AdoptionForm({ pet, onSubmit }) {
  const [values, setValues] = useState({ applicantName: '', email: '', phone: '', message: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: '' }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit({ ...values, petId: pet._id });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setFieldErrors(requestError.response?.data?.errors || {});
    } finally {
      setSaving(false);
    }
  }

  const field = (name, label, placeholder, type = 'text', multiline = false) => <label className="form-field" key={name}>
    <span>{label}<b>*</b></span>
    {multiline ? <textarea value={values[name]} onChange={(event) => update(name, event.target.value)} placeholder={placeholder} rows={4} maxLength={2000} required aria-invalid={Boolean(fieldErrors[name])} /> :
      <input type={type} value={values[name]} onChange={(event) => update(name, event.target.value)} placeholder={placeholder} required aria-invalid={Boolean(fieldErrors[name])} />}
    {fieldErrors[name] && <small className="field-error">{fieldErrors[name]}</small>}
  </label>;

  return <form className="pet-form adoption-form" onSubmit={submit} noValidate>
    <div className="form-grid">
      {field('applicantName', 'Your name', 'Full name')}
      {field('email', 'Email address', 'you@example.com', 'email')}
      {field('phone', 'Phone number', 'Best number to reach you', 'tel')}
      {field('message', 'Why would you like to adopt?', 'Tell us about your home, experience, and the kind of life you can offer...', 'text', true)}
    </div>
    {error && <div className="inline-error" role="alert"><i className="bi bi-exclamation-circle" />{error}</div>}
    <button className="button button-primary form-submit" type="submit" disabled={saving}><i className={`bi ${saving ? 'bi-arrow-repeat spin' : 'bi-heart-fill'}`} />{saving ? 'Sending request...' : 'Send adoption request'}</button>
  </form>;
}
