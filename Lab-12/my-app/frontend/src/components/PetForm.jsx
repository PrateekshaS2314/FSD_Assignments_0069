import { useState } from 'react';
import { getErrorMessage } from '../services/api.js';

const initialValues = {
  petName: '', animalType: '', breed: '', age: '', gender: '', description: '',
  image: '', location: '', adoptionStatus: 'Available'
};

export default function PetForm({ pet, onSubmit, submitLabel }) {
  const [values, setValues] = useState(pet ? { ...pet, age: String(pet.age) } : initialValues);
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
    setFieldErrors({});
    try {
      await onSubmit({ ...values, age: Number(values.age), image: values.image.trim() });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setFieldErrors(requestError.response?.data?.errors || {});
    } finally {
      setSaving(false);
    }
  }

  const input = (name, label, placeholder, type = 'text', options = {}) => <label className={`form-field ${options.className || ''}`} key={name}>
    <span>{label}{options.required !== false && <b>*</b>}</span>
    {options.multiline ? <textarea value={values[name]} onChange={(event) => update(name, event.target.value)} placeholder={placeholder} rows={5} maxLength={2000} required aria-invalid={Boolean(fieldErrors[name])} /> :
      options.choices ? <select value={values[name]} onChange={(event) => update(name, event.target.value)} required={options.required !== false} aria-invalid={Boolean(fieldErrors[name])}><option value="" disabled>{placeholder}</option>{options.choices.map((choice) => <option key={choice}>{choice}</option>)}</select> :
        <input type={type} value={values[name]} onChange={(event) => update(name, event.target.value)} placeholder={placeholder} required={options.required !== false} min={type === 'number' ? '0' : undefined} max={type === 'number' ? '100' : undefined} step={type === 'number' ? '0.1' : undefined} maxLength={name === 'petName' ? 80 : undefined} aria-invalid={Boolean(fieldErrors[name])} />}
    {fieldErrors[name] && <small className="field-error">{fieldErrors[name]}</small>}
  </label>;

  return <form className="pet-form" onSubmit={submit} noValidate>
    <div className="form-grid">
      {input('petName', 'Pet name', 'e.g. Maple')}
      {input('animalType', 'Animal type', 'Choose an animal', 'text', { choices: ['Dog', 'Cat', 'Other'] })}
      {input('breed', 'Breed', 'e.g. Golden retriever')}
      {input('age', 'Age (years)', 'e.g. 2', 'number')}
      {input('gender', 'Gender', 'Choose gender', 'text', { choices: ['Male', 'Female', 'Unknown'] })}
      {input('location', 'Location', 'City or shelter name')}
      {input('adoptionStatus', 'Adoption status', 'Choose status', 'text', { choices: ['Available', 'Adopted'] })}
      {input('image', 'Pet photo URL', 'https://example.com/pet-photo.jpg', 'url', { required: false, className: 'form-span' })}
      {input('description', 'A little about this pet', 'Personality, favorite things, and what kind of home would suit them...', 'text', { multiline: true, className: 'form-span' })}
    </div>
    <p className="form-hint"><i className="bi bi-info-circle" /> Add a public image URL, or we’ll use a friendly pet photo for the animal type.</p>
    {error && <div className="inline-error" role="alert"><i className="bi bi-exclamation-circle" />{error}</div>}
    <button className="button button-primary form-submit" type="submit" disabled={saving}><i className={`bi ${saving ? 'bi-arrow-repeat spin' : 'bi-heart-fill'}`} />{saving ? 'Saving pet...' : submitLabel}</button>
  </form>;
}
