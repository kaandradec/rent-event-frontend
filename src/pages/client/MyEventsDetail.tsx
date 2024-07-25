import { cancelarEvento, enviarIncidencia, getEventoPorCodigo } from '@/api/eventos';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, useDisclosure } from '@nextui-org/react';
import { AxiosError, AxiosResponse } from 'axios';
import { Coins, Download, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteModal } from "@/components/DeleteModal.tsx";
import { PagoModal } from "@/components/PagoModal.tsx";

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
    servicios: Servicio[]
}

interface Pago {
    fecha: string,
    monto: number
}

interface Servicio {
    id: number;
    nombre: string;
    descripcion: string;
    costo: number;
    tipo: string;
    imagenes: Imagen[];
}

interface Imagen {
    url: string;
}

export default function MyEventsDetail() {
    const [errorMsg, setErrorMsg] = useState('');
    const [evento, setEvento] = useState<Evento>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenPago, onOpen: onOpenPago, onClose: onClosePago } = useDisclosure();
    const [backdrop, setBackdrop] = useState('blur');
    const [fondo, setFondo] = useState('blur');
    const [incidenciaMsg, setIncidenciaMsg] = useState('');
    const [msgEnviado, setMsgEnviado] = useState(false);
    const { codigo } = useParams();
    const navigate = useNavigate();

    const handleOpen = (backdrop: string) => {
        setBackdrop(backdrop);
        onOpen();
    };

    const handlePago = (backdrop: string) => {
        setFondo(backdrop);
        onOpenPago();
    };

    const fetchCancelEvent = async () => {
        try {
            const response = await cancelarEvento(evento?.codigo);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelEvent = () => {
        fetchCancelEvent();
        onClose();
        navigate('/landing');
    };

    const handlePagarEvent = () => {
        onClosePago();
    };

    const handleSendIncidencia = async (codigo: string, descripcion: string) => {
        try {
            await enviarIncidencia(codigo, descripcion);
            setMsgEnviado(true);
            setTimeout(() => {
                setMsgEnviado(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const mapearEvento = (eventoResponse: AxiosResponse): Evento => {
        console.log(eventoResponse.data);

        const eventoMapeado: Evento = {
            codigo: eventoResponse.data.codigo,
            estado: eventoResponse.data.estado,
            nombre: eventoResponse.data.nombre,
            fecha: eventoResponse.data.fecha,
            hora: eventoResponse.data.hora,
            pais: eventoResponse.data.pais,
            region: eventoResponse.data.region,
            callePrincipal: eventoResponse.data.callePrincipal,
            calleSecundaria: eventoResponse.data.calleSecundaria,
            referenciaDireccion: eventoResponse.data.referenciaDireccion,
            iva: eventoResponse.data.iva,
            precio: eventoResponse.data.precio,
            pagos: eventoResponse.data.pagos,
            servicios: eventoResponse.data.servicios
        };

        return eventoMapeado;
    };

    const fetchEvento = async () => {
        if (codigo !== null) {
            try {
                const response = await getEventoPorCodigo(codigo);
                const evento = mapearEvento(response);
                setEvento(evento);
            } catch (err) {
                const error = err as AxiosError;
                if (!error?.response) {
                    setErrorMsg("El servidor no responde");
                } else if (
                    error.response?.status === 409 ||
                    error.response?.data === "Bad credentials"
                ) {
                    setErrorMsg("Credenciales incorrectas");
                } else {
                    setErrorMsg("Error desconocido");
                }
            }
        }
    };

    useEffect(() => {
        fetchEvento();
    }, []);

    return (
        <>
            {evento && (
                <main className='mt-20 max-w-7xl mx-auto px-4'>
                    <Card className="w-full">
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
                                    <p className="text-md">{evento.nombre}</p>
                                    <p className="text-small text-default-500">{evento.pais + ' - ' + evento.region}</p>
                                    <p className="text-small text-default-500">{evento.fecha + ' - ' + evento.hora}</p>
                                </div>
                            </section>
                            {evento.estado === 'ACTIVO' && (
                                <section>
                                    {evento.pagos.length === 2 ? (
                                        <Button
                                            className='font-semibold'
                                            onClick={() => navigate(`/comprobante/${evento?.codigo}`)}
                                            color='danger'
                                            endContent={<Download />}
                                        >
                                            Descargar factura
                                        </Button>
                                    ) : (
                                        <section className='flex gap-4'>
                                            <Button
                                                onClick={() => handleOpen('blur')}
                                                className='font-semibold' color='danger' endContent={<X />}
                                            >
                                                Cancelar evento
                                            </Button>
                                            <Button
                                                className='font-semibold'
                                                onClick={() => handlePago('blur')}
                                                color='success'
                                                endContent={<Coins />}
                                            >
                                                Completar pago
                                            </Button>
                                        </section>
                                    )}
                                </section>
                            )}
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>
                                <strong>Dirección:</strong>{` ${evento.callePrincipal}, ${evento.calleSecundaria}, ${evento.referenciaDireccion}`}
                            </p>
                            <p><strong>Precio Total a pagar:</strong>{` ${evento.precio} $`}</p>
                            <Divider className="my-4" />
                            {evento.pagos.length === 1 && (
                                <>
                                    <span className="font-bold"> - Primer pago</span>
                                    <p><strong>Fecha de cobro:</strong> {JSON.stringify(evento.pagos[0].fecha)}</p>
                                    <p><strong>Monto:</strong> {JSON.stringify(evento.pagos[0].monto)}$</p>
                                </>
                            )}
                            {evento.pagos.length === 2 && (
                                <>
                                    <span className="font-bold"> - Pago Final</span>
                                    <p><strong>Fecha de cobro:</strong> {JSON.stringify(evento.pagos[1].fecha)}</p>
                                    <p><strong>Monto:</strong> {JSON.stringify(evento.pagos[1].monto)}$</p>
                                </>
                            )}
                            <div className='grid grid-cols-4 gap-4'>
                                {evento.servicios.map((servicio) => (
                                    <Card className="py-4" key={servicio.id}>
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                            <p className="text-tiny uppercase font-bold">{servicio.nombre}</p>
                                            <small className="text-default-500">{servicio.descripcion}</small>
                                            <h4 className="font-bold text-large">{servicio.costo} $</h4>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={servicio.imagenes[0].url}
                                                width={270}
                                            />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            {evento.estado === 'COMPLETADO' && (
                                <section className='font-semibold w-full'>
                                    <div className='flex gap-2'>
                                        <MessageCircle />
                                        <h3>
                                            Danos tu opinión del servicio
                                            {msgEnviado && <span className='text-green-500'> ¡Gracias por tu opinión!</span>}
                                        </h3>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Input
                                            onChange={(e) => setIncidenciaMsg(e.target.value)}
                                            type="text" placeholder="El servicio fue una experiencia ..."
                                        />
                                        <Button
                                            onClick={() => handleSendIncidencia(evento.codigo, incidenciaMsg)}
                                            endContent={<Send />}
                                        >
                                            Enviar
                                        </Button>
                                    </div>
                                </section>
                            )}
                        </CardFooter>
                    </Card>
                </main>
            )}
            <DeleteModal isOpen={isOpen} onClose={onClose} handleCancelEvent={handleCancelEvent} />
            <PagoModal isOpenPago={isOpenPago} onClosePago={onClosePago}
                handleCerrarPago={handlePagarEvent} total={evento?.precio}
                pagoAnterior={evento?.pagos[0].monto} evento={evento?.codigo} />
        </>
    );
}
