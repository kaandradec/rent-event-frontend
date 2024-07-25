const productSlice = (set: any, get: any) => ({
  product: [],
  setProducts: async (products: any) => {
    // get data from the fakeApi and setting it as product data
    set({ product: [...products] });
  },
});

export default productSlice;