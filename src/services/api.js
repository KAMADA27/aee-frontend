import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/v1/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*"
  }
});

instance.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${ token }`;
  }

  return config;
});

export default instance;