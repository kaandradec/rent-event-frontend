import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    token: string | null;
    rol: string | null;
    nombre: string | null;
    apellido: string | null;
    correo: string | null;
}
type Actions = {
    setToken: (token: string | null) => void;
    setRol: (rol: string | null) => void;
    setNombre: (nombre: string | null) => void;
    setApellido: (apellido: string | null) => void;
    setCorreo: (correo: string | null) => void;
}

export const useAuthStore = create(persist<State & Actions>(
    (set) => ({
        token: null,
        rol: null,
        nombre: null,
        apellido: null,
        correo: null,
        setToken: (token: string | null) => set((state) => ({
            token: state.token = token,
        })),
        setRol: (rol: string | null) => set((state) => ({
            rol: state.rol = rol,
        })),
        setNombre: (nombre: string | null) => set((state) => ({
            nombre: state.nombre = nombre,
        })),
        setApellido: (apellido: string | null) => set((state) => ({
            apellido: state.apellido = apellido,
        })),
        setCorreo: (correo: string | null) => set((state) => ({
            correo: state.correo = correo,
        })),
    }),
    {
        name: "auth",
    }
));