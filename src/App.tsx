// import { useState } from 'react'
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { useAuthStore } from "./store/useAuthStore"

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  

  return (
    isLoggedIn ? <HomePage/> : <LoginPage/>
  )
}

export default App
