
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View,
  Font,
} from "@react-pdf/renderer";
import logo from "../../public/logoPDF.png";
import { Factura, Servicio, Servicios, StoreProduct } from "types";

Font.register({
  family: "Open Sans",
  src: "https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN_r8OUuhs.ttf",
});

interface DatosCliente {
  nombre: string;
  direccion: string;
  cedula: string;
  tarjeta: string;
  nombreTarjeta: string;
  correo: string;
}

type PDFProps = {
  factura: Factura | undefined;
  servicios: Servicio[] | undefined;
};

export default function PDF({ factura, servicios }: PDFProps) {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      backgroundColor: "#FFFFFF",
      fontFamily: "Open Sans",
    },
    header: {
      fontSize: 24,
      textAlign: "center",
      color: "#333333",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    subHeader: {
      fontSize: 18,
      textAlign: "center",
      color: "#555555",
      marginBottom: 10,
      textTransform: "uppercase",
    },
    clientInfo: {
      fontSize: 12,
      marginVertical: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: "#cccccc",
      borderRadius: 5,
    },
    infoText: {
      marginBottom: 5,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#cccccc",
      marginVertical: 10,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "33.33%",
      backgroundColor: "#f0f0f0",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#cccccc",
      padding: 5,
    },
    tableCol: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#cccccc",
      padding: 5,
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: "bold",
    },
    tableCell: {
      fontSize: 10,
    },
    totalAmount: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "right",
      marginTop: 10,
      marginRight: 10,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Factura</Text>
        <Image style={{ width: 100, height: 100, alignSelf: "center" }} src={logo} />
        <Text style={styles.subHeader}>Rent Event</Text>
        <Text style={styles.infoText}>NUMERO DE FACTURA: {factura?.numero}</Text>
        <Text style={styles.infoText}>RUC: {factura?.rucEmpresa}</Text>
        <Text style={styles.infoText}>DIRECCION: {factura?.direccionEmpresa}</Text>
        <Text style={styles.infoText}>FECHA: {factura?.fechaEmision}</Text>
        <Text style={styles.infoText}>IVA: {factura?.iva}</Text>

        <Text style={styles.subHeader}>Datos del cliente</Text>
        <View style={styles.clientInfo}>
          <Text style={styles.infoText}>NOMBRE: {factura?.nombreCliente}</Text>
          <Text style={styles.infoText}>CEDULA: {factura?.cedulaCliente}</Text>
          <Text style={styles.infoText}>DIRECCION: {factura?.direccionCliente}</Text>
        </View>

        <Text style={styles.subHeader}>Servicios Solicitados</Text>
        {Array.isArray(servicios) && servicios.length > 0 ? (
          servicios.map((servicio, index) => (
            <View key={index} style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Servicio</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{servicio.nombre}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Descripción</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{servicio.descripcion || "N/A"}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Precio</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${servicio.costo.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No hay servicios disponibles</Text>
        )}

        <Text style={styles.totalAmount}>Monto Total a pagar: ${factura?.montoTotal?.toFixed(2)}</Text>
      </Page>
    </Document>
  );
}