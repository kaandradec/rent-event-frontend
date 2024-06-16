import { tokenApi } from "@/lib/axios";

export const obtenerCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/${encodeURIComponent(usuario)}`);
  return response.data;
};