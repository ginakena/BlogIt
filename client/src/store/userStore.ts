import { create } from "zustand";
import { persist } from "zustand/middleware";
import { removeToken } from "../utils/token";

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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logoutUser: () => {
        removeToken();
        set({ user: null });
      },
    }),
    {
      name: "user-store",
    }
  )
);