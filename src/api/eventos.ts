import {authApi} from "@/lib/axios";

export const getEventos = async (
    correo: string,
) =>
    await authApi.put(
        `/facturas/listar`,
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
