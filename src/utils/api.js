import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzU3ZjI1OWQxMmE2OWI1Yjk5MTg1NDYxOGEzNjFiZiIsInN1YiI6IjY2MTJhYzFkMWZhMWM4MDE3Y2QzZTc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eTimtQEgdh3GN1K5yIRFdCwbm3gZc2HaCJs88h8ixO4';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
})

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default api