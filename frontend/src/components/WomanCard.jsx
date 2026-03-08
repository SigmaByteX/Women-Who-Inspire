import { useNavigate } from 'react-router-dom';
import './WomanCard.css';

const FIELD_COLORS = {
  Science: '#7c3aed',
  Technology: '#0ea5e9',
  Sports: '#f59e0b',
  Leadership: '#10b981',
  Arts: '#ec4899',
  Literature: '#8b5cf6',
  Activism: '#ef4444',
  Business: '#f97316',
  Medicine: '#06b6d4',
  Education: '#84cc16',
  Other: '#6b7280',
};

export default function WomanCard({ woman }) {
  const navigate = useNavigate();
  const color = FIELD_COLORS[woman.field] || FIELD_COLORS.Other;

  return (
    <article className="woman-card" onClick={() => navigate(`/story/${woman._id}`)}>
      <div className="card-image-wrapper">
        <img
          src={woman.photoUrl}
          alt={woman.name}
          className="card-image"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(woman.name)}&background=7c3aed&color=fff&size=400`;
          }}
        />
        <div className="card-overlay" />
        <span className="card-field" style={{ background: color }}>
          {woman.field}
        </span>
        <div className="card-likes">
          <span className="heart">♥</span>
          <span>{woman.likes || 0}</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-name">{woman.name}</h3>
        {woman.nationality && (
          <p className="card-nationality">🌍 {woman.nationality}</p>
        )}
        <p className="card-description">{woman.shortDescription}</p>

        <button className="card-btn">
          Read Her Story →
        </button>
      </div>
    </article>
  );
}
