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
        "http://localhost:8080/auth/user/register",
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
    contrasenia: string
) =>
    await axios.post(
        "http://localhost:8080/auth/register",
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

