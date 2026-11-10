import SearchBar from './SearchBar.jsx';

export default function FilterSection({ filters, onChange }) {
  return <section className="filter-section" aria-label="Filter pets">
    <SearchBar value={filters.search} onChange={(search) => onChange({ ...filters, search })} />
    <label className="select-filter"><i className="bi bi-grid" /><select aria-label="Filter by animal type" value={filters.animalType} onChange={(event) => onChange({ ...filters, animalType: event.target.value })}><option value="">All pets</option><option>Dog</option><option>Cat</option><option>Other</option></select><i className="bi bi-chevron-down" /></label>
    <label className="select-filter"><i className="bi bi-hourglass-split" /><select aria-label="Filter by age" value={filters.age} onChange={(event) => onChange({ ...filters, age: event.target.value })}><option value="">Any age</option><option value="puppy">Under 1 year</option><option value="young">1–3 years</option><option value="adult">4–7 years</option><option value="senior">8+ years</option></select><i className="bi bi-chevron-down" /></label>
    <label className="select-filter"><i className="bi bi-heart" /><select aria-label="Filter by availability" value={filters.adoptionStatus} onChange={(event) => onChange({ ...filters, adoptionStatus: event.target.value })}><option value="">All statuses</option><option>Available</option><option>Adopted</option></select><i className="bi bi-chevron-down" /></label>
  </section>;
}
