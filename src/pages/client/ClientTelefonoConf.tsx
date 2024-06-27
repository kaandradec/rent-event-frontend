import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth";
import {obtenerDetallesCliente, updateTelefonoRequestClient} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {Input} from "@/components/ui/input";
import {UserInfo} from "@/components/UserInfo";
import {Button} from "@nextui-org/react";
import {SendIcon} from "@/components/icons/SendIcon";
import {useNavigate} from "react-router-dom";


export const ClientTelefonoConf = () => {

    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [prefijo, setPrefijo] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {

            if (correo == null) return
            const mensaje = await updateTelefonoRequestClient(correo, prefijo, telefono);
            if (mensaje.status == 200) {
                setSuccess(true)
                setTimeout(() => {
                        navigate("/account/config")
                    },
                    2500);
            }

        } catch (err) {

            const error = err as AxiosError;
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (error.response?.status === 409) {
                setErrMsg("Usuario ya registrado");
            } else {
                setErrMsg("Error desconocido");
            }
        }
    };
    const validateInputs = (): boolean => {
        if (prefijo.length === 0 || telefono.length === 0 || correo?.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        }
        return true;
    }
    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    };

    const fetchClient = async () => {
        try {
            const details = await obtenerDetallesCliente(correo || "");
            setPrefijo(details.prefijo ?? "");
            setTelefono(details.telefono ?? "");
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
        fetchClient();
    }, []);

    return (
        <main className="mt-40">
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <UserInfo/>
                    <div className="container flex align-super content-center gap-3">
                        <Input
                            className="max-w-8 h-14 border-0"
                            type="text"
                            color="disable"
                            value="+"
                            readOnly
                        />
                        <Input
                            className="max-w-16 mb-3 h-14 border-2"
                            type="number"
                            color="primary"
                            name="Prefijo Telefonico"
                            value={prefijo}
                            onChange={(e) => setPrefijo(e.target.value)}
                        />
                        <Input
                            className="mb-3 h-14 border-2"
                            type="number"
                            color="primary"
                            name="Número Telefonico"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        <Button isIconOnly variant="bordered" className="min-w-16 h-14 text-black dark:text-white"
                                color="success" type="submit">
                            <SendIcon/>
                        </Button>
                    </div>
                </form>
                {errMsg && <p className="text-red-500">{errMsg}</p>}
                <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                   aria-live="assertive">
                    {!success ? errMsg : '¡Cambio exitoso!'}
                </p>
            </section>
        </main>
    );
};
