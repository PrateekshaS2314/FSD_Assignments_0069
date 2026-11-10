import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', timeout: 12000 });

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('pawconnect-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    window.sessionStorage.removeItem('pawconnect-token');
    window.dispatchEvent(new Event('pawconnect:unauthorized'));
  }
  return Promise.reject(error);
});

export const authApi = {
  register: (details) => api.post('/auth/register', details).then(({ data }) => data),
  login: (credentials) => api.post('/auth/login', credentials).then(({ data }) => data),
  profile: () => api.get('/auth/profile').then(({ data }) => data.user),
  admin: () => api.get('/auth/admin').then(({ data }) => data)
};

export const petApi = {
  list: (params) => api.get('/pets', { params }).then(({ data }) => data.pets),
  get: (id) => api.get(`/pets/${id}`).then(({ data }) => data.pet),
  create: (pet) => api.post('/pets', pet).then(({ data }) => data.pet),
  update: (id, pet) => api.put(`/pets/${id}`, pet).then(({ data }) => data.pet),
  remove: (id) => api.delete(`/pets/${id}`)
};

export const adoptionApi = {
  list: () => api.get('/requests').then(({ data }) => data.requests),
  get: (id) => api.get(`/requests/${id}`).then(({ data }) => data.request),
  create: (request) => api.post('/requests', request).then(({ data }) => data.request),
  update: (id, requestStatus) => api.put(`/requests/${id}`, { requestStatus }).then(({ data }) => data.request),
  remove: (id) => api.delete(`/requests/${id}`)
};

export function getErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ECONNABORTED') return 'The server took too long to respond. Please try again.';
  if (error.request) return 'Cannot reach the server. Check that the API is running and try again.';
  return error.message || 'Something went wrong. Please try again.';
}
