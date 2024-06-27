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
