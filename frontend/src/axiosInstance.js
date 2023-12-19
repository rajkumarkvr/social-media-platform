// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.43.249:3000', 
  timeout: 10000, // Timeout after 10 seconds (adjust as needed)
  headers: {
    'Content-Type': 'application/json'
  },
});

export default axiosInstance;
