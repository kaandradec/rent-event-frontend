import { useStore } from "@/store/store";
import { StoreProduct } from "../../../types";

import { Link } from "react-router-dom";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import CartPayment from "@/components/CartPayment";
/**
 * Cart component displays the user's shopping cart with a list of cart items.
 */
const Cart = () => {
  const cart = useStore((state) => state.cart);
  const cartQuantity = useStore((state) => state.cartQuantity);

  return (
    <main className="mt-16 max-w-screen-2xl mx-auto px-6 grid grid-cols-7 xl:grid-cols-9 gap-10 py-4">
      {cart.length > 0 ? (
        <>
          <section className="bg-white col-span-7 ls:col-span-5 xl:col-span-7 p-4 rounded-lg">
            <div
              className="flex items-center justify-between border-b-2
                         border-b-gray-400 pb-1 text-gray-700"
            >
              <p className="font-semibold md:text-lg">
                Carrito de Servicios ({cartQuantity})
              </p>
              <p className="font-semibold hidden md:block">
                Subtotal
              </p>
            </div>

            {cart.map((item: StoreProduct) => (
              <div
                key={item.id}
                className="pt-2 flex flex-col gag-2"
              >
                <CartProduct item={item} />
              </div>
            ))}
            <ResetCart />
          </section>
          <section
            className="bg-white h-64 col-span-7 lg:col-span-2 p-4 rounded-lg
                    flex items-center justify-center sticky top-5"
          >
            <CartPayment />
          </section>
        </>
      ) : (
        <section
          className="bg-white h-52 col-span-9 flex flex-col py-5 rounded-lg
                items-center justify-center shadow-lg"
        >
          <h1 className="text-lg font-semibold">
            No hay nada en el carrito
          </h1>
          <Link
            to="/services"
            className="text-sm text-green-600 underline p-2"
          >
            Volver a elegir servicios
          </Link>
        </section>
      )}
    </main>
  );
};

export default Cart;