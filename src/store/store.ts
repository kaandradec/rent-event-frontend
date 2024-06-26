import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favouriteSlice";


const store = (...a) => ({
  ...productSlice(...a),
  ...cartSlice(...a),
  ...favoriteSlice(...a),
});

export const useStore = create(
  devtools(persist(store, { name: "CartStore" }), {
    enabled: true,
    name: "CartStore",
  })
);