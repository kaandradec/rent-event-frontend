import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string | null;
  role: string | null;
}
type Actions = {
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
}

export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: null,
    role: null,
    setToken: (token: string | null) => set((state) => ({
      token: state.token = token,
    })),
    setRole: (role: string | null) => set((state) => ({
      role: state.role = role,
    })),

  }),
  {
    name: "auth",
  }
));