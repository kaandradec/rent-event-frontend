import { ShoppingCart } from "lucide-react";
import { StoreProduct } from "../../types";
import { useStore } from "@/store/store";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function AddToCartBtn({
  _id,
  title,
  brand,
  category,
  description,
  image,
  isNew,
  oldPrice,
  price,
  quantity,
}: StoreProduct) {
  // Access cart state and functions from the store
  const cart = useStore((state) => state.cart);
  const existingCartItem = cart.find((cartItem) => cartItem._id === _id);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  // Handle the addition of an item to the cart
  const handleAddToCart = () => {
    addToCart({
      _id,
      title,
      brand,
      category,
      description,
      image,
      isNew,
      oldPrice,
      price,
      quantity,
    });
  };

  useEffect(() => {
    console.log("Carrito", cart);
  }, [existingCartItem]);

  return (
    // Render the component based on the existingCartItem's quantity
    <>
      {existingCartItem?.quantity > 0 ? (
        <Button
          onClick={() => removeFromCart(_id)}
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