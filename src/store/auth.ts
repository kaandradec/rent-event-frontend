import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string | null;
}
type Actions = {
  setToken: (token: string) => void;
}

export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: null,
    setToken: (token: string) => set((state) => ({
      token: state.token = token,
    })),
  }),
  {
    name: "auth",
  }
));