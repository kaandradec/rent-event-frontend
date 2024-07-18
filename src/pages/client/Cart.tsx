import { useStore } from "@/store/store";
import { StoreProduct } from "../../../types";

import { Link } from "react-router-dom";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import CartPayment from "@/components/CartPayment";
import { useState } from "react";
import { DatePicker, Input } from "@nextui-org/react";
import { getLocalTimeZone, now } from "@internationalized/date";

/**
 * Cart component displays the user's shopping cart with a list of cart items.
 */
const Cart = () => {
  const cart = useStore((state) => state.cart);
  const cartQuantity = useStore((state) => state.cartQuantity);

  console.log("cart en CART", cart);

  // Transporte
  const [isSelected, setIsSelected] = useState(true);
  // Asistentes
  const [asistentes, setAsistentes] = useState(0);

  // Fecha y hora del evento validación
  const [fecha, setFecha] = useState("");


  // CALCULO DE PRECIO SUBTOTAL Y TOTAL
  const COSTO_TRANSPORTE = 0.25;
  const IVA = 0.15;

  const subtotal = (): number => {
    let total: number = 0;
    cart.map((item) => {
      {
        return item.quantity
          ? (total += item.quantity * item.costo)
          : (total += item.costo);
      }
    });
    return total;
  }

  const totalIva = (): number => {
    return subtotal() * IVA;
  }

  const costoTransporte = (): number => {
    if (asistentes < 20)
      return 0;
    return asistentes * COSTO_TRANSPORTE;
  }


  const totalPrice = (): number => {
    let total: number = subtotal();
    // Transporte
    if (isSelected && asistentes > 0) {
      total += costoTransporte();
    }
    // IVA
    total += totalIva();
    return total;
  };


  return (

    <main className="mt-10 max-w-screen-2xl mx-auto px-6 grid grid-cols-7 xl:grid-cols-9 gap-10 py-4">

      {cart.length > 0 ? (
        <>

          <section className="bg-white col-span-7 ls:col-span-5 xl:col-span-7 p-4 rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col lg:flex-row gap-8">
                <Input
                  type="text"
                  label="Nombre del evento"
                  labelPlacement="outside"
                  placeholder="Evento RentEvent"
                  maxLength={20}
                  description="Ingrese el nombre del evento que desea organizar."
                  onValueChange={(value) => setAsistentes(parseInt(value))}
                  validate={(value) => {
                    if (value.length < 1) {
                      return "Ingrese un nombre de evento";
                    }
                    return "";
                  }}
                />
                <DatePicker
                  labelPlacement="outside"
                  label="Fecha y hora del evento"
                  variant="flat"
                  hideTimeZone
                  showMonthAndYearPickers
                  minValue={now(getLocalTimeZone()).add({ days: 2 })}
                  maxValue={now(getLocalTimeZone()).add({ months: 2 })}
                  defaultValue={now(getLocalTimeZone()).add({ days: 3 })}
                  lang="es"
                  description="(Mes/Día/Año, Hora) El evento debe ser programado con al menos 2 días de anticipación y máximo 2 meses de anticipación."
                />
              </div>
              <Input
                type="text"
                label="Descripción del evento"
                labelPlacement="outside"
                placeholder="Descripción y detalles específicos del evento."
                maxLength={20}
                onValueChange={(value) => setAsistentes(parseInt(value))}
                validate={(value) => {
                  if (value.length < 1) {
                    return "Ingrese un nombre de evento";
                  }
                  return "";
                }}
              />
              <h1 className="font-normal">Direccion:</h1>
              <Input
                type="text"
                label="Calle principal"
                labelPlacement="outside"
                placeholder="Av..."
                maxLength={200}
                description="Ingrese la dirección del evento, si tiene alguna referencia adicional puede agregarla."
                onValueChange={(value) => setAsistentes(parseInt(value))}
                validate={(value) => {
                  if (value.length < 1) {
                    return "Ingrese una dirección";
                  }
                  return "";
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Calle Secundaria"
                  labelPlacement="outside"
                  placeholder="Calle..."
                  maxLength={200}
                  description="Ingrese la dirección del evento, si tiene alguna referencia adicional puede agregarla."
                  onValueChange={(value) => setAsistentes(parseInt(value))}
                  validate={(value) => {
                    if (value.length < 1) {
                      return "Ingrese una dirección";
                    }
                    return "";
                  }}
                />
                <Input
                  type="text"
                  label="Referencia"
                  labelPlacement="outside"
                  placeholder="Edificio... Piso..."
                  maxLength={200}
                  description="Ingrese la dirección del evento, si tiene alguna referencia adicional puede agregarla."
                  onValueChange={(value) => setAsistentes(parseInt(value))}
                  validate={(value) => {
                    if (value.length < 1) {
                      return "Ingrese una dirección";
                    }
                    return "";
                  }}
                />
              </div>

            </div>


            <div
              className="flex items-center justify-between border-b-2
                         border-b-gray-400 pb-1 text-gray-700"
            >
              <p className="font-semibold md:text-lg">
                Servicios ({cartQuantity})
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
                    flex items-center justify-center sticky lg:mt-32"
          >
            <CartPayment
              asistentes={asistentes}
              isSelected={isSelected}
              setAsistentes={setAsistentes}
              setIsSelected={setIsSelected}
              subtotal={subtotal}
              costoTransporte={costoTransporte}
              totalIva={totalIva}
              totalPrice={totalPrice}
            />
          </section>
        </>
      ) : (
        <section
          className="bg-white h-52 col-span-9 flex flex-col py-5 rounded-lg
                items-center justify-center shadow-lg"
        >
          <h1 className="text-lg font-semibold dark:text-secondary">
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