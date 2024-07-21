import { tokenApi } from "@/lib/axios";

export const obtenerUsuario = async (usuario: string) => {
  const response = await tokenApi.get(`/usuarios/${encodeURIComponent(usuario)}`);
  return response.data;
};