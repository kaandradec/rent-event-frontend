import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/auth";

const baseURL = "http://localhost:8080";

const authApi = axios.create({
  baseURL,
  withCredentials: false,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  config.headers = {
    Authorization: `Bearer ${token}`,
  }
  return config;
});

export default authApi;