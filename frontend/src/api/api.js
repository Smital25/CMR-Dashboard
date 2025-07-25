import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Auth
export const registerUser = (userData) => axios.post(`${BASE_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${BASE_URL}/auth/login`, userData);

// Clients
export const getClients = (token) =>
  axios.get(`${BASE_URL}/clients`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createClient = (data, token) =>
  axios.post(`${BASE_URL}/clients`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateClient = (id, data, token) =>
  axios.put(`${BASE_URL}/clients/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteClient = (id, token) =>
  axios.delete(`${BASE_URL}/clients/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getTaskStats = (token) =>
  axios.get(`${BASE_URL}/tasks/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// ✅ Add or confirm all these are exported
export const getTasks = (token) =>
  axios.get(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = (data, token) =>
  axios.post(`${BASE_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = (id, data, token) =>
  axios.put(`${BASE_URL}/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (id, token) =>
  axios.delete(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
