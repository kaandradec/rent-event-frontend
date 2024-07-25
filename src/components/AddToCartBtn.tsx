import { ShoppingCart } from "lucide-react";
import { StoreProduct } from "../../types";
import { useStore } from "@/store/store";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function AddToCartBtn({
  id,
  codigo,
  nombre,
  tipo,
  descripcion,
  imagen,
  costo,
  estado,
  quantity,
}: StoreProduct) {
  // Access cart state and functions from the store
  const cart: StoreProduct[] = useStore((state) => state.cart);
  const existingCartItem = cart.find((cartItem) => cartItem.id === id);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  // Handle the addition of an item to the cart
  const handleAddToCart = () => {
    addToCart({
      id,
      codigo,
      nombre,
      tipo,
      descripcion,
      imagen,
      costo,
      estado,
      quantity,
    });
  };

  useEffect(() => {
    console.log("Carrito", cart);
  }, [existingCartItem]);

  return (
    // Render the component based on the existingCartItem's quantity
    <>
      {existingCartItem?.quantity && existingCartItem.quantity > 0 ? (
        <Button
          onClick={() => removeFromCart(id)}
          color="danger" startContent={<ShoppingCart
          />}>
          Quitar
        </Button>
      ) : (
        <Button
          onClick={handleAddToCart}
          color="success" startContent={<ShoppingCart
          />}>
          Agregar
        </Button>
      )}
    </>
  );
}