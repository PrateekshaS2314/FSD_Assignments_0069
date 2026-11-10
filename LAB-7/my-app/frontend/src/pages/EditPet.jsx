import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import PetForm from '../components/PetForm.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { getErrorMessage, petApi } from '../services/api.js';

export default function EditPet() {
  const { id } = useParams();
  const { pets, updatePet, notify } = useApp();
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

  if (loading && !pet) return <div className="page-wrap"><Loading label="Loading pet details..." /></div>;
  if (!pet) return <div className="page-wrap"><ErrorMessage message={error || 'This pet could not be found.'} /><Link to="/pets" className="button button-primary">Browse pets</Link></div>;

  async function submit(values) {
    const updated = await updatePet(id, values);
    notify(`${updated.petName}'s listing has been updated.`);
    navigate(`/pets/${updated._id}`);
  }

  return <div className="page-wrap form-page">
    <Link to={`/pets/${id}`} className="back-link"><i className="bi bi-arrow-left" /> Back to {pet.petName}</Link>
    <div className="form-page-heading"><div className="eyebrow">KEEP THIS PROFILE UP TO DATE</div><h1>Edit {pet.petName}<span className="heading-period">.</span></h1><p>Update this pet’s details and adoption availability.</p></div>
    <div className="form-main edit-form-main"><PetForm pet={pet} submitLabel="Save pet details" onSubmit={submit} /></div>
  </div>;
}
