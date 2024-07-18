import React, {useState} from "react";
import {useAuthStore} from "@/store/auth";
import { registerTarjetaClient} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {UserInfo} from "@/components/UserInfo";
import {Button} from "@nextui-org/react";
import {Input} from "@/components/ui/input";
import {useNavigate} from "react-router-dom";
import {BotonVolver} from "@/components/BotonVolver.tsx";


export const ClientTarjetaConf = () => {

    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [prefijo, setPrefijo] = useState<string>("");
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [nuevo, setNuevo] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {

            if (correo == null) return
            const mensaje = await registerTarjetaClient(correo, nombre, numeroTarjeta, month, year, prefijo);
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
        if (prefijo.length === 0 || numeroTarjeta.length === 0 || month.length === 0 || year.length === 0 || nombre.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        } else if (prefijo.length > 5) {
            setErrMsg("Codigo de tarjeta invalido");
            return false;
        } else if (numeroTarjeta.length != 16) {
            setErrMsg("Numero de tarjeta invalido");
            return false;
        } else if (month.length > 2 || parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
            setErrMsg("Mes no existe");
            return false;
        } else if (year.length > 4 || parseInt(year, 10) < 2023) {
            setErrMsg("Año Incorrecto");
            return false;
        }
        return true;
    }
    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    };

    // const fetchClient = async () => {
    //     try {
    //         if (correo == null) return
    //
    //         const details = await obtenerTarjetasCliente(correo);
    //         setPrefijo(details.prefijo ?? "");
    //         setNumeroTarjeta(details.telefono ?? "");
    //     } catch (err) {
    //         const error = err as AxiosError;
    //         if (!error?.response) {
    //             setErrMsg("El servidor no responde");
    //         } else if (
    //             error.response?.status === 409 ||
    //             error.response?.data === "Bad credentials"
    //         ) {
    //             setErrMsg("Credenciales incorrectas");
    //         } else {
    //             setErrMsg("Error desconocido");
    //         }
    //         console.log(errMsg);
    //     }
    // };

    // useEffect(() => {
    //     fetchClient();
    // }, []);

    return (
        <main className="mt-40">
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form onSubmit={handleSubmit}>
                    <UserInfo/>
                    <div className="container flex align-super content-center ">
                        {nuevo ? (

                                <div className="flex-auto">
                                    <h1>Nombre Propietario</h1>
                                    <Input
                                        className="mb-3 h-11 border-2"
                                        color="primary"
                                        name="Número Telefonico"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <h1>Numero de tarjeta</h1>
                                    <Input
                                        className="mb-3 h-11 border-2"
                                        type="number"
                                        color="primary"
                                        value={numeroTarjeta}
                                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                                    />
                                    <h1>Codigo de seguridad</h1>
                                    <Input
                                        className="mb-3 h-11 border-2"
                                        type="number"
                                        color="primary"
                                        value={prefijo}
                                        onChange={(e) => setPrefijo(e.target.value)}
                                    />
                                    <h1>Fecha Expiracion</h1>
                                    <div className="grid grid-cols-2 gap-3">
                                        <h1>Mes:</h1>
                                        <h1>Año:</h1>
                                        <Input
                                            className="mb-3 h-11 border-2"
                                            color="primary"
                                            type="number"
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                        />
                                        <Input
                                            className="mb-3 h-11 border-2"
                                            color="primary"
                                            type="number"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                        />
                                    </div>
                                    <Button variant="bordered"
                                            className="container flex max-w-52 h-14 font-semibold text-success dark:text-white"
                                            color={"success"} type="submit">
                                        Añadir
                                    </Button>

                                </div>
                            )
                            : (
                                <div className="container flex">


                                    <Button variant="bordered"
                                            className="min-w-16 h-11 text-success dark:text-white text-lg  flex-auto"
                                            color="success"
                                            onClick={() => setNuevo(true)}
                                    >
                                        Añadir metodo de pago
                                    </Button>
                                </div>
                            )}
                    </div>
                </form>
                <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                   aria-live="assertive">
                    {!success ? errMsg : '¡Cambio exitoso!'}
                </p>
                <BotonVolver/>
            </section>
        </main>
    );
};
