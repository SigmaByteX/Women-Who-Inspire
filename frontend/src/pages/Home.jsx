import { useNavigate } from 'react-router-dom';
import { useFeatured } from '../hooks/useWomen';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { featured, loading } = useFeatured();

  return (
    <div className="home">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">✦ International Women's Day</div>
          <h1 className="hero-title">
            Women Who
            <span className="hero-title-accent"> Inspire</span>
          </h1>
          <p className="hero-subtitle">
            Celebrating the remarkable women who shaped history, broke barriers,
            and continue to light the way for generations to come.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/explore')}>
              Explore Their Stories
            </button>
            <button className="btn-secondary" onClick={() => navigate('/add')}>
              Share a Story
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Inspiring Women</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Fields</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Impact</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll to discover</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* ── Woman of the Day ─────────────────────────────────── */}
      <section className="featured-section">
        <div className="section-header">
          <div className="section-badge">⭐ Featured</div>
          <h2 className="section-title">Woman of the Day</h2>
          <p className="section-sub">A daily spotlight on an extraordinary life</p>
        </div>

        {loading ? (
          <div className="featured-skeleton" />
        ) : featured ? (
          <div className="featured-card" onClick={() => navigate(`/story/${featured._id}`)}>
            <div className="featured-image-side">
              <img
                src={featured.photoUrl}
                alt={featured.name}
                className="featured-image"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(featured.name)}&background=7c3aed&color=fff&size=600`;
                }}
              />
              <div className="featured-image-overlay" />
            </div>
            <div className="featured-info">
              <span className="featured-field">{featured.field}</span>
              <h3 className="featured-name">{featured.name}</h3>
              {featured.nationality && (
                <p className="featured-nationality">🌍 {featured.nationality}</p>
              )}
              <p className="featured-description">{featured.shortDescription}</p>
              {featured.quote && (
                <blockquote className="featured-quote">
                  <span className="quote-mark">"</span>
                  {featured.quote}
                  <span className="quote-mark">"</span>
                </blockquote>
              )}
              <button className="btn-primary" onClick={(e) => {
                e.stopPropagation();
                navigate(`/story/${featured._id}`);
              }}>
                Read Full Story →
              </button>
            </div>
          </div>
        ) : (
          <p className="no-featured">No featured story available today.</p>
        )}
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explore by Field</h2>
        </div>
        <div className="categories-grid">
          {[
            { label: 'Science', icon: '🔬', color: '#7c3aed' },
            { label: 'Technology', icon: '💻', color: '#0ea5e9' },
            { label: 'Leadership', icon: '👑', color: '#10b981' },
            { label: 'Sports', icon: '🏆', color: '#f59e0b' },
            { label: 'Arts', icon: '🎨', color: '#ec4899' },
            { label: 'Activism', icon: '✊', color: '#ef4444' },
            { label: 'Business', icon: '📈', color: '#f97316' },
            { label: 'Literature', icon: '📚', color: '#8b5cf6' },
          ].map(({ label, icon, color }) => (
            <button
              key={label}
              className="category-card"
              style={{ '--cat-color': color }}
              onClick={() => navigate(`/explore?field=${label}`)}
            >
              <span className="category-icon">{icon}</span>
              <span className="category-label">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Know an inspiring woman?</h2>
          <p>Help us celebrate her story and share her journey with the world.</p>
          <button className="btn-primary large" onClick={() => navigate('/add')}>
            + Add Her Story
          </button>
        </div>
      </section>
    </div>
  );
}
