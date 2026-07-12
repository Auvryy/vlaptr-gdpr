import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { Divide } from 'lucide-react'


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false);

  const { login, isLoading } = useAuthStore()

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Please fill out the placeholders")
      return
    }

    if (isLogin) {
      await login(username, password)
    } else {
      setIsRegistering(true)
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if (!response.ok) {
          alert(`Error ${data.message}`)
        }

        alert(`Good ${data.message}`)
        setIsLogin(true)
        setPassword("")
      } catch (error) {
        console.error(`Registration Error: ${error} `)
        alert("could not reach backend server")
      } finally {
        setIsRegistering(false)
      }
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-amber-50 p-6'>
      <section className='w-full max-w-md flex flex-col items-center justify-center bg-blue-500 border rounded-xl p-8 shadow-2xl'>
        <header className="mb-6">
          <h2 className='text-2xl font-bold text-white tracking-tight'>
            {isLogin ? "Vlaptr" : "Gdpr"}
          </h2>
          <p className='text-white text-sm mt-2'>
            {isLogin ? "Login your account" : "Create an account"}
          </p>
        </header>
        <div className='flex flex-col gap-4'>
          <InputField
            label='Username'
            type='text'
            value={username}
            onChange={setUsername}
          />
          <InputField
            label='Password'
            type='password'
            value={password}
            onChange={setPassword}
          />

          <div className='mt-3'>
            <Button
              label={isLogin ? "Sign In" : "Create Account"}
              onClick={handleSubmit}
              loading={isLogin ? isLoading : isRegistering}
            />
          </div>
        </div>
        <footer className='mt-4 text-center text-white'>
          <span>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setUsername('')
              setPassword('')
            }}
            className='border-none bg-transparent text-blue-600 cursor-pointer'
          >
            {isLogin ? "Register here" : "Sign in here"}
          </button>
        </footer>
      </section>

    </div>
  )

}
