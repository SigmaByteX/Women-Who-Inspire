import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Women API ─────────────────────────────────────────────────────

export const getWomen = (params = {}) =>
  API.get('/women', { params }).then((r) => r.data);

export const getFeatured = () =>
  API.get('/women/featured').then((r) => r.data);

export const getWoman = (id) =>
  API.get(`/women/${id}`).then((r) => r.data);

export const addWoman = (data) =>
  API.post('/women', data).then((r) => r.data);

export const likeWoman = (id) =>
  API.patch(`/women/${id}/like`).then((r) => r.data);

export const updateWoman = (id, data) =>
  API.put(`/women/${id}`, data).then((r) => r.data);

export const deleteWoman = (id) =>
  API.delete(`/women/${id}`).then((r) => r.data);

export default API;
