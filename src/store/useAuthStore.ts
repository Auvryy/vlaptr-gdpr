import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isLoading: false,
  login: async (email) => {
    set({ isLoading: true });
    console.log(`logging in user: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ isLoggedIn: true, isLoading: false });
    return true;
  },
  logout: () => set({ isLoggedIn: false }),
}));
