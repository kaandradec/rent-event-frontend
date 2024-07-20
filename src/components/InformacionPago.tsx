import {Button, Input} from "@nextui-org/react";
import {obtenerDatosFacturacionCliente, obtenerTarjetasCliente} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";

export const InformacionPago = () => {
    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [nombreFacturacion, setNombreFacturacion] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [numeroCedula, setNumeroCedula] = useState<string>("");
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
    const [nombreTarjeta, setNombreTarjeta] = useState("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [existeTarjeta, setExisteTarjeta] = useState(
        false);
    const [exiteInformacionPago, setExiteInformacionPago] = useState(false);

    const fetchClient = async () => {
        try {
            if (correo == null) return

            const datosFacturacion = await obtenerDatosFacturacionCliente(correo);
            const datosTarjeta = await obtenerTarjetasCliente(correo);
            setNumeroTarjeta(datosTarjeta.tarjetaResponseList[0].token)
            setNombreTarjeta(datosTarjeta.tarjetaResponseList[0].nombreTarjeta)
            setNombreFacturacion(datosFacturacion.nombre)
            setNumeroCedula(datosFacturacion.cedula)
            setDireccion(datosFacturacion.direccion)

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
    }, [
        numeroTarjeta
    ]);
    useEffect(() => {
        setExisteTarjeta(!(numeroTarjeta == null || numeroTarjeta == "" || nombreTarjeta == ""));
        setExiteInformacionPago(!(nombreFacturacion == null || nombreFacturacion == ""));
    }, [
        nombreFacturacion
    ]);



    return (
        <section className="bg-white col-span-7 ls:col-span-5 lg:col-span-6 p-4 rounded-lg xl:ml-20">
            <div className="flex flex-col gap-2">
                <h1 className="font-normal mt-4 py-2">Tu Informacion para la Factura:</h1>
                {exiteInformacionPago ?
                    <div>
                        <Input
                            type="text"
                            label="Nombre de la factura"
                            labelPlacement="outside"
                            value={nombreFacturacion}
                            isDisabled
                        />
                        <Input
                            type="text"
                            label="Direccion de la factura"
                            labelPlacement="outside"
                            value={direccion}
                            isDisabled
                        />
                        <Input
                            type="text"
                            label="Cedula/ RUC/ Id"
                            labelPlacement="outside"
                            value={numeroCedula}
                            isDisabled
                        />
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
                <h1 className="font-normal mt-8 py-2">Tarjeta para el pago:</h1>
                {existeTarjeta ?
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                type="text"
                                label="Propietario de la tarjeta"
                                labelPlacement="outside"
                                value={nombreTarjeta}
                                isDisabled
                            />
                            <Input
                                type="text"
                                label="Numero de la tarjeta"
                                labelPlacement="outside"
                                className="pt-2"
                                value={numeroTarjeta}
                                isDisabled
                            />
                        </div>
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
        </section>
    )
}