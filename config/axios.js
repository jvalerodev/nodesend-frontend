import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.FRONTEND_URL
});

export default axiosClient;