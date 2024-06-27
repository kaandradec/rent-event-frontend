import { fakeApi } from "@/mocks/fakeProductsApi";

const productSlice = (set, get) => ({
  product: [],
  setProducts: async (products) => {
    // get data from the fakeApi and setting it as product data
    set({ product: [...products] });
  },
});

export default productSlice;