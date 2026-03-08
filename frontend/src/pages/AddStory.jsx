import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWoman } from '../utils/api';
import './AddStory.css';

const FIELDS = [
  'Science', 'Technology', 'Sports', 'Leadership',
  'Arts', 'Literature', 'Activism', 'Business',
  'Medicine', 'Education', 'Other',
];

const INITIAL = {
  name: '',
  field: '',
  nationality: '',
  birthYear: '',
  photoUrl: '',
  shortDescription: '',
  biography: '',
  achievements: '',
  quote: '',
  tags: '',
};

export default function AddStory() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
    if (name === 'photoUrl') setPreviewImage(value);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.field) e.field = 'Please select a field';
    if (!form.photoUrl.trim()) e.photoUrl = 'Photo URL is required';
    if (!form.shortDescription.trim()) e.shortDescription = 'Short description is required';
    else if (form.shortDescription.length > 300) e.shortDescription = 'Max 300 characters';
    if (!form.biography.trim()) e.biography = 'Biography is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setSubmitting(true);
      const res = await addWoman({
        ...form,
        birthYear: form.birthYear ? parseInt(form.birthYear) : undefined,
        achievements: form.achievements,
        tags: form.tags,
      });
      setSuccess(true);
      setTimeout(() => navigate(`/story/${res.data._id}`), 2000);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to add story. Is the backend running?' });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="add-story-success">
        <div className="success-icon">🎉</div>
        <h2>Story Added!</h2>
        <p>Redirecting to her story...</p>
      </div>
    );
  }

  return (
    <div className="add-story">
      <div className="add-story-header">
        <h1>Share an Inspiring Story</h1>
        <p>Help us celebrate a remarkable woman's journey</p>
      </div>

      <div className="add-story-container">
        <form onSubmit={handleSubmit} className="story-form" noValidate>

          {/* ── Basic Info ── */}
          <fieldset className="form-section">
            <legend>Basic Information</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input id="name" name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Marie Curie" className={errors.name ? 'error' : ''} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="field">Field *</label>
                <select id="field" name="field" value={form.field} onChange={handleChange}
                  className={errors.field ? 'error' : ''}>
                  <option value="">Select a field...</option>
                  {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                {errors.field && <span className="field-error">{errors.field}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input id="nationality" name="nationality" value={form.nationality}
                  onChange={handleChange} placeholder="e.g. Indian-American" />
              </div>
              <div className="form-group">
                <label htmlFor="birthYear">Birth Year</label>
                <input id="birthYear" name="birthYear" type="number" value={form.birthYear}
                  onChange={handleChange} placeholder="e.g. 1962" min="1" max="2010" />
              </div>
            </div>
          </fieldset>

          {/* ── Photo ── */}
          <fieldset className="form-section">
            <legend>Photo</legend>
            <div className="photo-section">
              <div className="form-group photo-group">
                <label htmlFor="photoUrl">Photo URL *</label>
                <input id="photoUrl" name="photoUrl" value={form.photoUrl} onChange={handleChange}
                  placeholder="https://example.com/photo.jpg" className={errors.photoUrl ? 'error' : ''} />
                {errors.photoUrl && <span className="field-error">{errors.photoUrl}</span>}
                <p className="field-hint">Use a direct image URL (Wikipedia, Wikimedia, etc.)</p>
              </div>
              {previewImage && (
                <div className="photo-preview">
                  <img
                    src={previewImage}
                    alt="Preview"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    onLoad={(e) => { e.target.style.display = 'block'; }}
                  />
                </div>
              )}
            </div>
          </fieldset>

          {/* ── Story ── */}
          <fieldset className="form-section">
            <legend>Her Story</legend>
            <div className="form-group">
              <label htmlFor="shortDescription">Short Description * <small>({form.shortDescription.length}/300)</small></label>
              <textarea id="shortDescription" name="shortDescription" value={form.shortDescription}
                onChange={handleChange} rows={3} maxLength={300}
                placeholder="A brief, powerful description of who she is and why she inspires..."
                className={errors.shortDescription ? 'error' : ''} />
              {errors.shortDescription && <span className="field-error">{errors.shortDescription}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="biography">Full Biography *</label>
              <textarea id="biography" name="biography" value={form.biography} onChange={handleChange}
                rows={8} placeholder="Tell her full story. Use blank lines to separate paragraphs..."
                className={errors.biography ? 'error' : ''} />
              {errors.biography && <span className="field-error">{errors.biography}</span>}
            </div>
          </fieldset>

          {/* ── Achievements & Quote ── */}
          <fieldset className="form-section">
            <legend>Achievements & Inspiration</legend>
            <div className="form-group">
              <label htmlFor="achievements">Key Achievements</label>
              <textarea id="achievements" name="achievements" value={form.achievements}
                onChange={handleChange} rows={5}
                placeholder={"First woman to...\nWon the Nobel Prize in...\nFounded..."} />
              <p className="field-hint">One achievement per line</p>
            </div>
            <div className="form-group">
              <label htmlFor="quote">Inspirational Quote</label>
              <textarea id="quote" name="quote" value={form.quote} onChange={handleChange}
                rows={3} maxLength={500} placeholder="Her most powerful words..." />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input id="tags" name="tags" value={form.tags} onChange={handleChange}
                placeholder="e.g. science, pioneer, Nobel Prize" />
              <p className="field-hint">Comma-separated tags</p>
            </div>
          </fieldset>

          {errors.submit && (
            <div className="submit-error">⚠️ {errors.submit}</div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Adding Story...' : '✨ Add Inspiring Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
