import { useState } from 'react'
import HomePage from "./pages/HomePage"
import { useAuthStore } from "./store/useAuthStore"
import CartPage from "./pages/CartPage"
import AuthPage from './pages/AuthPage'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [view, setView] = useState('home')

  if (!isAuthenticated) return <AuthPage />

  if (view === 'cart') return <CartPage />
  return <HomePage onViewChange={setView} />

}

export default App
