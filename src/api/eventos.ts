import { authApi } from "@/lib/axios";

export const getEventos = async (
    correo: string,
) =>
    await authApi.put(
        `/eventos/listar`,
        JSON.stringify({
            correo: correo,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );


export const getEventosDeCliente = async (correo: string) =>
    await authApi.get(`/eventos/listarTodos/${correo}`)