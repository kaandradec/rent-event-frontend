import { getEventoPorCodigo } from '@/api/eventos';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';
import { AxiosError, AxiosResponse } from 'axios';
import { Coins, Download, Trash, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

interface Evento {
  codigo: string;
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



export default function MyEventsDetail() {
  const [errorMsg, setErrorMsg] = useState('');
  const [evento, setEvento] = useState<Evento>();

  const { codigo } = useParams();

  const navigate = useNavigate()

  const mapearEvento = (eventoResponse: AxiosResponse) => {
    console.log(eventoResponse.data)

    const eventoMapeado: Evento = {
      codigo: eventoResponse.data.codigo,
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
      pagos: eventoResponse.data.pagos
    }

    return eventoMapeado;
  }

  const fetchEvento = async () => {

    if (codigo !== null) {
      try {
        const respose = await getEventoPorCodigo(codigo);
        const evento = mapearEvento(respose);

        setEvento(evento)
      }
      catch (err) {
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

  }

  useEffect(() => {
    fetchEvento()
  }, [])


  return (
    <>
      {
        evento && (
          <main className='mt-20 max-w-7xl mx-auto'>
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
                <section>
                  {
                    evento.pagos.length === 2 ?
                      <Button
                        className='font-semibold'
                        onClick={() => null}
                        color='danger'
                        endContent={<Download />}
                      >
                        Descargar factura
                      </Button> : (
                        <section className='flex gap-4'>
                          <Button className='font-semibold' color='danger' endContent={<X />}>
                            Cancelar evento
                          </Button>
                          <Button
                            className='font-semibold'
                            onClick={() => null}
                            color='success'
                            endContent={<Coins />}
                          >
                            Completar pago
                          </Button>
                        </section>
                      )
                  }
                </section>

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
              </CardFooter>
            </Card>

          </main >
        )
      }
    </>
  )
}
