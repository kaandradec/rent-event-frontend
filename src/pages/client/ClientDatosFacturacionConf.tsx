import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth";
import {actualizarDatosFacturacionClient, obtenerDatosFacturacionCliente} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {UserInfo} from "@/components/UserInfo";
import {Button, Input} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {BotonVolver} from "@/components/BotonVolver.tsx";


export const ClientDatosFacturacionConf = () => {

    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [direccion, setDireccion] = useState<string>("");
    const [numeroCedula, setNumeroCedula] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [editar, setEditar] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {

            if (correo == null) return
            const mensaje = await actualizarDatosFacturacionClient(correo, nombre, numeroCedula, direccion);

            if (mensaje.status == 200) {
                setSuccess(true)
                // setTimeout(() => {
                //         navigate("/account/config")
                //     },
                //     2500);
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
        if (direccion.length === 0 || numeroCedula.length === 0 || nombre.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        } else if (numeroCedula.length < 10) {
            setErrMsg("Cedula/ RUC/ Id invalido");
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
            if (correo == null) return

            const details = await obtenerDatosFacturacionCliente(correo);
            setNumeroCedula(details.cedula)
            setDireccion(details.direccion)
            setNombre(details.nombre)
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
            <section className="max-w-lg border-2 rounded-b-none rounded-3xl p-5 mx-auto">
                <form onSubmit={handleSubmit}>
                    <UserInfo/>
                    <h1 className="py-4 text-xl text-primary font-semibold">Datos para tus Facturas:</h1>
                    <div className="container flex align-super content-center ">

                        <div className="flex-auto">
                            <h1>Nombre Personal o Empresa</h1>
                            <Input
                                className="mb-3 h-11 "
                                color="primary"
                                name="Número Telefonico"
                                isDisabled={!editar}
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <h1>Cedula/ RUC/ Id</h1>
                            <Input
                                className="mb-3 h-11 "
                                type="number"
                                color="primary"
                                isDisabled={!editar}
                                value={numeroCedula}
                                onChange={(e) => setNumeroCedula(e.target.value)}
                            />
                            <h1>Direccion</h1>
                            <Input
                                className="mb-3 h-11 "
                                color="primary"
                                value={direccion}
                                isDisabled={!editar}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                            <p className={`h-5 text-center my-1 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                               aria-live="assertive">
                                {!success ? errMsg : '¡Cambio exitoso!'}
                            </p>
                            {!editar ?
                                (
                                    <>
                                        <Button variant="bordered"
                                                className="container flex max-w-52 h-14 font-semibold text-success dark:text-white"
                                                color={"success"}
                                                onClick={() => setEditar(true)}
                                                type="button">
                                            Editar Datos
                                        </Button>
                                    </>

                                )
                                :
                                <Button className="container flex max-w-52 h-14 font-semibold text-white dark:text-white"
                                        color={"success"}
                                        type="submit">
                                    Confirmar
                                </Button>
                            }
                        </div>
                    </div>
                </form>
                <div className="mt-2">
                <BotonVolver/>
                </div>
            </section>
        </main>
    );
};
