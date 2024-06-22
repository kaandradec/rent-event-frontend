import {Avatar} from "@nextui-org/react";
import {obtenerCliente} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth.ts";
import {obtenerUsuario} from "@/api/usuario.ts";

export const UserInfo = () => {
    const {correo: correo} = useAuthStore();
    const rol = useAuthStore.getState().rol;

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [errMsg, setErrMsg] = useState("");


    const fetchFullClient = async () => {
        try {
            if (!correo) {
                throw new Error("Correo no definido");
            }
            const data = rol?.startsWith('C') ?
                await obtenerCliente(correo) : await obtenerUsuario(correo);
            setFirstname(data.nombre ?? "");
            setLastname(data.apellido ?? "");
            setEmail(data.correo ?? "");
        } catch (err) {
            const error = err as AxiosError;
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (
                error.response?.status === 409 ||
                error.response?.data === "Bad credentials"
            ) {
                setErrMsg("Credenciales incorrectas");
            } else {
                setErrMsg("Error desconocido");
            }
            console.log(errMsg);
        }
    };
    useEffect(() => {
        fetchFullClient();
    }, []);


    return <div className="container flex">
        <Avatar isBordered color="secondary" radius="lg" src={"/lunacat.png"}
                className="object-contain min-w-12 min-h-12 sm:w-20 sm:h-20 mb-5"/>
        <div className="ml-5">
            <h2 className="mb-2 text-2xl font-medium">{email}</h2>
            <h3 className="mb-2 text-lg font-medium">{firstname + " " + lastname}</h3>
        </div>
    </div>
}