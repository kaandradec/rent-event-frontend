import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Card, CardHeader, Chip, Image } from "@nextui-org/react";
import { getEventosDeCliente } from "@/api/eventos";
import { BotonCrearEvento } from "@/components/BotonCrearEvento";
import { useNavigate } from "react-router-dom";

interface Evento {
    codigo: string;
    estado: string;
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
    map?: any
}

interface Pago {
    fecha: string,
    monto: number
}

export const MyEvents = () => {
    const { correo, nombre, apellido } = useAuthStore();
    const [errMsg, setErrMsg] = useState("");

    const [eventos, setEventos] = useState<Evento[]>();


    const mapearEventos = (eventos: Evento) => {
        return eventos.map((evento: Evento) => {
            const eventoMapeado: Evento = {
                codigo: evento.codigo,
                estado: evento.estado,
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
                    <BotonCrearEvento />

                    {
                        eventos && (

                            eventos?.length > 0 ?
                                eventos?.filter((evento: Evento) => evento.estado === 'ACTIVO' || evento.estado === 'COMPLETADO')
                                    .map((event: Evento, index: number) => (<EventoCard evento={event} key={index} />))
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

const EventoCard = ({ evento, key }: { evento: Evento, key: number }) => {

    const navigate = useNavigate();

    return (
        <Card className="w-full my-4">
            <CardHeader className="flex gap-3 justify-between">
                <section className="flex gap-4">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md flex gap-4">
                            {evento.nombre}
                            {
                                evento.estado === 'COMPLETADO' ? <Chip variant="dot" color="default">Completado</Chip> :
                                    <Chip variant="dot" color="success">Activo</Chip>
                            }
                        </p>
                        <p className="text-small text-default-500">{evento.pais + ' - ' + evento.region}</p>
                        <p className="text-small text-default-500">{evento.fecha + ' - ' + evento.hora}</p>
                    </div>
                </section>
                <Button onClick={() => navigate(`/eventos/detalle/${evento.codigo}`)}>
                    Ver detalles
                </Button>
            </CardHeader>
        </Card>
    )
}