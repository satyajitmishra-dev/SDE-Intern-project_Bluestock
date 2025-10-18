import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, registerWithEmail, selectAuth } from "@/store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    const res = await dispatch(registerWithEmail({ email, password }));
    if ((res as any).meta.requestStatus === "fulfilled") navigate("/dashboard");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 h-80 md:h-full" />
        <form onSubmit={submit} className="flex flex-col justify-center px-2 md:px-6">
          <h1 className="text-2xl font-semibold mb-6">Register as a Company</h1>
          <label className="mb-3">
            <input className="h-11 w-full rounded-md border px-3" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <label className="mb-3">
            <input className="h-11 w-full rounded-md border px-3" placeholder="Organization Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <input className="h-11 w-full rounded-md border px-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="h-11 w-full rounded-md border px-3" placeholder="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <label className="mb-5 text-xs text-muted-foreground">
            <input type="checkbox" className="mr-2" /> I agree to the terms and privacy policy
          </label>
          <button className="h-11 rounded-md bg-primary text-primary-foreground">Register</button>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary">Login</Link>
          </div>
          {auth.status === "error" && <div className="mt-3 text-sm text-red-600">{auth.error}</div>}
        </form>
      </div>
    </div>
  );
}
