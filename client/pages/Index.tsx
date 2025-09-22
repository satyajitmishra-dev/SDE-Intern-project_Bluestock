import { Link } from "react-router-dom";

export default function Index() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-white" />
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" /> New • Company Onboarding Suite
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Jobpilot: Elegant onboarding for modern companies
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Firebase login/register, secure JWT session exchange, and a pixel‑perfect multi‑step company setup wizard.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/register" className="h-11 rounded-md bg-primary px-5 text-primary-foreground">Get started</Link>
              <Link to="/login" className="h-11 rounded-md border px-5">I already have an account</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 p-1 shadow-2xl">
            <div className="rounded-xl bg-white/60 p-8 backdrop-blur">
              <div className="mx-auto grid h-64 place-items-center rounded-lg bg-gradient-to-br from-indigo-200 to-violet-200 text-sm text-muted-foreground">
                Company Setup Preview
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="h-10 rounded-md bg-indigo-100" />
                <div className="h-10 rounded-md bg-indigo-100" />
                <div className="col-span-2 h-10 rounded-md bg-indigo-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
