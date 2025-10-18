import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, loginWithEmail, selectAuth } from "@/store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await dispatch(loginWithEmail({ email, password }));
    if ((res as any).meta.requestStatus === "fulfilled") navigate("/dashboard");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 h-80 md:h-full" />
        <form onSubmit={submit} className="flex flex-col justify-center px-2 md:px-6">
          <h1 className="text-2xl font-semibold mb-6">Login as a Company</h1>
          <label className="mb-3">
            <span className="sr-only">Email</span>
            <input className="h-11 w-full rounded-md border px-3" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="mb-2 flex justify-end text-sm text-primary">
            <button type="button" onClick={() => alert("OTP flow requires Firebase Phone auth setup.")}>Login with OTP</button>
          </label>
          <label className="mb-2">
            <span className="sr-only">Password</span>
            <input className="h-11 w-full rounded-md border px-3" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="mb-6 text-sm text-primary">Forgot Password?</div>
          <button className="h-11 rounded-md bg-primary text-primary-foreground">Login</button>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Don’t have an account? <Link to="/register" className="text-primary">Sign up</Link>
          </div>
          {auth.status === "error" && <div className="mt-3 text-sm text-red-600">{auth.error}</div>}
        </form>
      </div>
    </div>
  );
}
