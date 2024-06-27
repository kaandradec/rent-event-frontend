import {tokenApi} from "@/lib/axios";

export const obtenerCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/${encodeURIComponent(usuario)}`);
  return response.data;
};
export const obtenerDetallesCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/detalles/${encodeURIComponent(usuario)}`);
  return response.data;
};

export const updateTelefonoRequestClient = async (
    correo: string | null,
    prefijo: string,
    telefono: string
) =>
    await tokenApi.put(
        `/clientes/actualizar/telefono`,
        JSON.stringify({
          correo: correo,
          prefijo: prefijo,
          telefono: telefono
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
    );
