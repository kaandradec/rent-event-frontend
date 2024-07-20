import {tokenApi} from "@/lib/axios.ts";

export const obtenerTiposTarjetas = async () => {
    const response = await tokenApi.get(`/tipos-tarjetas/get`);
    return response.data;
};
