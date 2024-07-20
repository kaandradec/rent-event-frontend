import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { getEventosDeCliente } from "@/api/eventos";
import { BotonCrearEvento } from "@/components/BotonCrearEvento";

interface Evento {
    nombre: string;
    fecha: string;
    hora: string;
    pais: string;
    region: string;
    callePrincipal: string;
    calleSecundaria: string;
    referenciaDireccion: string;
    iva: number;
    precio: number;
    pagos: Pago[]
}

interface Pago {
    fecha: string,
    monto: number
}

export const MyEvents = () => {
    const { correo, nombre, apellido } = useAuthStore();
    const [errMsg, setErrMsg] = useState("");

    const [eventos, setEventos] = useState<Evento[]>();


    const mapearEventos = (eventos: AxiosResponse) => {
        return eventos.map(evento => {
            const eventoMapeado: Evento = {
                nombre: evento.nombre,
                fecha: evento.fecha,
                hora: evento.hora,
                pais: evento.pais,
                region: evento.region,
                callePrincipal: evento.callePrincipal,
                calleSecundaria: evento.calleSecundaria,
                referenciaDireccion: evento.referenciaDireccion,
                iva: evento.iva,
                precio: evento.precio,
                pagos: evento.pagos
            }
            return eventoMapeado;
        }
        )
    }

    const fetchEventos = async () => {
        try {
            if (!correo) {
                setErrMsg("Correo no definido");
            }
            if (correo != null) {
                const response = await getEventosDeCliente(correo);

                const eventos: Evento[] = mapearEventos(response.data)

                setEventos(eventos)
                console.log(response.data)
            }
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
        fetchEventos();
    }, []);


    return (
        <main className="mt-20">
            <div className="container flex">
                <section className="max-w-sm max-h-fit border-2 rounded-3xl p-5 mx-5">
                    <div className="container flex justify-center items-center h-screen ">
                        <div className="flex flex-col items-center">
                            <img src="/lunacat.png" className="rounded-full border-4 border-gray-200" />
                            <p className="mt-4 text-primary">{correo}</p>
                            <p className="text-primary">{nombre + " " + apellido}</p>
                        </div>
                    </div>
                </section>
                <section className="w-full">
                    <h1 className="font-semibold text-4xl pb-4">Mis Eventos:</h1>
                    {
                        eventos && (

                            eventos?.length > 0 ?
                                eventos?.map((event: Evento, index: number) => (<EventoCard evento={event} key={index} />))
                                : <div>
                                    <p className="text-primary py-4">No hay eventos disponibles</p>
                                    <BotonCrearEvento />
                                </div>
                        )
                    }
                </section>
            </div>
        </main>
    );
};

const EventoCard = ({ evento, key }: { evento: Evento, key: number }) => (
    <Card className="w-full">
        <CardHeader className="flex gap-3">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
            />
            <div className="flex flex-col">
                <p className="text-md">{evento.nombre}</p>
                <p className="text-small text-default-500">{evento.pais + ' - ' + evento.region}</p>
                <p className="text-small text-default-500">{evento.fecha + ' - ' + evento.hora}</p>
            </div>
        </CardHeader>
        <Divider />
        <CardBody>
            <p><strong>Dirección:</strong>{` ${evento.callePrincipal}, ${evento.calleSecundaria}, ${evento.referenciaDireccion}`}</p>
            <p><strong>Precio Total a pagar:</strong>{` ${evento.precio} $`}</p>
            <Divider className="my-4" />
            {evento.pagos.length === 1 ?
                <>
                    <span className="font-bold"> - Primer pago</span>
                    <p><strong>Fecha de cobro:</strong> {JSON.stringify(evento.pagos[0].fecha)}</p>
                    <p><strong>Monto:</strong> {JSON.stringify(evento.pagos[0].monto)}</p>

                </> : ""
            }
            {evento.pagos.length === 2 ?
                <>
                    <span className="font-bold"> - Segundo pago</span>
                    <p><strong>Fecha de cobro:</strong> {JSON.stringify(evento.pagos[1].fecha)}</p>
                    <p><strong>Monto:</strong> {JSON.stringify(evento.pagos[1].monto)}</p>

                </> : ""
            }
        </CardBody>
        <Divider />
        <CardFooter>
            { // Si solo hay un pago, se muestra el botón para completar el pago
                evento.pagos.length === 1 ?
                    <Button color="success" onClick={() => alert('Enlazar a ventana de completar pago')}>
                        Completar pago
                    </Button> : <Button color="warning" onClick={() => alert('Enlazar a ventana para ver y descargar factura')}>
                        Ver Factura
                    </Button>
            }
        </CardFooter>
    </Card>
)