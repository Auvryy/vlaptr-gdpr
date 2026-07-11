import { useState } from 'react'
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { useAuthStore } from "./store/useAuthStore"
import CartPage from "./pages/CartPage"

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const [view, setView] = useState('home')

  if (!isLoggedIn) return <LoginPage />

  if (view === 'cart') return <CartPage />
  return <HomePage onViewChange={setView} />

}

export default App
