import { fakeApi } from "@/mocks/fakeProductsApi";


const productSlice = (set, get) => ({
  product: [],
  fetchProduct: async () => {
    // get data from the fakeApi and setting it as product data
    set({ product: [...fakeApi] });
  },
});

export default productSlice;