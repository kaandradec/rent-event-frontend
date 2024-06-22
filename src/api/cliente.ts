import { tokenApi } from "@/lib/axios";
import axios from "axios";
import {code} from "@nextui-org/react";

export const obtenerCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/${encodeURIComponent(usuario)}`);
  return response.data;
};
export const obtenerDetallesCliente = async (usuario: string) => {
  const response = await tokenApi.get(`/clientes/detalles/${encodeURIComponent(usuario)}`);
  return response.data;
};

export const updateTelefonoRequestClient = async (
    email: string,
    prefijo: string,
    telefono: string
) =>
    await axios.post(
        `http://localhost:8080/clientes/actualizar/telefono/${code}`,
        JSON.stringify({
          correo: email,
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