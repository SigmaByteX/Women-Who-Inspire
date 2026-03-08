import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWomen } from '../hooks/useWomen';
import WomanCard from '../components/WomanCard';
import SearchFilter from '../components/SearchFilter';
import './Explore.css';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const { women, pagination, loading, error, params, setParams } = useWomen({
    field: searchParams.get('field') || undefined,
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    const field = searchParams.get('field');
    if (field) setParams((p) => ({ ...p, field, page: 1 }));
  }, [searchParams, setParams]);

  const handlePageChange = (newPage) => {
    setParams((p) => ({ ...p, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="explore">
      <div className="explore-header">
        <h1 className="explore-title">Explore Stories</h1>
        <p className="explore-sub">Discover the women who changed the world</p>
      </div>

      <div className="explore-container">
        <SearchFilter params={params} onParamsChange={setParams} />

        {error && (
          <div className="error-banner">
            ⚠️ {error} — Is the backend running?
          </div>
        )}

        {loading ? (
          <div className="cards-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card-skeleton" />
            ))}
          </div>
        ) : women.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No stories found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            <div className="results-meta">
              {pagination && (
                <span>{pagination.total} {pagination.total === 1 ? 'story' : 'stories'} found</span>
              )}
            </div>
            <div className="cards-grid">
              {women.map((woman) => (
                <WomanCard key={woman._id} woman={woman} />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={params.page <= 1}
              onClick={() => handlePageChange(params.page - 1)}
            >
              ← Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`page-num ${params.page === p ? 'active' : ''}`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              className="page-btn"
              disabled={params.page >= pagination.pages}
              onClick={() => handlePageChange(params.page + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
