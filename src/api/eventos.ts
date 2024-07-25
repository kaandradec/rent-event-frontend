import { tokenApi } from "@/lib/axios";

export const getEventos = async (
    correo: string,
) =>
    await tokenApi.put(
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
    await tokenApi.get(`/eventos/listarTodos/${correo}`)

export const getEventoPorCodigo = async (codigo: string | undefined) =>
    await tokenApi.get(`/eventos/obtener/${codigo}`)

export const cancelarEvento = async (codigo: string | undefined) =>
    await tokenApi.put(`/eventos/cancelar/${codigo}`)

export const enviarIncidencia = async (codigoServicio: string, descripcion: string) =>
    await tokenApi.put(`/eventos/guardarIncidencia`, JSON.stringify({
        codigoServicio: codigoServicio,
        descripcion: descripcion
    }), {
        headers: {
            "Content-Type": "application/json",
        }
    })
export const obtenerServiciosFactura = async (
    codEvento: string | undefined
) =>
    await tokenApi.put(
        `/servicios/facturar`,
        JSON.stringify({
            codEvento: codEvento
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );

