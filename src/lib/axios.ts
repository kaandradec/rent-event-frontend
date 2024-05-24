import axios from "axios";
import { useAuthStore } from "../store/auth";

const baseURL = "http://localhost:8080";

const authApi = axios.create({
  baseURL,
  withCredentials: false,
});


// ERROR TS asignar  objeto{ Authorization: string; } a onjeto de tipo AxiosRequestHeaders con más propiedades
// authApi.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;

//   config.headers = {
//     Authorization: `Bearer ${token}`,
//   }
//   return config;
// });

//SOLUCION: 

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  config.headers['Autorization'] = `Bearer ${token}`
  return config;
});

export default authApi;

