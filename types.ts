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
