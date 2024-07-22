import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = (...a) => ({
  ...productSlice(...a),
  ...cartSlice(...a),
});

export const useStore = create(
  devtools(persist(store, { name: "CartStore" }), {
    enabled: true,
    name: "CartStore",
  })
);