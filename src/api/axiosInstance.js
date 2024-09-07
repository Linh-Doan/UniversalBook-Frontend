import axios from 'axios';
import { apiBaseUrl } from '../config.js';

// axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: apiBaseUrl,
});

export default axiosInstance;
