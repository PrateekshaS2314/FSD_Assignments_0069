import { Link } from 'react-router-dom';
import petPlaceholder from '../assets/pet-placeholder.svg';

const fallbackImages = {
  Dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85',
  Cat: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85',
  Other: petPlaceholder
};

export default function PetCard({ pet, manage = false, onDelete }) {
  const image = pet.image || fallbackImages[pet.animalType] || fallbackImages.Other;
  return <article className="pet-card">
    <Link to={`/pets/${pet._id}`} className="pet-card-image" aria-label={`Meet ${pet.petName}`}>
      <img src={image} alt={pet.petName} loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImages.Other; }} />
      <span className={`availability-badge ${pet.adoptionStatus.toLowerCase()}`}>{pet.adoptionStatus === 'Available' ? 'Ready for a home' : 'Adopted'}</span>
      <span className="pet-type-badge">{pet.animalType}</span>
    </Link>
    <div className="pet-card-content">
      <div className="pet-title-row"><Link to={`/pets/${pet._id}`}><h3>{pet.petName}</h3></Link><span className="pet-gender">{pet.gender === 'Male' ? '♂' : pet.gender === 'Female' ? '♀' : '·'}</span></div>
      <p className="pet-subtitle">{pet.breed} <span>·</span> {pet.age === 0 ? 'Under 1 year' : `${pet.age} ${pet.age === 1 ? 'year' : 'years'} old`}</p>
      <p className="pet-location"><i className="bi bi-geo-alt" />{pet.location}</p>
      <p className="pet-description">{pet.description}</p>
      {manage ? <div className="card-actions"><Link className="small-action" to={`/pets/${pet._id}/edit`}><i className="bi bi-pencil" /> Edit</Link><button className="small-action delete-action" onClick={() => onDelete(pet)}><i className="bi bi-trash3" /> Delete</button><Link className="small-action view-action" to={`/pets/${pet._id}`} aria-label="View pet"><i className="bi bi-arrow-up-right" /></Link></div> :
        <Link to={`/pets/${pet._id}`} className="card-view">Meet {pet.petName} <i className="bi bi-arrow-up-right" /></Link>}
    </div>
  </article>;
}
