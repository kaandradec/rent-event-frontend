import {tokenApi} from "@/lib/axios.ts";

export const obtenerGeneros = async () => {
    const response = await tokenApi.get(`/generos/get`);
    return response.data;
};
