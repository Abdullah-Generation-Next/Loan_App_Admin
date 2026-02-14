import axios from 'axios';

// API Configuration
// Update this with your actual API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('isAuthenticated');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminEmail');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  GET_LOANS: 'loans/all/list',
  GET_USERS: 'auth/users',
  // Add more endpoints as needed
  // GET_LOAN_BY_ID: '/loans/:id',
  // UPDATE_LOAN_STATUS: '/loans/:id/status',
};

export default apiClient;
