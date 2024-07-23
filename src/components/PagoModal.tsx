import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {obtenerDatosFacturacionCliente, obtenerTarjetasCliente} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth.ts";
import {useNavigate} from "react-router-dom";
import {hacerPagoCliente} from "@/api/pagos.ts";

export const PagoModal = ({isOpenPago, onClosePago, handleCerrarPago, total, pagoAnterior, evento }) => {
    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [nombreFacturacion, setNombreFacturacion] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [numeroCedula, setNumeroCedula] = useState<string>("");
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
    const [pago, setPago] = useState<string>("");
    const [nombreTarjeta, setNombreTarjeta] = useState("");
    const [isPagoValido, setIsPagoValido] = useState(false);
    const [errMsg, setErrMsg] = useState<string>("");
    const [success, setSuccess] = useState(false);


    const fetchClient = async () => {
        try {
            if (correo == null) return

            const datosFacturacion = await obtenerDatosFacturacionCliente(correo);
            const datosTarjeta = await obtenerTarjetasCliente(correo);
            const ultimaTarjeta = datosTarjeta.tarjetaResponseList[datosTarjeta.tarjetaResponseList.length - 1];
            setNumeroTarjeta(ultimaTarjeta.token)
            setNombreTarjeta(ultimaTarjeta.nombreTarjeta)
            setNumeroCedula(datosFacturacion.cedula)
            setDireccion(datosFacturacion.direccion)
            setNombreFacturacion(datosFacturacion.nombre)

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
    const handlePagar = async () => {
        try {
            if (correo == null) return

            const datosFacturacion =
                await hacerPagoCliente(evento,nombreTarjeta,numeroTarjeta,direccion,nombreFacturacion,numeroCedula,parseFloat(pago))
            console.log(datosFacturacion)
            datosFacturacion.status==200?setSuccess(true):"";
            datosFacturacion.status==200?navigate("/eventos"):"";

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

    return (
        <Modal backdrop='blur' isOpen={isOpenPago} onClose={onClosePago}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Completa el valor del evento:</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-2 gap-5">
                                <div className={"col-span-2 mb-2"}>
                                    <Input
                                        type="number"
                                        inputMode={"numeric"}
                                        label="Monto"
                                        labelPlacement="outside"
                                        value={pago}
                                        className={"mt-4"}
                                        onChange={(value)=> {
                                            setPago(value.target.value)
                                            setIsPagoValido(parseFloat(value.target.value)===(total-pagoAnterior))
                                        }}
                                        description={!isPagoValido?`Valor a completar: ${total-pagoAnterior}`:""}
                                    />
                                </div>

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
                                        className="min-w-16 h-11 mt-2 text-black dark:text-white text-medium w-full hover:bg-warning"
                                        color={"default"}
                                        onClick={() => navigate("/account/config/datos-facturacion")}
                                    >
                                        Cambia tus Datos
                                    </Button>
                                </div>


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

                                        className="min-w-16 mb-14 h-11 mt-2 text-black dark:text-white text-medium hover:bg-warning w-full"
                                        color={"default"}
                                        onClick={() => navigate("/account/config/tarjeta")}
                                    >
                                        Cambiar Tarjeta
                                    </Button>

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {errMsg && <p className="text-red-500">{errMsg}</p>}
                            <p className={`h-5 text-center my-2 ${success ? "text-success" : "text-danger"}`}
                               aria-live="assertive">
                                {!success ? errMsg : "Evento Registrado con Exito"}
                            </p>
                            <Button color="success" onPress={handleCerrarPago} onClick={handlePagar}>
                                Pagar Evento
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}