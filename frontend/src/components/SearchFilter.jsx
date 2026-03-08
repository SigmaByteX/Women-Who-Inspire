import { useState } from 'react';
import './SearchFilter.css';

const FIELDS = [
  'All',
  'Science',
  'Technology',
  'Sports',
  'Leadership',
  'Arts',
  'Literature',
  'Activism',
  'Business',
  'Medicine',
  'Education',
  'Other',
];

export default function SearchFilter({ params, onParamsChange }) {
  const [search, setSearch] = useState(params.search || '');

  const handleSearch = (e) => {
    e.preventDefault();
    onParamsChange({ ...params, search, page: 1 });
  };

  const handleField = (field) => {
    onParamsChange({
      ...params,
      field: field === 'All' ? undefined : field,
      page: 1,
    });
  };

  const handleClear = () => {
    setSearch('');
    onParamsChange({ page: 1 });
  };

  const activeField = params.field || 'All';

  return (
    <div className="search-filter">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inspiring women..."
            className="search-input"
          />
          {search && (
            <button type="button" className="search-clear" onClick={handleClear}>
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="filter-pills">
        {FIELDS.map((field) => (
          <button
            key={field}
            className={`filter-pill ${activeField === field ? 'active' : ''}`}
            onClick={() => handleField(field)}
          >
            {field}
          </button>
        ))}
      </div>
    </div>
  );
}
