import axios from 'axios';

const baseUrl = 'http://localhost:3333';

const api = axios.create({ baseURL: baseUrl });

export default api;
