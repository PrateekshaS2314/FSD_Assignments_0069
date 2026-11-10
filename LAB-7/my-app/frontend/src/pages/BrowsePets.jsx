import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterSection from '../components/FilterSection.jsx';
import PetList from '../components/PetList.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { getErrorMessage, petApi } from '../services/api.js';
import useDebouncedValue from '../hooks/useDebouncedValue.js';

export default function BrowsePets() {
  const [filters, setFilters] = useState({ search: '', animalType: '', age: '', adoptionStatus: 'Available' });
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const search = useDebouncedValue(filters.search);

  useEffect(() => {
    let active = true;
    async function loadPets() {
      setLoading(true);
      setError('');
      try {
        const query = { ...filters, search };
        const results = await petApi.list(Object.fromEntries(Object.entries(query).filter(([, value]) => value)));
        if (active) setPets(results);
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadPets();
    return () => { active = false; };
  }, [filters.animalType, filters.age, filters.adoptionStatus, search, retry]);

  return <div className="page-wrap browse-page">
    <div className="page-intro"><div className="eyebrow">YOUR NEW BEST FRIEND COULD BE HERE</div><h1>Meet the pets<span className="heading-period">.</span></h1><p>Each one has a whole lot of love to give. Who will you choose?</p><div className="intro-counter"><i className="bi bi-heart-fill" /> {pets.length} lovely {pets.length === 1 ? 'pet' : 'pets'}</div></div>
    <FilterSection filters={filters} onChange={setFilters} />
    <div className="results-heading"><h2>{filters.adoptionStatus || 'All'} pets</h2><span>{!loading && `${pets.length} ${pets.length === 1 ? 'friend' : 'friends'}`}</span></div>
    {loading ? <Loading /> : error ? <ErrorMessage message={error} onRetry={() => setRetry((value) => value + 1)} /> : pets.length ? <PetList pets={pets} /> :
      <div className="empty-state"><span className="empty-icon"><i className="bi bi-search-heart" /></span><h2>No matches this time</h2><p>Try adjusting your filters, or add a pet who could use a loving home.</p><Link className="button button-primary" to="/pets/new">Add a pet <i className="bi bi-arrow-up-right" /></Link></div>}
  </div>;
}
