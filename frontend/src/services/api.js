import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify')
};

export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard')
};

export const transactionsAPI = {
  getTransactions: (params) => api.get('/transactions', { params }),
  getTransaction: (id) => api.get(`/transactions/${id}`),
  getLocations: () => api.get('/transactions/meta/locations')
};

export const statementsAPI = {
  getStatements: () => api.get('/statements'),
  getStatement: (id) => api.get(`/statements/${id}`),
  generateStatement: (data) => api.post('/statements/generate', data)
};

export const paymentAPI = {
  processPayment: (data) => api.post('/payment', data),
  validateRecipient: (data) => api.post('/payment/validate', data)
};

export const businessAPI = {
  getBusinessInfo: () => api.get('/business'),
  updateBusinessInfo: (data) => api.put('/business', data)
};

export default api;

