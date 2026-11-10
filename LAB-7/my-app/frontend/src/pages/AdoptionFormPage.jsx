import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useApp } from '../context/AppContext.jsx';
import { adoptionApi, getErrorMessage, petApi } from '../services/api.js';
import petPlaceholder from '../assets/pet-placeholder.svg';

export default function AdoptionFormPage() {
  const { id } = useParams();
  const { pets, notify } = useApp();
  const [pet, setPet] = useState(() => pets.find((entry) => entry._id === id) || null);
  const [loading, setLoading] = useState(!pet);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const knownPet = pets.find((entry) => entry._id === id);
    if (knownPet) setPet(knownPet);
    petApi.get(id).then((result) => { if (active) setPet(result); })
      .catch((requestError) => { if (active) setError(getErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, pets]);

  async function submit(values) {
    await adoptionApi.create(values);
    notify('Your adoption request has been sent. Thank you for opening your heart!');
    navigate('/requests');
  }

  if (loading && !pet) return <div className="page-wrap"><Loading label="Loading pet information..." /></div>;
  if (!pet) return <div className="page-wrap"><ErrorMessage message={error || 'This pet could not be found.'} /><Link to="/pets" className="button button-primary">Browse pets</Link></div>;
  if (pet.adoptionStatus !== 'Available') return <div className="page-wrap"><ErrorMessage message={`${pet.petName} is no longer available for adoption.`} /><Link to="/pets" className="button button-primary">Meet other pets</Link></div>;

  return <div className="page-wrap form-page">
    <Link to={`/pets/${id}`} className="back-link"><i className="bi bi-arrow-left" /> Back to {pet.petName}</Link>
    <div className="form-page-heading"><div className="eyebrow">THIS COULD BE THE BEGINNING</div><h1>Meet {pet.petName}<span className="heading-period">.</span></h1><p>Tell us about the home and love you have to share.</p></div>
    <div className="form-layout">
      <div className="form-main"><AdoptionForm pet={pet} onSubmit={submit} /></div>
      <aside className="form-aside"><img className="aside-pet-photo" src={pet.image || (pet.animalType === 'Cat' ? 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=500&q=80' : pet.animalType === 'Dog' ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80' : petPlaceholder)} alt={pet.petName} onError={(event) => { event.currentTarget.src = petPlaceholder; }} /><div className="eyebrow">{pet.animalType} · {pet.breed}</div><h3>{pet.petName} is waiting for their person.</h3><p>Your note goes straight to the people caring for {pet.petName}.</p></aside>
    </div>
  </div>;
}
