import { useAuthStore } from "@/store/auth";
import axios from "axios";

const baseURL = "http://localhost:8080";

export const authApi = axios.create({
  baseURL,
  withCredentials: false,
});

export const authPass = axios.create({
  baseURL,
  withCredentials: false,
});

export const tokenApi = axios.create({
  baseURL,
  withCredentials: false,
});

export const dataFormApi = axios.create({
  baseURL,
  withCredentials: false,
});

// ERROR TS asignar  objeto{ Authorization: string; } a onjeto de tipo AxiosRequestHeaders con más propiedades
// authPass.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//
//   if (token) {
//     if (!config.headers) {
//       config.headers = {} as AxiosRequestHeaders; // Asegúrate de tipar correctamente los headers
//     }
//     const headers = config.headers as AxiosRequestHeaders;
//     headers['Authorization'] = `Bearer ${token}`;
//     headers['Content-Type'] = "application/json"; // Añadir Content-Type
//   }
//
//   return config;
// });


//SOLUCION: 

// authApi.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;

//   config.headers['Autorization'] = `Bearer ${token}`
//   return config;
// });

authApi.interceptors.request.use((config) => {

  config.headers['Content-Type'] = "application/json"
  return config;
});

tokenApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  config.headers['Content-Type'] = "application/json";
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

dataFormApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  config.headers['Content-Type'] = "multipart/form-data";
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});


