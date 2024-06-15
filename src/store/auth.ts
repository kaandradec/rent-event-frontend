import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string | null;
  role: string | null;
  firstname: string | null;
  lastname: string | null;
  username: string | null;
}
type Actions = {
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  setFirstName: (firstname: string | null) => void;
  setLastName: (lastname: string | null) => void;
  setUsername: (username: string | null) => void;
}

export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: null,
    role: null,
    firstname: null,
    lastname: null,
    username: null,
    setToken: (token: string | null) => set((state) => ({
      token: state.token = token,
    })),
    setRole: (role: string | null) => set((state) => ({
      role: state.role = role,
    })),
    setFirstName: (firstname: string | null) => set((state) => ({
      firstname: state.firstname = firstname,
    })),
    setLastName: (lastname: string | null) => set((state) => ({
      lastname: state.lastname = lastname,
    })),
    setUsername: (username: string | null) => set((state) => ({
      username: state.username = username,
    })),
  }),
  {
    name: "auth",
  }
));