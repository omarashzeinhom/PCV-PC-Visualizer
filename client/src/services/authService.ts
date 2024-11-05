// src/services/auth.service.ts
import axios from 'axios';

// Access the API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth/';

class AuthService {
  async register(username: string, password: string) {
    const response = await axios.post(`${API_URL}register`, { username, password });
    return response.data;
  }

  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data)); // Save user info and token
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}

export default new AuthService();
