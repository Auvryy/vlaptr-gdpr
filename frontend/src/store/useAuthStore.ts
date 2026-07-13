import { create } from "zustand";


interface User {
  id: string
  username: string
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const getInitialState = () => {
  const token = localStorage.getItem("token")
  const userStr = localStorage.getItem("user")

  if (!token || !userStr) {
    return { user: null, token: null, isAuthenticated: false }
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const isExpired = (payload.exp * 1000) < Date.now();

    if (isExpired) {
      console.log("Token expired! Sweeping local storage..")
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      return { user: null, token: null, isAuthenticated: false }
    }

    return {
      user: JSON.parse(userStr),
      token,
      isAuthenticated: true
    }
  } catch (error) {
    return { user: null, token: null, isAuthenticated: false }
  }
}

const initialState = getInitialState()

export const useAuthStore = create<AuthState>((set) => ({
  user: initialState.user,
  token: initialState.token,
  isLoading: false,
  isAuthenticated: initialState.isAuthenticated,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "something went wrong.")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false })
      alert(`${data.message} Welcome Back ${data.user.username}`)

    } catch (error: any) {
      set({ isLoading: false })
      alert(`login failed: ${error.message}`)
    }
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, token: null, isAuthenticated: false })
  }
}));
