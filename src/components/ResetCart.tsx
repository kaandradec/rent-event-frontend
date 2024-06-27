import { useStore } from "@/store/store";
import { RotateCcw } from "lucide-react";
/**
 * ResetCart component empty the cart data.
 */
const ResetCart = () => {
  const resetCart = useStore((state) => state.resetCart);
  return (
    <button
      className="h-10 font-semibold bg-gray-200 rounded-lg text-cPrimary 
        hover:bg-red-600 hover:text-white duration-300 px-5 flex items-center
        space-x-1 mt-3"
      onClick={() =>
        confirm("Your are about to empty your cart!") && resetCart()
      }
    >
      <RotateCcw className="text-base md:text-lg stroke-2" />
      <span className="text-sm md:text-base">Resetear Carrito</span>
    </button>
  );
};

export default ResetCart;