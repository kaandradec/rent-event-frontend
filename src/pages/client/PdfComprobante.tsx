import { useAuthStore } from "@/store/auth";
import { Button } from "@nextui-org/react"; // Asumiendo que Loading es un componente disponible para mostrar carga
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useStore } from "@/store/store";
import PDF from "@/components/PDF";

export default function PdfComprobante() {
  const nombre = useAuthStore.getState().nombre;
  const apellido = useAuthStore.getState().apellido;
  const correo = useAuthStore.getState
  const carrito = useStore((state) => state.cart);

  const datosCliente = {
    nombre: nombre + " " + apellido,
    direccion: "Calle Falsa 123",
    telefono: "123456789",
    correo: correo,
  };

  return (
    <>
      <div className="mt-20 max-w-7xl m-auto flex flex-col items-center">
        <PDFDownloadLink
          document={<PDF cliente={datosCliente} servicios={carrito} />}
          fileName="comprobante_pago.pdf"
          style={{ textDecoration: "none" }} // Remover el subrayado del enlace
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
              <Button color="warning">Descargar Comprobante</Button> // Ajuste para que el botón se adapte al contenido
            )
          }
        </PDFDownloadLink>
      </div>
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Ajustes de centrado y espaciado */}
        <div className="my-10">
          {" "}
          {/* Añadir margen entre el botón y el visor */}
          <PDFViewer
            style={{ width: "100%", height: "600px" }}
            showToolbar={true}
          >
            <PDF cliente={datosCliente} servicios={carrito} />
          </PDFViewer>
        </div>
      </div>
    </>
  );
}
