import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const incomingApi = {
  list: () => API.get('/incoming').then(r => r.data),
  create: (data: any) => API.post('/incoming', data).then(r => r.data),
  update: (id: number, data: any) => API.put(`/incoming/${id}`, data).then(r => r.data),
  remove: (id: number) => API.delete(`/incoming/${id}`).then(r => r.data),
};

export const outgoingApi = {
  list: () => API.get('/outgoing').then(r => r.data),
  create: (data: any) => API.post('/outgoing', data).then(r => r.data),
  update: (id: number, data: any) => API.put(`/outgoing/${id}`, data).then(r => r.data),
  remove: (id: number) => API.delete(`/outgoing/${id}`).then(r => r.data),
};

export const workflowApi = {
  list: () => API.get('/workflow').then(r => r.data),
  approve: (id: number, data: any) => API.put(`/workflow/${id}/approve`, data).then(r => r.data),
};