import {Link} from "react-router-dom";

export const CartSinServicios= ()=>{
    return (
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
    )
}