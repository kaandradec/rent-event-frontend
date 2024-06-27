import { useEffect, useMemo, useState } from "react";
// import { HiHeart, HiOutlineHeart } from "react-icons/hi";
// import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { Link, useSearchParams } from "react-router-dom";
import { useStore } from "@/store/store";
import { ProductProps } from "../../../types";
import { Image } from "@nextui-org/react";
import AddToCartBtn from "@/components/AddToCartBtn";
import FormattedPrice from "@/components/FormattedPrice";
import { getServices } from "@/api/services";
import { set } from "date-fns";
// import { useSearchParams } from "next/navigation";

export default function Services() {
  return (
    <main className="mt-80">
      <section className="flex justify-center relative -mt-60 z-20 mb-10">
        <Products />
      </section>
    </main>
  )
}


function Products() {
  // Access the product state and fetchProduct function from the store
  const product = useStore((state) => state.product);
  const [searchParams] = useSearchParams();
  const filter = searchParams.getAll('filter');

  const setProducts = useStore((state) => state.setProducts);



  type ResponseService = {
    id: string | number
    codigo: string
    nombre: string,
    estado: "ACTIVO" | "INACTIVO",
    tipo: "CATERING" | "DECORACION" | "ENTRETENIMIENTO" | "FOTOGRAFIA" | "MUSICA" | "ILUMINACION" | "SEGURIDAD" | "TRANSPORTE" | "OTROS",
    costo: number | string,
    descripcion?: string,
    imagenes?: { url: string }[],
    proveedor?: { nombre: string }
  }

  const mapData = (data: ResponseService[]) => {
    return data.map((service: ResponseService) => {
      return {
        id: service.id,
        codigo: service.codigo,
        nombre: service.nombre,
        tipo: service.tipo,
        estado: service.estado,
        descripcion: service.descripcion,
        imagen: service.imagenes?.[0]?.url ?? "",
        costo: service.costo,
      }
    })
  }

  const fetchServices = async () => {
    const services = await getServices();
    setProducts(mapData(services?.data))
  }

  useEffect(() => {
    fetchServices()
  }, []);

  const filteredProducts = useMemo(() => {
    let filteredProd: ProductProps[];
    // Check the filter type to apply the appropriate filtering logic
    if (filter[0] === "costo" && typeof filter[1] === 'number' && typeof filter[2] === 'number') {
      // Filter products by price range
      filteredProd = product.filter(
        (item) =>
          item.costo >= filter[1] && item.costo <= filter[2]
      );
    } else {
      // Assuming filter[1] is of type string for non-price filters
      filteredProd = product.filter(
        // Filter products by other criteria (like, tipo, brand)
        (item) => item[filter[0]] === filter[1]
      );
    }
    // Ensure that filtered products are returned if available; otherwise, return the original product list
    return filteredProd.length > 0 ? filteredProd : product;

  }, [product, filter]);

  return (
    <section className="flex justify-center">
      <div
        className="md:w-[90vw] grid grid-cols-2 md:grid-cols-3
                 ls:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-6"
      >
        {filteredProducts?.map(
          ({
            id,
            codigo,
            nombre,
            tipo,
            descripcion,
            imagen,
            estado,
            costo,
          }) => {
            return (
              <div
                key={id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link
                  to="#">
                  <Image
                    className="p-8 rounded-t-lg"
                    src={imagen}
                    alt="product image"
                  />
                </Link>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {nombre}
                    </h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {tipo}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      <FormattedPrice amount={costo} />
                    </span>
                    <AddToCartBtn
                      id={id}
                      codigo={codigo}
                      nombre={nombre}
                      tipo={tipo}
                      descripcion={descripcion}
                      imagen={imagen}
                      costo={costo}
                      estado={estado}
                      quantity={1}
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

