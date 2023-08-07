const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

import axios from 'axios';

const API_BASE = 'http://localhost:8080';
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = (body) => axios.post(`${API_BASE}/register`, body);
export const login = (body) => axios.post(`${API_BASE}/login`, body);
export const fetchGuests = () => axiosInstance.get('/guests');
export const createGuest = (body) => axiosInstance.post('/register-user', body);
export const updatedGuest = (id, body) =>
  axiosInstance.put(`/guests/${id}`, body);
export const deleteGuest = (id) => axiosInstance.delete(`/guests/${id}`);
// import axios from 'axios';

// const baseURL = 'http://localhost:8080/';
// export const login = (name, email, password) =>
//   axios.post(`${baseURL}login`, { name, email, password });

// export const signUp = (name, email, password) =>
//   axios.post(`${baseURL}register`, { name, email, password });

// export const fetchGuests = (token) =>
//   axios.get(`${baseURL}guests`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const createGuest = (token, fistName, lastName, age, email) =>
//   axios.post(
//     `${baseURL}participants`,
//     { fistName, lastName, age, email },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

// export const deleteGuest = (token, guestId) =>
//   axios.delete(`${baseURL}participants/${guestId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const updateGuest = (token, guestId, firstName, lastName, age, email) =>
//   axios.put(
//     `${baseURL}participants/${guestId}`,
//     { firstName, lastName, age, email },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
