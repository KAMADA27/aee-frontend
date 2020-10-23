import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3040/api/v1/'
});

instance.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${ token }`;
  }

  return config;
});

export default instance;