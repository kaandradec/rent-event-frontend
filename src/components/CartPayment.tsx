import { Coins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FormattedPrice from "./FormattedPrice";
import { useAuthStore } from "@/store/auth";
import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { SetStateAction, useEffect, useState } from "react";
import {registerEventoClient} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {StoreProduct} from "../../types.ts";

interface CartPaymentProps {
    setAsistentes: React.Dispatch<SetStateAction<number>>;
    isSelected: boolean;
    setIsSelected: React.Dispatch<SetStateAction<boolean>>;
    subtotal: () => number;
    costoTransporte: () => number;
    totalIva: () => number;
    asistentes: number;
    totalPrice: () => number;
    confirmado: boolean;
    setConfirmado: (valor: boolean) => boolean;
    region: string;
    correo: string ;
    nombreTargeta: string ;
    numeroTarjeta: string;
    fecha: string;
    direccionFactura: string;
    nombreFactura: string;
    pais: string;
    ciudad: string;
    numeroCedula:number;
    nombreEvento: string;
    descripcionEvento: string;
    callePrincipal: string;
    calleSecundaria: string;
    referencia: string;
    cart: StoreProduct[]
}

const CartPayment = ({
                         asistentes,
                         isSelected,
                         setAsistentes,
                         setIsSelected,
                         subtotal,
                         costoTransporte,
                         totalIva,
                         totalPrice,
                         confirmado,
                         setConfirmado,
                         region,
                         correo,
                         nombreTargeta,
                         numeroTarjeta,
                         fecha,
                         direccionFactura,
                         nombreFactura,
                         pais,
                         ciudad,
                         numeroCedula,
                         nombreEvento,
                         descripcionEvento,
                         callePrincipal,
                         calleSecundaria,
                         referencia,
                         cart,
                     }: CartPaymentProps) => {
    // const cart = useStore((state) => state.cart);

    const rol = useAuthStore.getState().rol;
    const [valido, setValido] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");
    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();
    useEffect(() => {
        setValido(region == "" || region === "Ciudad" || region === "Elige una ciudad")
    }, [region]);

    const registrarEvento = async () => {
        try {
            if (correo == null) return;

            const response = await registerEventoClient(
                correo, nombreTargeta, numeroTarjeta, fecha.toString(),
                direccionFactura, nombreFactura, pais, ciudad,numeroCedula, nombreEvento,
                descripcionEvento, callePrincipal, calleSecundaria, referencia,
                asistentes.toString(), cart);
            if (response.status == 200) {
                setSuccess(true)
                setTimeout(() => {
                        navigate("/eventos")
                    },
                    2500);
            }

            console.log(response);
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

    return (
        <>
            <section className="flex flex-col gap-4 mt-24">
                <div>
                    <Input
                        type="number"
                        label="Numero de asistentes"
                        labelPlacement="outside"
                        placeholder="0"
                        max={1000}
                        maxLength={4}
                        min={1}
                        description="Ingrese el numero de asistentes para el evento, GRATIS para menos de 20 asistentes."
                        onValueChange={(value) => setAsistentes(parseInt(value))}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Transporte</label>
                        <Checkbox isSelected={isSelected} size="sm" color="success" onValueChange={setIsSelected}>
                            Incluir trasporte para asistentes
                        </Checkbox>
                    </div>
                </div>
                <div className="flex gap-2 text-[0.8rem] md:text-sm space-y-2">
                    <span className="bg-green-600 rounded-full px-1 h-6 w-6 flex items-center justify-center mt-1 text-white text-sm">
                        <Coins />
                    </span>
                    <p>
                        Se cobrará un abono del 50% para confirmar la reserva.
                        El pago restante deberá realizarse 24 horas antes del evento en la sección
                        <span onClick={() => navigate("/orders")} className="text-blue-600 hover:text-blue-800 cursor-pointer"> MIS ORDENES</span>
                    </p>
                </div>

                <p className="flex items-center justify-between px-2 font-semibold text-sm md:text-base">
                    Servicios:
                    <span className="font-semibold md:font-bold text-sm md:text-lg text-cPrimary">
                        <FormattedPrice amount={subtotal()} />
                    </span>
                </p>

                <p className="flex items-center justify-between px-2 font-semibold text-sm md:text-base">
                    Transporte:
                    <span className="font-semibold md:font-bold text-sm md:text-lg text-cPrimary">
                        {asistentes > 20 ? <FormattedPrice amount={isSelected ? costoTransporte() : 0} /> : "Gratis"}
                    </span>
                </p>

                <p className="flex items-center justify-between px-2 font-semibold text-sm md:text-base">
                    IVA:
                    <span className="font-semibold md:font-bold text-sm md:text-lg text-cPrimary">
                        <FormattedPrice amount={totalIva()} />
                    </span>
                </p>

                <p className="flex items-center justify-between px-2 font-semibold text-sm md:text-base">
                    Total:
                    <span className="font-semibold md:font-bold text-sm md:text-lg text-cPrimary">
                        <FormattedPrice amount={totalPrice()} />
                    </span>
                </p>
                <div className="flex flex-col items-center text-sm space-y-2">
                    {
                        rol ? (
                                confirmado ? (
                                    <div>
                                        {errMsg && <p className="text-red-500">{errMsg}</p>}
                                        <p className={`h-5 text-center my-2 ${success ? "text-success" : "text-danger"}`}
                                           aria-live="assertive">
                                            {!success ? errMsg : "Evento Registrado con Exito"}
                                        </p>
                                    <Button
                                        onClick={() => {
                                            registrarEvento()
                                            // navigate("/comprobante")
                                        }}

                                        color="success" size="lg" className="font-bold text-white">
                                        Proceder a la reserva
                                    </Button>
                                    </div>
                                        )
                                        :
                                    <div>
                                        {/*//todo: poner !*/}
                                        {!valido? (
                                                <div>
                                                    <Button
                                                        onClick={() => {
                                                            setConfirmado(true)
                                                        }}
                                                        color="success"
                                                        size="lg"
                                                        className="font-bold text-white"
                                                    >
                                                        Confirmar
                                                    </Button>
                                                </div>
                                            ) :
                                            (<Button
                                                onClick={() => {
                                                    ""
                                                }}
                                                type={"button"}
                                                color={"default"}
                                                size="lg"
                                                className="font-bold text-white"
                                            > Confirmar
                                            </Button>)
                                        }

                                    </div>
                            ) :
                            <Link
                                to="/auth/login"
                                className="text-cPrimary underline animate-bounce"
                            >
                                Por favor inicie sesión para continuar
                            </Link>
                    }
                </div>
            </section>
        </>
    );
};

export default CartPayment;
