import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const login = (email, password) => {
    return axios.post(`${BASE_URL}/auth/login`, { email, password }, { withCredentials: true });
};

export const logout = () => {
    return axios.post(`${BASE_URL}/auth/logout`,{}, { withCredentials: true });
};
