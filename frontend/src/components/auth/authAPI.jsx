import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api/v1';

const authAPI = {
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/user/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/user/login`, credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/user/logout`);
    return response.data;
  }


};
export default authAPI;