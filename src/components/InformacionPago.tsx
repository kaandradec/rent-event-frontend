import {Button, Input} from "@nextui-org/react";
import {obtenerDatosFacturacionCliente, obtenerTarjetasCliente} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";

interface InformacionPagoProps {
    setTotal: number;
}

export const InformacionPago: React.FC<InformacionPagoProps> = ({setTotal}) => {
    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [nombreFacturacion, setNombreFacturacion] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [numeroCedula, setNumeroCedula] = useState<string>("");
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
    const [nombreTarjeta, setNombreTarjeta] = useState("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [existeTarjeta, setExisteTarjeta] = useState(false);
    const [exiteInformacionPago, setExiteInformacionPago] = useState(false);

    const fetchClient = async () => {
        try {
            if (correo == null) return

            const datosFacturacion = await obtenerDatosFacturacionCliente(correo);
            const datosTarjeta = await obtenerTarjetasCliente(correo);
            const ultimaTarjeta = datosTarjeta.tarjetaResponseList[datosTarjeta.tarjetaResponseList.length - 1];
            // setNumeroTarjeta("")
            setNumeroTarjeta(ultimaTarjeta.token)
            setNombreTarjeta(ultimaTarjeta.nombreTarjeta)
            setNumeroCedula(datosFacturacion.cedula)
            setDireccion(datosFacturacion.direccion)
            setNombreFacturacion(datosFacturacion.nombre)

            setExisteTarjeta(!(numeroTarjeta == null || numeroTarjeta == "" || nombreTarjeta == ""));

            setExiteInformacionPago(!(nombreFacturacion == null || nombreFacturacion == ""));

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
        fetchClient()
    }, []);

    useEffect(() => {
        setExisteTarjeta(!(numeroTarjeta == null || numeroTarjeta == "" || nombreTarjeta == ""));
        setExiteInformacionPago(!(nombreFacturacion == null || nombreFacturacion == ""));
    }, [nombreFacturacion, nombreTarjeta, numeroTarjeta]);
    useEffect(() => {
        setExisteTarjeta(!(numeroTarjeta == null || numeroTarjeta == "" || nombreTarjeta == ""));
        setExiteInformacionPago(!(nombreFacturacion == null || nombreFacturacion == ""));
    }, [nombreFacturacion, nombreTarjeta, numeroTarjeta]);



    return (
        <section className="bg-white col-span-7 ls:col-span-5 lg:col-span-6 p-4 rounded-lg xl:ml-20">
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <h1 className="font-normal py-2">Tu Informacion para la Factura:</h1>
                        <h1 className="font-normal py-2">Tarjeta para el pago:</h1>

                    {exiteInformacionPago ?
                        <div className={""}>

                            <Input
                                type="text"
                                label="Nombre de la factura"
                                labelPlacement="outside"
                                value={nombreFacturacion}
                                isReadOnly
                            />
                            <Input
                                type="text"
                                label="Direccion de la factura"
                                labelPlacement="outside"
                                value={direccion}
                                className={"pt-4"}
                                isReadOnly
                            />
                            <Input
                                type="text"
                                label="Cedula/ RUC/ Id"
                                labelPlacement="outside"
                                value={numeroCedula}
                                className={"pt-4"}
                                isReadOnly
                            />
                            <Button
                                className="min-w-16 h-11 mt-4 mx-auto text-black dark:text-white text-lg flex flex-auto hover:bg-warning"
                                color={"default"}
                                onClick={() => navigate("/account/config/datos-facturacion")}
                            >
                                Cambia tus datos de facturacion
                            </Button>
                        </div>
                        :
                        <Button
                            className="min-w-16 h-14 mx-auto text-black dark:text-white text-lg  flex-auto"
                            color="warning"
                            onClick={() => navigate("/account/config/datos-facturacion")}
                        >
                            Añade datos de facturacion
                        </Button>

                    }

                    {existeTarjeta ?
                            <div>
                                <Input
                                    type="text"
                                    label="Propietario de la tarjeta"
                                    labelPlacement="outside"
                                    value={nombreTarjeta}
                                    isReadOnly
                                />
                                <Input
                                    type="text"
                                    label="Numero de la tarjeta"
                                    labelPlacement="outside"
                                    className="pt-4"
                                    value={numeroTarjeta}
                                    isReadOnly
                                />
                                <Button

                                    className="min-w-16 mb-14 h-11 mt-4 mx-auto text-black dark:text-white text-lg flex flex-auto hover:bg-warning "
                                    color={existeTarjeta ? "default" : "warning"}
                                    onClick={() => navigate("/account/config/tarjeta")}
                                >
                                    Cambia tu Tarjeta de pago
                                </Button>
                            </div>

                        :
                        <Button

                            className="min-w-36 h-14 mx-auto text-black dark:text-white text-lg flex-auto"
                            color="warning"
                            onClick={() => navigate("/account/config/tarjeta")}
                        >
                            Añade una Tarjeta
                        </Button>
                    }
                </div>

            </div>
        </section>
    )
}