import axios from 'axios';

const instance = axios.create({
  baseUrl: 'http://localhost:3000/api/v1/'
});

instance.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${ token }`;
  }

  return config;
});

export default instance;