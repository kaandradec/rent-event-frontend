import { useStore } from "@/store/store";

import { ProductProps, StoreProduct } from "../../../types";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import CartPayment from "@/components/CartPayment";
import React, { useEffect, useState } from "react";
import { DatePicker, Input } from "@nextui-org/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { BotonPaises } from "@/components/BotonPaises.tsx";
import { obtenerDatosFacturacionCliente, obtenerTarjetasCliente } from "@/api/cliente.ts";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth.ts";
import { InformacionPago } from "@/components/InformacionPago.tsx";
import { CartSinServicios } from "@/components/CartSinServicios.tsx";

/**
 * Cart component displays the user's shopping cart with a list of cart items.
 */
const Cart = () => {
    const cart = useStore((state) => state.cart);
    const cartQuantity = useStore((state) => state.cartQuantity);
    const [region, setRegion] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [nombreEvento, setNombreEvento] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [callePrincipal, setCallePrincipal] = useState<string>("");
    const [calleSecundaria, setCalleSecundaria] = useState<string>("");
    const [referencia, setReferencia] = useState<string>("");
    const [pago, setPago] = useState<number>(0);
    const [isPagoValido, setIsPagoValido] = useState(false);
    // Fecha y hora del evento validación
    const [fecha, setFecha] = useState(now(getLocalTimeZone()).add({ days: 3 }));
    const [confirmado, setConfirmado] = useState(false);
    // Transporte
    const [isSelected, setIsSelected] = useState(true);
    // Asistentes
    const [asistentes, setAsistentes] = useState(0);
    const correo = useAuthStore.getState().correo;
    const [nombreFacturacion, setNombreFacturacion] = useState<string>("");
    const [direccion, setDireccion] = useState<string>("");
    const [numeroCedula, setNumeroCedula] = useState<string>("");
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
    const [nombreTarjeta, setNombreTarjeta] = useState("");
    const [errMsg, setErrMsg] = useState<string>("");

    useEffect(() => {
        setRegion("Elige una ciudad")
    }, [pais]);

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


    useEffect(() => {
        fetchClient();
    }, []);
    useEffect(() => {
        setIsPagoValido(
            (parseFloat(pago.toString()) >= (totalPrice() * 0.3))
            && (parseFloat(pago.toString()) <= totalPrice())
        )
    },
        [pago]);


    // CALCULO DE PRECIO SUBTOTAL Y TOTAL
    const COSTO_TRANSPORTE = 0.25;
    const IVA = 0.15;

    const subtotal = (): number => {
        let total: number = 0;
        cart.map((item: StoreProduct) => {
            {
                return item.quantity ?
                    (total += item.quantity * item.costo)
                    : (total += item.costo);
            }
        });
        return total;
    }

    const totalIva = (): number => {
        return subtotal() * IVA;
    }

    const costoTransporte = (): number => {
        if (asistentes < 20)
            return 0;
        return asistentes * COSTO_TRANSPORTE;
    }


    const totalPrice = (): number => {
        let total: number = subtotal();
        // Transporte
        if (isSelected && asistentes > 0) {
            total += costoTransporte();
        }
        // IVA
        total += totalIva();
        return total;
    };

    return (

        <main className="mt-10 max-w-screen-2xl mx-auto px-6 grid grid-cols-7 lg:grid-cols-9 gap-6 py-6
        ">
            {cart.length > 0 ? (
                <>
                    {!confirmado ?
                        (
                            <section className="bg-white col-span-7 ls:col-span-5 xl:col-span-7 p-4 rounded-lg
                            dark:bg-gray-950 dark:text-white/90
                            ">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        <Input
                                            type="text"
                                            label="Nombre del evento"
                                            labelPlacement="outside"
                                            placeholder="Evento RentEvent"
                                            maxLength={20}
                                            isRequired
                                            description="Ingrese el nombre del evento que desea organizar."
                                            onValueChange={(value) => {
                                                setAsistentes(parseInt(value))
                                                setNombreEvento(value)
                                            }}
                                            validate={(value) => {
                                                if (value.length < 1) {
                                                    return "Ingrese un nombreFacturacion de evento";
                                                }
                                                return "";
                                            }}
                                        />
                                        <DatePicker
                                            labelPlacement="outside"
                                            label="Fecha y hora del evento"
                                            variant="flat"
                                            hideTimeZone
                                            isRequired
                                            showMonthAndYearPickers
                                            minValue={now(getLocalTimeZone()).add({ days: 2 })}
                                            maxValue={now(getLocalTimeZone()).add({ months: 2 })}
                                            defaultValue={now(getLocalTimeZone()).add({ days: 3 })}
                                            onChange={(value) => setFecha(value)}
                                            lang="es"
                                            description="(Mes/Día/Año, Hora) El evento debe ser programado con al menos 2 días de anticipación y máximo 2 meses de anticipación."
                                        />
                                    </div>
                                    <Input
                                        type="text"
                                        label="Descripción del evento"
                                        labelPlacement="outside"
                                        placeholder="Descripción y detalles específicos del evento."
                                        maxLength={20}
                                        isRequired
                                        className={"pt-8 base:pt-4 md:pt-4 lg:pt-4"}
                                        onValueChange={(value) => {
                                            setAsistentes(parseInt(value))
                                            setDescripcion(value)
                                        }}
                                        validate={(value) => {
                                            if (value.length < 1) {
                                                return "Ingrese un nombreFacturacion de evento";
                                            }
                                            return "";
                                        }}
                                    />
                                    <h1 className="font-normal">Direccion:</h1>
                                    <Input
                                        type="text"
                                        label="Calle principal"
                                        labelPlacement="outside"
                                        placeholder="Av..."
                                        maxLength={200}
                                        isRequired
                                        onValueChange={(value) => {
                                            setAsistentes(parseInt(value))
                                            setCallePrincipal(value)
                                        }}
                                        validate={(value) => {
                                            if (value.length < 1) {
                                                return "Ingrese una dirección";
                                            }
                                            return "";
                                        }}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Input
                                                type="text"
                                                label="Calle Secundaria"
                                                labelPlacement="outside"
                                                placeholder="Calle..."
                                                maxLength={200}
                                                isRequired
                                                onValueChange={(value) => {
                                                    setAsistentes(parseInt(value))
                                                    setCalleSecundaria(value)
                                                }}
                                                validate={(value) => {
                                                    if (value.length < 1) {
                                                        return "Ingrese una dirección";
                                                    }
                                                    return "";
                                                }}
                                            />
                                            <Input
                                                type="text"
                                                label="Referencia"
                                                labelPlacement="outside"
                                                placeholder="Edificio... Piso..."
                                                className="pt-2"
                                                maxLength={200}
                                                isRequired
                                                onValueChange={(value) => {
                                                    setAsistentes(parseInt(value))
                                                    setReferencia(value)
                                                }}
                                                validate={(value) => {
                                                    if (value.length < 1) {
                                                        return "Ingrese una dirección";
                                                    }
                                                    return "";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-normal">Direccion:</h3>
                                            <BotonPaises setSelectedCountry={setPais} setSelectedCity={setRegion} />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-between border-b-2
                         border-b-gray-400 pb-1 text-gray-700 mt-4"
                                >
                                    <p className="font-semibold md:text-lg
                                    dark:text-white/90
                                    ">
                                        Servicios ({cartQuantity})
                                    </p>
                                    <p className="font-semibold hidden md:block dark:text-white/90">
                                        Subtotal
                                    </p>
                                </div>

                                {cart.map((item: StoreProduct) => (
                                    <div
                                        key={item.id}
                                        className="pt-2 flex flex-col gag-2
                                        bg-white dark:bg-gray-800 dark:text-white/90
                                        "
                                    >
                                        <CartProduct item={item} />
                                    </div>
                                ))}
                                <ResetCart />
                            </section>)
                        :
                        <section className="bg-white col-span-7 ls:col-span-5 lg:col-span-6 p-4 rounded-lg xl:ml-20">
                            <div className="flex flex-col">
                                <InformacionPago setTotal={totalPrice()} />
                                {!(numeroTarjeta == null || numeroTarjeta == "" || nombreTarjeta == "" || nombreFacturacion == null || nombreFacturacion == "") ?

                                    <div className={"grid grid-cols-3 mt-2 border-t pt-2"}>
                                        <div className={"col-span-1"}>
                                            <h1 className="font-normal ">Abono de reserva:</h1>
                                            <h2 className={"font-light text-xs"}>(Minimo 30% del total)</h2>
                                            {!isPagoValido ?
                                                <p className={"text-warning"}>Abono minimio
                                                    ${(0.3 * totalPrice()).toFixed(2)} (30%)</p>
                                                : <div></div>
                                            }

                                        </div>
                                        <Input
                                            type="number"
                                            inputMode={"numeric"}
                                            label="Valor a pagar"
                                            labelPlacement="outside"
                                            className={"col-span-2"}
                                            isRequired
                                            value={pago.toString()}
                                            onChange={(valor) => {
                                                setPago(Number(valor.target.value));
                                            }}
                                        />
                                        <p className={"col-span-full font-light text-xs mt-1"}>*El anticipo del 30% asegura la disponibilidad del servicio y cubre costos
                                            iniciales, garantizando compromiso y seriedad en la transacción para ambas
                                            partes.
                                        </p>
                                    </div> :
                                    <div></div>
                                }
                            </div>
                        </section>

                    }
                    <section className="mt-8 h-64 col-span-7 lg:col-span-2 p-4 rounded-lg
                    flex items-center justify-center sticky lg:mt-36">
                        <CartPayment
                            asistentes={asistentes}
                            isSelected={isSelected}
                            setAsistentes={setAsistentes}
                            setIsSelected={setIsSelected}
                            subtotal={subtotal}
                            costoTransporte={costoTransporte}
                            totalIva={totalIva}
                            totalPrice={totalPrice}
                            confirmado={confirmado}
                            setConfirmado={setConfirmado}
                            region={region}
                            correo={correo ?? ""}
                            nombreTargeta={nombreTarjeta}
                            numeroTarjeta={numeroTarjeta}
                            fecha={fecha.toString()}
                            direccionFactura={direccion}
                            nombreFactura={nombreFacturacion}
                            pais={pais}
                            ciudad={region}
                            numeroCedula={numeroCedula}
                            nombreEvento={nombreEvento}
                            descripcionEvento={descripcion}
                            callePrincipal={callePrincipal}
                            calleSecundaria={calleSecundaria}
                            referencia={referencia}
                            cart={cart}
                            pago={pago}
                            isPagoValido={isPagoValido}
                        />

                    </section>

                </>
            ) :
                <CartSinServicios />
            }

        </main>
    );
};


export default Cart;