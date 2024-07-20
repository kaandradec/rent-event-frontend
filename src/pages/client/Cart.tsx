import { useStore } from "@/store/store";

import { StoreProduct } from "../../../types";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import CartPayment from "@/components/CartPayment";
import { useEffect, useState } from "react";
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
    // Fecha y hora del evento validación
    const [fecha, setFecha] = useState(now(getLocalTimeZone()).add({ days: 3 }));
    const [confirmado, setConfirmado] = useState(false);
    // Transporte
    const [isSelected, setIsSelected] = useState(true);
    // Asistentes
    const [asistentes, setAsistentes] = useState(0);
    const correo = useAuthStore().correo;
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
            setNumeroTarjeta(datosTarjeta.tarjetaResponseList[0].token)
            setNombreTarjeta(datosTarjeta.tarjetaResponseList[0].nombreTarjeta)
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


    // CALCULO DE PRECIO SUBTOTAL Y TOTAL
    const COSTO_TRANSPORTE = 0.25;
    const IVA = 0.15;

    const subtotal = (): number => {
        let total: number = 0;
        cart.map((item) => {
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

        <main className="mt-10 max-w-screen-2xl mx-auto px-6 grid grid-cols-7 lg:grid-cols-9 gap-6 py-4">
            {cart.length > 0 ? (
                <>
                    {!confirmado ?
                        (
                            <section className="bg-white col-span-7 ls:col-span-5 xl:col-span-7 p-4 rounded-lg">
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
                                    <p className="font-semibold md:text-lg">
                                        Servicios ({cartQuantity})
                                    </p>
                                    <p className="font-semibold hidden md:block">
                                        Subtotal
                                    </p>
                                </div>

                                {cart.map((item: StoreProduct) => (
                                    <div
                                        key={item.id}
                                        className="pt-2 flex flex-col gag-2"
                                    >
                                        <CartProduct item={item} />
                                    </div>
                                ))}
                                <ResetCart />
                            </section>)
                        :
                        <InformacionPago setTotal={totalPrice()} />
                    }
                    <section
                        className="bg-white h-64 col-span-7 lg:col-span-2 p-4 rounded-lg
                    flex items-center justify-center sticky lg:mt-36"
                    >
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
                            correo={correo}
                            nombreTargeta={nombreTarjeta}
                            numeroTarjeta={numeroTarjeta}
                            fecha={fecha}
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