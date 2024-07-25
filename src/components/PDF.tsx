
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
import { Factura, Servicios, StoreProduct } from "types";

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
  servicios: Servicios[];
};

export default function PDF({ factura, servicios }: PDFProps) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      fontFamily: "Open Sans",
    },
    image: {
      width: 100,
      height: 100,
      alignSelf: "center",
    },
    header: {
      fontSize: 20,
      textAlign: "center",
      color: "#333333",
      marginBottom: 10,
    },
    clientInfo: {
      fontSize: 12,
      margin: 10,
    },
    serviceItem: {
      fontSize: 10,
      marginLeft: 10,
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: "#eeeeee",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: 5,
      fontSize: 12,
      fontWeight: 500,
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Comprobante de Pago</Text>
        <Image style={styles.image} src={logo} />
        <Text style={styles.header}>Rent Event</Text>
        <Text>NUMERO DE FACTURA: {factura?.numero}</Text>
        <Text>RUC: {factura?.rucEmpresa}</Text>
        <Text>DIRECCION: {factura?.direccionEmpresa}</Text>
        <Text>FECHA: {factura?.fechaEmision}</Text>
        <Text>IVA: {factura?.iva}</Text>
        <Text style={styles.header}>Datos del cliente</Text>
        <Text>NOMBRE: {factura?.nombreCliente}</Text>
        <Text>CEDULA: {factura?.cedulaCliente}</Text>
        <Text>DIRECCION: {factura?.direccionCliente}</Text>
        <Text style={styles.header}>Servicios Solicitados</Text>
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
                  <Text style={styles.tableCell}>
                    {servicio.descripcion || "N/A"}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Precio</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${servicio.precio.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No hay servicios disponibles</Text>
        )}
        <Text>Monto Total a pagar: {factura?.montoTotal}</Text>
      </Page>
    </Document>
  );
}