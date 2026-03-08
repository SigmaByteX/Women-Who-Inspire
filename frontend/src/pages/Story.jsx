import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWoman, likeWoman } from '../utils/api';
import './Story.css';

export default function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [woman, setWoman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    getWoman(id)
      .then((res) => {
        setWoman(res.data);
        setLikeCount(res.data.likes || 0);
        // Check localStorage to persist like state
        const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
        setLiked(likedStories.includes(id));
      })
      .catch((err) => setError(err.response?.data?.message || 'Story not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (liked || liking) return;
    try {
      setLiking(true);
      const res = await likeWoman(id);
      setLikeCount(res.data.likes);
      setLiked(true);
      // Persist in localStorage
      const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
      localStorage.setItem('likedStories', JSON.stringify([...likedStories, id]));
    } catch (err) {
      console.error('Failed to like:', err);
    } finally {
      setLiking(false);
    }
  };

  if (loading) return <div className="story-loading"><div className="spinner" /></div>;
  if (error) return (
    <div className="story-error">
      <h2>⚠️ {error}</h2>
      <button onClick={() => navigate('/explore')}>← Back to Explore</button>
    </div>
  );
  if (!woman) return null;

  const lifespan = woman.deathYear
    ? `${woman.birthYear} – ${woman.deathYear}`
    : woman.birthYear
    ? `Born ${woman.birthYear}`
    : null;

  return (
    <div className="story">
      {/* Hero */}
      <div className="story-hero">
        <div className="story-hero-bg" style={{ backgroundImage: `url(${woman.photoUrl})` }} />
        <div className="story-hero-overlay" />
        <div className="story-hero-content">
          <button className="back-btn" onClick={() => navigate('/explore')}>
            ← Back
          </button>
          <span className="story-field">{woman.field}</span>
          <h1 className="story-name">{woman.name}</h1>
          {woman.nationality && <p className="story-nationality">🌍 {woman.nationality}</p>}
          {lifespan && <p className="story-lifespan">{lifespan}</p>}
        </div>
      </div>

      <div className="story-body">
        <div className="story-main">
          {/* Quote */}
          {woman.quote && (
            <div className="story-quote-block">
              <div className="quote-decoration">"</div>
              <blockquote>{woman.quote}</blockquote>
            </div>
          )}

          {/* Biography */}
          <section className="story-section">
            <h2 className="story-section-title">Biography</h2>
            <div className="story-bio">
              {woman.biography.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Achievements */}
          {woman.achievements?.length > 0 && (
            <section className="story-section">
              <h2 className="story-section-title">Key Achievements</h2>
              <ul className="achievements-list">
                {woman.achievements.map((a, i) => (
                  <li key={i} className="achievement-item">
                    <span className="achievement-icon">✦</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery */}
          {woman.gallery?.length > 0 && (
            <section className="story-section">
              <h2 className="story-section-title">Gallery</h2>
              <div className="gallery-grid">
                {woman.gallery.map((img, i) => (
                  <div key={i} className="gallery-item">
                    <img src={img.url} alt={img.caption || woman.name} />
                    {img.caption && <p className="gallery-caption">{img.caption}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="story-sidebar">
          <div className="story-portrait-card">
            <img
              src={woman.photoUrl}
              alt={woman.name}
              className="story-portrait"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(woman.name)}&background=7c3aed&color=fff&size=400`;
              }}
            />
          </div>

          {/* Like Button */}
          <div className="like-section">
            <button
              className={`like-btn ${liked ? 'liked' : ''} ${liking ? 'liking' : ''}`}
              onClick={handleLike}
              disabled={liked || liking}
            >
              <span className="like-heart">{liked ? '♥' : '♡'}</span>
              <span className="like-text">{liked ? 'Liked!' : 'Inspire Me'}</span>
              <span className="like-count">{likeCount}</span>
            </button>
            {liked && <p className="liked-message">Thanks for the love! 💜</p>}
          </div>

          {/* Tags */}
          {woman.tags?.length > 0 && (
            <div className="story-tags">
              <h4>Tags</h4>
              <div className="tags-list">
                {woman.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <button className="share-btn" onClick={() => {
            if (navigator.share) {
              navigator.share({ title: woman.name, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }
          }}>
            🔗 Share Her Story
          </button>
        </aside>
      </div>
    </div>
  );
}
