import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.90.154.52:5066/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;