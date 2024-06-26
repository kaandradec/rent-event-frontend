import { useEffect, useMemo } from "react";
// import { HiHeart, HiOutlineHeart } from "react-icons/hi";
// import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { Link, useSearchParams } from "react-router-dom";
import { useStore } from "@/store/store";
import { ProductProps } from "../../../types";
import { Image } from "@nextui-org/react";
import AddToCartBtn from "@/components/AddToCartBtn";
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
  // const favorites = useStore((state) => state.favorites);
  // const addToFavorites = useStore((state) => state.addToFavorites);
  const fetchProduct = useStore((state) => state.fetchProduct);
  const [searchParams] = useSearchParams();
  const filter = searchParams.getAll('filter');

  useEffect(() => {
    // Fetch product data on component mount
    fetchProduct();
  }, [fetchProduct]);

  const filteredProducts = useMemo(() => {
    let filteredProd: ProductProps[];
    // Check the filter type to apply the appropriate filtering logic
    if (filter[0] === "price" && typeof filter[1] === 'number' && typeof filter[2] === 'number') {
      // Filter products by price range
      filteredProd = product.filter(
        (item) =>
          item.price >= filter[1] && item.price <= filter[2]
      );
    } else {
      // Assuming filter[1] is of type string for non-price filters
      filteredProd = product.filter(
        // Filter products by other criteria (like, category, brand)
        (item) => item[filter[0]] === filter[1]
      );
    }
    // Ensure that filtered products are returned if available; otherwise, return the original product list
    return filteredProd.length > 0 ? filteredProd : product;

  }, [product, filter]);

  // const favoriteStyle =
  //   "w-9 ml:w-12 h-9 ml:h-12 absolute bottom-1 flex right-1 border-[1px] bg-white rounded-lg\
  //        text-cPrimary shadow-md items-center justify-center text-lg ml:text-2xl hover:bg-cPrimary/10";

  return (
    <section className="flex justify-center">
      <div
        className="md:w-[90vw] grid grid-cols-2 md:grid-cols-3
                 ls:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-6"
      >
        {filteredProducts?.map(
          ({
            _id,
            title,
            brand,
            category,
            description,
            image,
            isNew,
            oldPrice,
            price,
          }) => {
            return (
              <div
                key={_id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link
                  to="#">
                  <Image
                    className="p-8 rounded-t-lg"
                    src={image}
                    alt="product image"
                  />
                </Link>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {title}
                    </h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      <FormattedPrice amount={price} />
                    </span>
                    <AddToCartBtn
                      _id={_id}
                      title={title}
                      brand={brand}
                      category={category}
                      description={description}
                      image={image}
                      isNew={isNew}
                      oldPrice={oldPrice}
                      price={price}
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


interface Props {
  amount: number;
}

function FormattedPrice({ amount }: Props) {
  const formattedAmount = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return <span>{formattedAmount}</span>;
}