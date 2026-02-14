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
    // Only redirect on 401 for GET requests (not for PUT/POST/DELETE updates)
    // This prevents redirecting when update operations fail due to auth
    if (error.response?.status === 401) {
      const method = error.config?.method?.toUpperCase();
      // Only redirect for GET requests, not for update operations
      if (method === 'GET') {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminEmail');
        window.location.href = '/';
      }
      // For PUT/POST/DELETE, just reject the error so the component can handle it
    }
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  GET_LOANS: 'loans/all/list',
  GET_USERS: 'auth/users',
  UPDATE_LOAN: (id) => `loans/${id}`,
  UPDATE_USER: (id) => `auth/users/${id}`,
  UPDATE_LOAN_STATUS: (id) => `loans/${id}/status`,
};

export default apiClient;
