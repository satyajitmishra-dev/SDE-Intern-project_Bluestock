import MultiStepForm from "@/components/MultiStepForm";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="grid h-8 w-8 place-content-center rounded-md bg-primary text-primary-foreground">🏢</span>
          Jobpilot
        </a>
        <nav className="text-sm text-muted-foreground">Setup Wizard</nav>
      </header>
      <main className="px-6 pb-16">
        <MultiStepForm />
      </main>
    </div>
  );
}
