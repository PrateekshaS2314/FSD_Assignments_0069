import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { getErrorMessage, petApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import petPlaceholder from '../assets/pet-placeholder.svg';

const fallbackImages = {
  Dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=90',
  Cat: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=90',
  Other: petPlaceholder
};

export default function PetDetails() {
  const { id } = useParams();
  const { pets, deletePet, notify } = useApp();
  const { user } = useAuth();
  const [pet, setPet] = useState(() => pets.find((entry) => entry._id === id) || null);
  const [loading, setLoading] = useState(!pet);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const knownPet = pets.find((entry) => entry._id === id);
    if (knownPet) setPet(knownPet);
    petApi.get(id).then((result) => { if (active) { setPet(result); setError(''); } })
      .catch((requestError) => { if (active) setError(getErrorMessage(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, pets]);

  async function remove() {
    if (!window.confirm(`Remove ${pet.petName}'s listing and associated adoption requests?`)) return;
    try {
      await deletePet(id);
      notify(`${pet.petName}'s listing has been removed.`);
      navigate('/pets');
    } catch (requestError) {
      notify(getErrorMessage(requestError), 'error');
    }
  }

  if (loading && !pet) return <div className="page-wrap"><Loading label="Meeting your new friend..." /></div>;
  if (!pet) return <div className="page-wrap"><ErrorMessage message={error || 'This pet could not be found.'} /><Link className="button button-primary" to="/pets">Back to pets</Link></div>;

  return <div className="page-wrap details-page">
    <Link to="/pets" className="back-link"><i className="bi bi-arrow-left" /> Back to all pets</Link>
    <div className="details-layout">
      <div className="details-photo-wrap"><img className="details-photo" src={pet.image || fallbackImages[pet.animalType] || fallbackImages.Other} alt={pet.petName} onError={(event) => { event.currentTarget.src = fallbackImages.Other; }} /><span className={`availability-badge ${pet.adoptionStatus.toLowerCase()}`}>{pet.adoptionStatus === 'Available' ? 'Ready for a home' : 'Adopted'}</span><span className="photo-heart"><i className="bi bi-heart-fill" /></span></div>
      <article className="details-content">
        <div className="eyebrow">{pet.animalType.toUpperCase()} · {pet.gender.toUpperCase()}</div><h1>Meet {pet.petName}<span className="heading-period">.</span></h1>
        <p className="details-subtitle">{pet.breed} <span>·</span> {pet.age === 0 ? 'Under 1 year old' : `${pet.age} ${pet.age === 1 ? 'year' : 'years'} old`}</p>
        <div className="detail-meta"><span><i className="bi bi-geo-alt" />{pet.location}</span><span><i className="bi bi-heart" />{pet.adoptionStatus}</span></div>
        <div className="detail-description"><h2>A little about {pet.petName}</h2><p>{pet.description}</p></div>
        {pet.adoptionStatus === 'Available' ? <Link className="button button-primary adopt-button" to={`/pets/${pet._id}/adopt`}><i className="bi bi-heart-fill" /> I’d love to meet {pet.petName}</Link> : <div className="claimed-note"><i className="bi bi-check-circle-fill" /> {pet.petName} has found a home. There are more friends waiting for you!</div>}
        {user?.role === 'admin' && <div className="listing-actions"><Link className="small-action" to={`/pets/${pet._id}/edit`}><i className="bi bi-pencil" /> Edit listing</Link><button className="small-action delete-action" onClick={remove}><i className="bi bi-trash3" /> Remove pet</button></div>}
      </article>
    </div>
  </div>;
}
