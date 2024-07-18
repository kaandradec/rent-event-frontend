import {tokenApi} from "@/lib/axios";

export const obtenerCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/${encodeURIComponent(usuario)}`);
  return response.data;
};
export const obtenerDetallesCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/detalles/${encodeURIComponent(usuario)}`);
  return response.data;
};
export const obtenerDatosFacturacionCliente = async (usuario: string) => {
    const response = await tokenApi.get(`/clientes/account/datos-facturacion/${encodeURIComponent(usuario)}`);
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
export const updateRegionRequestClient = async (
    correo: string | null,
    pais: string,
    region: string
) =>
    await tokenApi.put(
        `/clientes/actualizar/region`,
        JSON.stringify({
          correo: correo,
          pais: pais,
          region: region
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
    );
export const registerTarjetaClient = async (
    correo: string ,
    nombre: string ,
    tarjeta: string,
    mes: string,
    anio: string,
    codigo: string
) =>
    await tokenApi.put(
        `/clientes/account/tarjeta/nueva`,
        JSON.stringify({
            correo: correo,
            nombre: nombre,
            numero: tarjeta,
            codSeguridad: codigo,
            mes: mes,
            anio: anio

        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );
export const actualizarDatosFacturacionClient = async (
    correo: string ,
    nombre: string ,
    id: string,
    direccion: string
) =>
    await tokenApi.put(
        `/clientes/account/datos-facturacion/actualizar`,
        JSON.stringify({
            correo: correo,
            nombre: nombre,
            cedula: id,
            direccion: direccion,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );
