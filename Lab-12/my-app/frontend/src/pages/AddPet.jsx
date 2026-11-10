import { Link, useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function AddPet() {
  const { createPet, notify } = useApp();
  const navigate = useNavigate();

  async function submit(values) {
    const pet = await createPet(values);
    notify(`${pet.petName} is now listed. Thanks for helping find them a home!`);
    navigate(`/pets/${pet._id}`);
  }

  return <div className="page-wrap form-page">
    <Link to="/pets" className="back-link"><i className="bi bi-arrow-left" /> Back to pets</Link>
    <div className="form-page-heading"><div className="eyebrow">HELP A GOOD FRIEND FIND HOME</div><h1>Add a pet<span className="heading-period">.</span></h1><p>Tell us a little about the lovely animal looking for their person.</p></div>
    <div className="form-layout"><div className="form-main"><PetForm submitLabel="Add this sweet pet" onSubmit={submit} /></div><aside className="form-aside"><span className="aside-icon"><i className="bi bi-heart-fill" /></span><h3>A good match starts with a good story</h3><p>Share what makes this pet special. A clear photo and a few personality details help future families picture life together.</p><div className="aside-tip"><i className="bi bi-shield-heart" /><span>Only post pets you’re authorized to place for adoption.</span></div><div className="switch-report"><i className="bi bi-stars" /> Every pet deserves a safe, loving home.</div></aside></div>
  </div>;
}
