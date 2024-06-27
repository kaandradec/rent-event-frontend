import { StoreProduct } from "../../types";

import { useStore } from "@/store/store";
import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import FormattedPrice from "./FormattedPrice";
import { Trash } from "lucide-react";

/**
 * CartProduct component displays a single product in the cart with functionalities like
 * adjusting quantity, removing from cart, saving for later, etc.
 */

interface cartProductProps {
  item: StoreProduct;
}
const CartProduct = ({ item }: cartProductProps) => {
  const deleteFromCart = useStore((state) => state.deleteFromCart);

  const { id, nombre, descripcion, imagen, costo, quantity } = item;

  const btnStyle: string =
    "border-[1px] bg-cPrimary/80 flex items-center h-7 w-7\
        justify-center hover:bg-cPrimary duration-500 rounded-lg text-white";

  return (
    <section
      className="bg-gray-100 relative rounded-lg flex flex-col
        sl:flex-row items-center"
    >
      <Link
        to={{
          pathname: `/${id}`,
          query: { id, nombre },
        }}
        className="h-[8.2rem] w-full ls:h-full sl:w-[7.3rem] md:w-[8.8rem] left-0 top-0 absolute"
      />
      <Image
        width={150}
        height={150}
        src={imagen}
        alt={nombre}
        className="object-cover h-[8.2rem] w-[8.2rem] md:h-[10rem] md:w-[10rem]"
      />
      <section className="flex items-center px-2 gap-4 text-gray-600 text-xs md:text-sm">
        <div className="flex flex-col gap-1">
          <Link
            to={{
              pathname: `/${id}`,
              query: { id, nombre },
            }}
            className="text-base md:text-lg font-semibold w-fit text-cPrimary"
          >
            {nombre}
          </Link>
          <p className="line-clamp-2">{descripcion}</p>
          <p className="font-semibold text-cPrimary flex justify-between">
            <span>
              Precio unitario: <FormattedPrice amount={costo} />
            </span>
            <span className="block md:hidden">
              Subtotal:{" "}
              <FormattedPrice amount={costo * quantity} />
            </span>
          </p>
          <div className="flex items-center space-x-3 font-semibold duration-300 mb-1">
            <div className="flex space-x-3 font-medium">
              <button
                className="flex items-center space-x-1 group"
                onClick={() => deleteFromCart(id)}
              >
                <Trash className="text-lg text-red-600 group-hover:scale-125" />
                <span className="pt-0.5">Remover</span>
              </button>
            </div>
          </div>
        </div>
        {/* subtotal desktop  display */}
        <div className="text-base font-semibold text-cPrimary hidden md:block">
          <FormattedPrice amount={costo * quantity} />
        </div>
      </section>
    </section>
  );
};

export default CartProduct;