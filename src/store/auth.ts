import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string | null;
  role: string | null;
}
type Actions = {
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: null,
    role: null,
    setToken: (token: string) => set((state) => ({
      token: state.token = token,
    })),
    setRole: (role: string) => set((state) => ({
      role: state.role = role,
    })),

  }),
  {
    name: "auth",
  }
));