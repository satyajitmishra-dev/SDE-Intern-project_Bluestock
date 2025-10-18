import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface CompanyProfile {
  logo?: string | null;
  banner?: string | null;
  name: string;
  about: string;
  orgType?: string;
  industry?: string;
  teamSize?: string;
  founded?: string;
  website?: string;
  vision?: string;
  socials: { platform: string; url: string }[];
  location?: string;
  phone?: string;
  email?: string;
}

const steps = ["Company Info", "Founding Info", "Social Media Profile", "Contact", "Done"] as const;

function UploadBox({ label, onFile, preview }: { label: string; onFile: (url: string) => void; preview?: string | null }) {
  return (
    <label className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 w-full cursor-pointer hover:bg-muted/40">
      {preview ? (
        <img src={preview} alt={label} className="h-24 object-contain" />
      ) : (
        <svg className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5l-4.5-4.5-4.5 4.5M12 3v13.5" />
        </svg>
      )}
      <div className="text-sm text-muted-foreground">{label}</div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => onFile(String(reader.result));
          reader.readAsDataURL(f);
        }}
      />
    </label>
  );
}

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CompanyProfile>({
    name: "",
    about: "",
    socials: [
      { platform: "Facebook", url: "" },
      { platform: "Twitter", url: "" },
      { platform: "Instagram", url: "" },
      { platform: "YouTube", url: "" },
    ],
  });

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="flex items-center justify-between mb-8">
        <div className="text-xl font-semibold">Setup Progress</div>
        <div className="w-64">
          <div className="text-right text-sm text-primary font-medium">{progress}% Completed</div>
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <nav className="flex flex-wrap gap-3 text-sm mb-6">
        {steps.map((s, i) => (
          <button
            key={s}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2",
              i === step ? "bg-primary text-primary-foreground" : "bg-background",
            )}
            onClick={() => setStep(i)}
          >
            {s}
          </button>
        ))}
      </nav>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        {step === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox label="Upload Logo" preview={data.logo || null} onFile={(url) => setData((d) => ({ ...d, logo: url }))} />
              <UploadBox label="Banner Image" preview={data.banner || null} onFile={(url) => setData((d) => ({ ...d, banner: url }))} />
            </div>
            <div className="grid gap-4">
              <input
                className="h-11 rounded-md border px-3"
                placeholder="Company name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <textarea
                className="min-h-[120px] rounded-md border p-3"
                placeholder="About Us"
                value={data.about}
                onChange={(e) => setData({ ...data, about: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="h-11 rounded-md border px-3" value={data.orgType || ""} onChange={(e) => setData({ ...data, orgType: e.target.value })}>
              <option value="">Organization Type</option>
              <option>Private</option>
              <option>Public</option>
              <option>NGO</option>
            </select>
            <input className="h-11 rounded-md border px-3" placeholder="Industry Types" value={data.industry || ""} onChange={(e) => setData({ ...data, industry: e.target.value })} />
            <select className="h-11 rounded-md border px-3" value={data.teamSize || ""} onChange={(e) => setData({ ...data, teamSize: e.target.value })}>
              <option value="">Team Size</option>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>200+</option>
            </select>
            <input className="h-11 rounded-md border px-3" placeholder="Year of Establishment (yyyy)" value={data.founded || ""} onChange={(e) => setData({ ...data, founded: e.target.value })} />
            <input className="h-11 rounded-md border px-3 md:col-span-2" placeholder="Company Website" value={data.website || ""} onChange={(e) => setData({ ...data, website: e.target.value })} />
            <textarea className="min-h-[120px] rounded-md border p-3 md:col-span-3" placeholder="Company Vision" value={data.vision || ""} onChange={(e) => setData({ ...data, vision: e.target.value })} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {data.socials.map((s, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <select
                  className="h-11 rounded-md border px-3"
                  value={s.platform}
                  onChange={(e) => {
                    const socials = [...data.socials];
                    socials[i] = { ...socials[i], platform: e.target.value };
                    setData({ ...data, socials });
                  }}
                >
                  {[
                    "Facebook",
                    "Twitter",
                    "Instagram",
                    "YouTube",
                    "LinkedIn",
                    "TikTok",
                  ].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                <input
                  className="h-11 rounded-md border px-3 md:col-span-2"
                  placeholder="Profile link/url"
                  value={s.url}
                  onChange={(e) => {
                    const socials = [...data.socials];
                    socials[i] = { ...socials[i], url: e.target.value };
                    setData({ ...data, socials });
                  }}
                />
              </div>
            ))}
            <button
              className="text-sm text-primary"
              onClick={() => setData({ ...data, socials: [...data.socials, { platform: "Facebook", url: "" }] })}
            >
              + Add New Social Link
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <input className="h-11 rounded-md border px-3" placeholder="Map Location" value={data.location || ""} onChange={(e) => setData({ ...data, location: e.target.value })} />
            <input className="h-11 rounded-md border px-3" placeholder="Phone" value={data.phone || ""} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            <input className="h-11 rounded-md border px-3" placeholder="Email" value={data.email || ""} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-12">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 text-primary grid place-content-center">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Congratulations, Your profile is 100% complete!</h3>
            <p className="text-muted-foreground mb-6">You can now view your dashboard or public company profile.</p>
            <div className="flex items-center justify-center gap-3">
              <a href="/dashboard" className="h-11 rounded-md bg-primary px-5 text-primary-foreground">View Dashboard</a>
              <button className="h-11 rounded-md border px-5">View Profile</button>
            </div>
          </div>
        )}
      </section>

      <footer className="mt-6 flex items-center justify-between">
        <button className="h-11 rounded-md border px-5" onClick={prev} disabled={step === 0}>
          Previous
        </button>
        <button
          className="h-11 rounded-md bg-primary px-5 text-primary-foreground"
          onClick={() => {
            if (step === steps.length - 1) {
              localStorage.setItem("company_profile", JSON.stringify(data));
            } else {
              next();
            }
          }}
        >
          {step === steps.length - 1 ? "Finish Editing" : "Save & Next"}
        </button>
      </footer>

      <p className="mt-12 text-center text-xs text-muted-foreground">© 2025 Jobpilot • Job Board. All Rights Reserved</p>
    </div>
  );
}
