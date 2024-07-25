export interface ProductProps {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  estado: string
  descripcion: string;
  imagen: string;
  costo: number;
}
export interface StoreProduct extends ProductProps {
  quantity: number;
}
export interface Servicios {
  nombre: string;
  precio: number;
  descripcion: string;
}

export interface Factura {
  numero: string;
  fechaEmision: string;
  nombreCliente: string;
  cedulaCliente: string;
  direccionCliente: string;
  empresa: string;
  rucEmpresa: string;
  direccionEmpresa: string;
  montoTotal: number;
  iva: number;
}


export interface Evento {
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

export interface Pago {
  fecha: string,
  monto: number
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  costo: number;
  tipo: string;
  imagenes: Imagen[];
}

export interface Imagen {
  url: string;
}
