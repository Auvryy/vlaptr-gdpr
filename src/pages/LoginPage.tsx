import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuthStore();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill out the placeholders");
      return;
    }
    await login(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        <header className="mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Kinetic Account
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Experience clean frontend state architecture.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          {/* Injecting our Input Atoms with placeholders */}
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {/* Injecting our Button Atom */}
          <div className="mt-2">
            <Button
              label="Sign In"
              onClick={handleSignIn}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
