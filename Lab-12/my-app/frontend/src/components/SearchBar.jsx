export default function SearchBar({ value, onChange, placeholder = 'Search pets by name, breed, or location...' }) {
  return <label className="search-box"><i className="bi bi-search" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label="Search pets" />{value && <button type="button" onClick={() => onChange('')} aria-label="Clear search"><i className="bi bi-x-lg" /></button>}</label>;
}
