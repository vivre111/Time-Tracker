import axios from 'axios';
import Cookies from 'js-cookie';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000/api', // Base URL for all requests
});

// Add a request interceptor to attach the token to every request
axiosApi.interceptors.request.use(
    config => {
        const token = Cookies.get('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle unauthorized access globally
axiosApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Assuming you are using react-router
            // You need to configure to use useHistory or navigate outside of components
            window.location = '/login'; // Simplest redirection, or use your routing logic
        }
        return Promise.reject(error);
    }
);

export default axiosApi;
