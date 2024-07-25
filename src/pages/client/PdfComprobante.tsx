import { useAuthStore } from "@/store/auth";
import { Button } from "@nextui-org/react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDF from "@/components/PDF";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Evento, Factura, Servicio, Servicios } from "../../../types";
import { obtenerFacturaPorCodigoEvento } from "@/api/factura";
import { getEventoPorCodigo } from "@/api/eventos";



export default function PdfComprobante() {
  const { codEvento } = useParams();
  const correo = useAuthStore.getState().correo;
  const rol = useAuthStore.getState().rol;
  const navigate = useNavigate();

  const [nombreFacturacion, setNombreFacturacion] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [numeroCedula, setNumeroCedula] = useState<string>("");
  const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
  const [nombreTarjeta, setNombreTarjeta] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [factura, setFactura] = useState<Factura>();
  const [evento, setEvento] = useState<Evento>();

  // const fetchClient = async () => {
  //   try {
  //     if (!correo || !codEvento) return;

  //     const datosFacturacion = await obtenerDatosFacturacionCliente(correo);
  //     const datosTarjeta = await obtenerTarjetasCliente(correo);
  //     const ultimaTarjeta = datosTarjeta.tarjetaResponseList[datosTarjeta.tarjetaResponseList.length - 1];

  //     setNumeroTarjeta(ultimaTarjeta.token);
  //     setNombreTarjeta(ultimaTarjeta.nombreTarjeta);
  //     setDireccion(datosFacturacion.direccion);
  //     setNumeroCedula(datosFacturacion.cedula);
  //     setNombreFacturacion(datosFacturacion.nombre);

  //     const serviciosList = await obtenerServiciosFactura(codEvento);
  //     console.log(serviciosList.data)
  //     setServicios(Array.isArray(serviciosList.data) ? serviciosList.data : []);
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     if (!error?.response) {
  //       setErrMsg("El servidor no responde");
  //     } else if (
  //       error.response?.status === 409 ||
  //       error.response?.data === "Bad credentials"
  //     ) {
  //       setErrMsg("Credenciales incorrectas");
  //     } else {
  //       setErrMsg("Error desconocido");
  //     }
  //     console.log(errMsg);
  //   }
  // };

  const mapearFactura = (factura: Factura) => {
    return {
      numero: factura.numero,
      fechaEmision: factura.fechaEmision,
      nombreCliente: factura.nombreCliente,
      cedulaCliente: factura.cedulaCliente,
      direccionCliente: factura.direccionCliente,
      empresa: factura.empresa,
      rucEmpresa: factura.rucEmpresa,
      direccionEmpresa: factura.direccionEmpresa,
      montoTotal: factura.montoTotal,
      iva: factura.iva,
    };
  }

  const mapearEvento = (evento: Evento) => {
    return {
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
      pagos: evento.pagos,
      servicios: evento.servicios
    };
  }


  const fetchFactura = async () => {
    try {
      const response = await obtenerFacturaPorCodigoEvento(codEvento);

      const factura: Factura = mapearFactura(response.data);
      setFactura(factura);
    } catch (err) {
      console.log(err)
    }
  }

  const fetchEvento = async () => {
    try {
      const response = await getEventoPorCodigo(codEvento);

      const evento: Evento = mapearEvento(response.data);
      setEvento(evento);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!rol) navigate("/");
    // fetchClient();

    fetchFactura();
    fetchEvento();

  }, []);

  // const datosCliente = {
  //   nombre: nombreFacturacion,
  //   direccion: direccion,
  //   cedula: numeroCedula,
  //   tarjeta: numeroTarjeta,
  //   nombreTarjeta: nombreTarjeta,
  //   correo: correo,
  // };

  return (
    <>
      <div className="mt-20 max-w-7xl m-auto flex flex-col items-center">
        <PDFDownloadLink
          document={<PDF factura={factura} servicios={servicios} />}
          fileName="comprobante_pago.pdf"
          style={{ textDecoration: "none" }}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button
                isLoading
                color="secondary"
                spinner={
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                Loading
              </Button>
            ) : (
              <Button color="warning">Descargar Comprobante</Button>
            )
          }
        </PDFDownloadLink>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="my-10">
          <PDFViewer
            style={{ width: "100%", height: "600px" }}
            showToolbar={true}
          >
            <PDF factura={factura} servicios={evento?.servicios} />
          </PDFViewer>
        </div>
      </div>
    </>
  );
}