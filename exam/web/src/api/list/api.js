import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const login = (body) => axios.post(`${API_BASE}/login`, body);
export const signUp = (name, email, password) =>
  axios.post(`${API_BASE}/register`, { name, email, password });

export const fetchGuests = (token) =>
  axios.get(`${API_BASE}/guests`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createGuest = async (token, firstName, lastName, age, email) => {
  const body = { firstName, lastName, age: Number(age), email };

  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.post(`${API_BASE}/guests`, body, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGuest = (token, guestId) =>
  axios.delete(`${API_BASE}/guests/${guestId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateGuest = (token, guestId, firstName, lastName, age, email) =>
  axios.put(
    `${API_BASE}/guests/${guestId}`,
    { firstName, lastName, age, email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
