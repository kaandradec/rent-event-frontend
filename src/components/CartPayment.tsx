import { useStore } from "@/store/store";
import { Coins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FormattedPrice from "./FormattedPrice";
import { useAuthStore } from "@/store/auth";
import { Button } from "@nextui-org/react";

/**
 * CartPayment component displays the payment details section in the cart.
 */
const CartPayment = () => {
  const cart = useStore((state) => state.cart);

  const rol = useAuthStore.getState().rol;

  const navigate = useNavigate();

  // Calculate for the total price
  const totalPrice = (): number => {
    let total: number = 0;
    cart.map((item) => {
      {
        return item.quantity
          ? (total += item.quantity * item.costo)
          : (total += item.costo);
      }
    });

    return total;
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2 text-[0.8rem] md:text-sm space-y-2">
        <span
          className="bg-green-600 rounded-full px-1 h-6 w-6 flex
                    items-center justify-center mt-1 text-white text-sm"
        >
          <Coins />
        </span>
        <p>
          Su orden incluye el pago de el 50% del total de la orden,
          se pagará el 50% restante al finalizar el servicio en la sección de

          <span
            onClick={() => navigate("/orders")}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          > MIS ORDENES</span>
        </p>
      </div>
      <p
        className="flex items-center justify-between px-2 
            font-semibold text-sm md:text-base"
      >
        Total:
        <span className="font-semibold md:font-bold text-sm md:text-lg text-cPrimary">
          <FormattedPrice amount={totalPrice()} />
        </span>
      </p>
      <div className="flex flex-col items-center text-sm space-y-2">
        {
          rol ? (
            <Button
              onClick={() => navigate("/")}

              color="success" size="lg" className="font-bold text-white">
              Proceder con la compra
            </Button>
          ) :
            <Link
              to="/auth/login"
              className="text-cPrimary underline animate-bounce"
            >
              Por favor inicie sesión para continuar
            </Link>
        }
      </div>
    </section>
  );
};

export default CartPayment;