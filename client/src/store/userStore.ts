import { create } from "zustand";
import { type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const userStore: StateCreator<UserStore> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logoutUser: () => set({ user: null }),
});

export const useUserStore = create<UserStore>()(
  persist(userStore, {
    name: "user-store", // key in localStorage
  })
);