import { authApi } from "@/lib/axios";
import axios from "axios";

export const loginRequest = async (correo: string, contrasenia: string) =>
    await authApi.post(
        "/auth/user/login",
        JSON.stringify({
            correo: correo,
            contrasenia: contrasenia,
        })
    );

export const registerRequest = async (
    nombre: string,
    apellido: string,
    email: string,
    contrasenia: string
) =>
    await axios.post(
        // "http://localhost:8080/auth/user/register",
        JSON.stringify({
            nombre: nombre,
            lastname: apellido,
            correo: email,
            contrasenia: contrasenia,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );


export const loginRequestClient = async (correo: string, contrasenia: string) =>
    await authApi.post(
        "/auth/login",
        JSON.stringify({
            correo: correo,
            contrasenia: contrasenia,
        })
    );

export const registerRequestClient = async (
    nombre: string,
    apellido: string,
    email: string,
    contrasenia: string,
    genero: string,
    prefijo: number,
    telefono: number,
    pais: string,
    ciudad: string
) =>
    await axios.post(
        // "http://localhost:8080/auth/register",
        JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            correo: email,
            contrasenia: contrasenia,
            genero: genero,
            prefijo: prefijo,
            telefono: telefono,
            pais: pais,
            ciudad: ciudad
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );
export const changePasswClient = async (
    email: string | null,
    contraseniaActual: string,
    contraseniaNueva: string,
) => {
    return await authApi.put(
        "/clientes/account/password",
        {
            correo: email,
            contraseniaActual: contraseniaActual,
            contraseniaNueva: contraseniaNueva,
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
};
export const changePassPreguntaCliente = async (
    email: string | null,
    contraseniaNueva: string,
) => {
    return await authApi.put(
        "/clientes/account/pregunta-password",
        {
            correo: email,
            contraseniaNueva: contraseniaNueva,
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
};

export const validarCorreo = async (correo: string) =>
    await authApi.put(
        "/correo/validar",
        JSON.stringify({
            correo: correo,
        })
    );