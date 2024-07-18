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
import { StoreProduct } from "types";

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
  cliente: DatosCliente;
  servicios: StoreProduct[];
};

export default function PDF({ cliente, servicios }: PDFProps) {
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
        <Text>NOMBRE: {cliente.nombre}</Text>
        <Text>CEDULA: {cliente.cedula}</Text>
        <Text>DIRECCION: {cliente.direccion}</Text>
        <Text>TARJETA: {cliente.tarjeta}</Text>
        <Text style={styles.header}>Servicios Solicitados</Text>
        {servicios.map((servicio, index) => (
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
                <Text style={styles.tableCell}>${servicio.costo}</Text>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
