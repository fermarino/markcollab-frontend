import axios from 'axios';

// 1. O Axios é configurado para usar a sua variável de ambiente como a URL base.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 2. Este interceptor injeta o token de autorização em cada requisição. (Está correto, sem alterações)
api.interceptors.request.use(config => {
  const t = localStorage.getItem('token');
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// 3. Este interceptor trata erros de 'Não Autorizado' (401), limpando o storage e redirecionando para o login. (Está correto, sem alterações)
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
