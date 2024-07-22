import { authApi, tokenApi } from "@/lib/axios.ts";

export const obtenerGeneros = async () => {
    const response = await authApi.get(`/generos/get`);
    return response.data;
};
