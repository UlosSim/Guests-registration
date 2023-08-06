import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const signUp = (body) => axios.post(`${API_BASE}/register`, body);
export const login = (body) => axios.post(`${API_BASE}/login`, body);

export const fetchGuests = (token) =>
  axios.get(`${API_BASE}/guests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createGuest = (body) =>
  axios.post(`${API_BASE}/register-user`, body);
export const updatedGuest = (id, body) =>
  axios.put(`${API_BASE}/guests/${id}`, body);
export const deleteGuest = (id) => axios.delete(`${API_BASE}/guests/${id}`);
