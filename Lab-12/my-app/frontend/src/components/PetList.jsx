import PetCard from './PetCard.jsx';

export default function PetList({ pets, manage = false, onDelete }) {
  return <div className="pet-grid">{pets.map((pet) => <PetCard key={pet._id} pet={pet} manage={manage} onDelete={onDelete} />)}</div>;
}
