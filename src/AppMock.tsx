import React, { useState, useEffect } from "react";
import { Camera, QrCode, UserCheck, CarFront, Clock, Users, Sun, Moon, ShieldCheck, Check, X, ChevronRight } from "lucide-react";

// Branded mock for Wake Preparatory Academy
// Mobile-first polish: sticky header, single-column on small screens, full-width controls on mobile,
// scrollable tabs, comfortable tap targets.

const cx = (...cls: (string | boolean | undefined)[]) => cls.filter(Boolean).join(" ");

const Avatar = ({ initials = "WP" }: { initials?: string }) => (
  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-600 text-white grid place-content-center text-sm font-semibold shadow ring-2 ring-white/30">
    {initials}
  </div>
);

const Badge = ({ children, tone = "navy" as "navy" | "emerald" | "amber" | "gray" }) => {
  const tones: Record<string, string> = {
    navy: "bg-blue-50 text-blue-800 ring-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    gray: "bg-gray-50 text-gray-700 ring-gray-300",
  };
  return <span className={cx("px-2.5 py-1 rounded-full text-xs ring-1 inline-flex items-center gap-1", tones[tone])}>{children}</span>;
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={cx("rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-black/5 shadow-xl shadow-black/5", className)}>{children}</div>
);

const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button className="w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-xl bg-blue-800 text-white font-medium shadow hover:bg-blue-900 transition-colors">
    {children}
  </button>
);

const GhostButton = ({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className={cx("px-4 py-3 sm:px-3 sm:py-2 rounded-xl ring-1 text-sm", active ? "bg-blue-800 text-white ring-blue-800" : "bg-white ring-gray-300 text-gray-800 hover:bg-gray-50")}>{children}</button>
);

const Segmented = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { label: string; value: string; icon?: React.ReactNode }[] }) => (
  <div className="inline-flex rounded-xl ring-1 ring-gray-300 bg-white overflow-hidden">
    {options.map((o) => (
      <button key={o.value} onClick={() => onChange(o.value)} className={cx("px-3 py-2 text-sm flex items-center gap-1", value === o.value ? "bg-blue-800 text-white" : "text-gray-700 hover:bg-gray-50")}>{o.icon}{o.label}</button>
    ))}
  </div>
);

const QRPlaceholder = () => (
  <div className="aspect-square w-40 sm:w-44 rounded-2xl bg-white grid place-content-center ring-1 ring-gray-200 shadow-inner">
    <div className="grid grid-cols-7 gap-1 p-3">
      {Array.from({ length: 49 }).map((_, i) => (
        <div key={i} className={cx("h-2 w-2", i % 3 === 0 ? "bg-blue-900" : "bg-gray-200")} />
      ))}
    </div>
  </div>
);

const CameraFrame = () => (
  <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 ring-1 ring-black/10 shadow-md bg-gradient-to-br from-blue-950 via-blue-800 to-blue-900">
    <div className="absolute inset-0 grid place-content-center text-white/70 text-sm flex items-center gap-2">
      <Camera className="h-4 w-4" /> Camera preview
    </div>
    <div className="absolute inset-4 sm:inset-6 pointer-events-none">
      <div className="absolute top-0 left-0 h-8 w-8 border-l-2 border-t-2 border-white/80 rounded-tl-lg" />
      <div className="absolute top-0 right-0 h-8 w-8 border-r-2 border-t-2 border-white/80 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-l-2 border-b-2 border-white/80 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-r-2 border-b-2 border-white/80 rounded-br-lg" />
    </div>
    <div className="absolute left-4 right-4 top-8 sm:left-6 sm:right-6 sm:top-10 h-0.5 bg-white/70 animate-[scan_2.5s_ease-in-out_infinite]" />
    <style>{`@keyframes scan {0%{transform:translateY(0)}50%{transform:translateY(9rem)}100%{transform:translateY(0)}}`}</style>
  </div>
);

// Logo component with safe fallback if the image is missing.
// Pass a URL via window.WAKEPREP_LOGO_URL or place "/wakeprep-logo.png" in public/.
const LogoImage = () => {
  const [hasImg, setHasImg] = useState(true);
  const src = (typeof window !== "undefined" && (window as any).WAKEPREP_LOGO_URL) || "/wakeprep-logo.png";
  return (
    <div className="flex items-center gap-3">
      {hasImg ? (
        <img
          src={src}
          alt="Wake Prep Logo"
          className="h-8 sm:h-10 w-auto"
          onError={() => setHasImg(false)}
        />
      ) : (
        <div className="h-10 w-10 rounded-lg bg-white grid place-content-center ring-1 ring-white/40">
          <span className="text-blue-900 font-black">W</span>
        </div>
      )}
    </div>
  );
};

function TopBar({ onToggleTheme, dark }: { onToggleTheme: () => void; dark: boolean }) {
  return (
    <div className="relative sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600" />
      <div className="relative flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 text-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <LogoImage />
          <div className="leading-tight">
            <div className="font-semibold">Wake Prep Carline</div>
            <div className="text-[11px] sm:text-xs text-white/80">Single Lane • Today 2:30–3:15</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton><QrCode className="h-4 w-4 mr-1" /> Placards</GhostButton>
          <GhostButton><ShieldCheck className="h-4 w-4 mr-1" /> Safety</GhostButton>
          <button onClick={onToggleTheme} className="hidden sm:inline-flex ml-2 px-3 py-2 rounded-xl bg-white/20 text-white ring-1 ring-white/30 hover:bg-white/30" aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="hidden sm:block ml-2"><Avatar /></div>
        </div>
      </div>
    </div>
  );
}

function NavTabs({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const tabs = [
    { id: "scan", label: "Staff • Scan" },
    { id: "queue", label: "Staff • Queue" },
    { id: "announce", label: "Parent • Announce" },
    { id: "questions", label: "Parent • Questions" },
  ];
  return (
    <div className="px-3 sm:px-4 py-2 bg-white/70 backdrop-blur border-b">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cx(
              "flex-shrink-0 px-3 py-2 rounded-xl text-sm font-medium ring-1 ring-gray-300 transition",
              tab === t.id ? "bg-white shadow-sm" : "bg-gray-50 text-gray-700 hover:bg-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StaffScan() {
  const [lunch, setLunch] = useState("yes");
  const [after, setAfter] = useState("no");
  return (
    <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Scan Vehicle Placard</h2>
          <Badge tone="gray"><Clock className="h-3.5 w-3.5" /> Live</Badge>
        </div>
        <Card className="p-4">
          <CameraFrame />
          <div className="mt-3 flex gap-2">
            <input placeholder="Manual code…" className="w-full sm:flex-1 px-3 py-3 sm:py-2 rounded-xl ring-1 ring-gray-300 focus:ring-blue-300 outline-none" />
            <PrimaryButton>Lookup</PrimaryButton>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gray-100 ring-1 ring-gray-200 grid place-content-center text-gray-500">Photo</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-base sm:text-lg font-semibold">Jordan Patel</div>
              <Badge tone="emerald"><UserCheck className="h-3.5 w-3.5" /> Authorized</Badge>
            </div>
            <div className="text-sm text-gray-600">Father • (555) 555‑0142</div>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
              <Badge tone="gray">Placard: A‑1247</Badge>
              <Badge tone="gray">Vehicle: Blue SUV</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Students</div>
          <div className="grid gap-2">
            <div className="p-3 rounded-xl ring-1 ring-gray-200 bg-white flex items-center justify-between">
              <div>
                <div className="font-medium">Ava Patel</div>
                <div className="text-xs text-gray-500">Homeroom 2B</div>
              </div>
              <Badge tone="gray">Waiting</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-600">Live Questions</div>
            <Badge tone="gray">Real‑time sync</Badge>
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Lunch today?</div>
              <div className="mt-2">
                <Segmented value={lunch} onChange={setLunch} options={[{ label: "Yes", value: "yes", icon: <Check className="h-4 w-4" /> }, { label: "No", value: "no", icon: <X className="h-4 w-4" /> }]} />
              </div>
              <div className="mt-2 text-xs text-gray-500">Parent answered: <span className="font-semibold">Yes</span></div>
            </div>
            <div>
              <div className="text-sm font-medium">After care?</div>
              <div className="mt-2">
                <Segmented value={after} onChange={setAfter} options={[{ label: "Yes", value: "yes", icon: <Check className="h-4 w-4" /> }, { label: "No", value: "no", icon: <X className="h-4 w-4" /> }]} />
              </div>
              <div className="mt-2 text-xs text-gray-500">Parent answered: <span className="font-semibold">No</span></div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs text-gray-500">Audit will log guardian, time, and answers.</div>
          <PrimaryButton>Release Student</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function StaffQueue() {
  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Lane A Queue</h2>
        <Badge tone="gray"><Users className="h-3.5 w-3.5" /> 6 in line</Badge>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Card key={n} className="p-4 flex items-center justify-between hover:shadow-lg transition-shadow group">
            <div>
              <div className="font-semibold">A‑{1200 + n}</div>
              <div className="text-xs text-gray-500">Jordan Patel • ETA 2m</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Students: Ava</div>
              <div className="text-xs text-gray-500">Status: Arrived</div>
            </div>
            <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function ParentAnnounce() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Announce Pickup</h2>
        <Badge tone="gray"><Clock className="h-3.5 w-3.5" /> Window 2:30–3:15</Badge>
      </div>

      <Card className="p-5 space-y-4">
        <div className="text-sm font-medium">Select student(s)</div>
        <div className="flex gap-2 flex-wrap">
          <button className="w-full sm:w-auto px-3 py-2 rounded-xl ring-1 ring-gray-300 bg-white hover:bg-gray-50">Ava Patel</button>
        </div>
        <PrimaryButton>Announce Arrival</PrimaryButton>
      </Card>

      <Card className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
        <QRPlaceholder />
        <div className="text-center sm:text-left">
          <div className="font-medium">Show this to staff</div>
          <div className="text-sm text-gray-600">Placard: A‑1247 • Tap to brighten screen</div>
          <div className="mt-2 text-xs text-gray-500">Auto‑refreshes every 2 minutes.</div>
        </div>
      </Card>
    </div>
  );
}

function ParentQuestions() {
  const [lunch, setLunch] = useState("");
  const [after, setAfter] = useState("");
  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-2xl">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Quick Questions</h2>
      <Card className="p-5 space-y-5">
        <div>
          <div className="text-sm font-medium">Lunch today?</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <GhostButton active={lunch === "yes"} onClick={() => setLunch("yes")}>Yes</GhostButton>
            <GhostButton active={lunch === "no"} onClick={() => setLunch("no")}>No</GhostButton>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">After care?</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <GhostButton active={after === "yes"} onClick={() => setAfter("yes")}>Yes</GhostButton>
            <GhostButton active={after === "no"} onClick={() => setAfter("no")}>No</GhostButton>
          </div>
        </div>
        <PrimaryButton>Submit</PrimaryButton>
        <p className="text-xs text-gray-500">Your answers update teacher’s screen instantly.</p>
      </Card>
    </div>
  );
}

// ——— Minimal logic + tests (non-blocking) ———
export type RideRequest = { id: string; arrivalTime: number; announceTime: number };
export function orderQueue(reqs: RideRequest[]) {
  return reqs.slice().sort((a, b) => (a.arrivalTime - b.arrivalTime) || (a.announceTime - b.announceTime));
}
export function buildPlacardPayload(placardCode: string, rideId: string, ttlSec: number) {
  if (!placardCode || !rideId) throw new Error("placardCode and rideId are required");
  if (ttlSec <= 0) throw new Error("ttlSec must be > 0");
  return `${placardCode}.${rideId}.${ttlSec}`;
}

// Lightweight runtime tests (won't throw; only log/assert). Run in browser env only.
if (typeof window !== "undefined") {
  const tests = () => {
    // Existing test: order by arrival then announce
    const ordered = orderQueue([
      { id: "b", arrivalTime: 20, announceTime: 5 },
      { id: "a", arrivalTime: 10, announceTime: 8 },
      { id: "c", arrivalTime: 10, announceTime: 2 },
    ]);
    console.assert(ordered[0].id === "c" && ordered[1].id === "a", "orderQueue sorts by arrival then announce");

    // Existing test: payload structure
    const payload = buildPlacardPayload("A-123", "ride1", 120);
    console.assert(payload.split(".").length === 3, "buildPlacardPayload structure");

    // Added tests: invalid inputs
    let threw1 = false; try { buildPlacardPayload("", "ride1", 120); } catch { threw1 = true; }
    console.assert(threw1, "buildPlacardPayload should throw when placardCode missing");

    let threw2 = false; try { buildPlacardPayload("A-1", "", 120); } catch { threw2 = true; }
    console.assert(threw2, "buildPlacardPayload should throw when rideId missing");

    let threw3 = false; try { buildPlacardPayload("A-1", "ride1", 0); } catch { threw3 = true; }
    console.assert(threw3, "buildPlacardPayload should throw when ttlSec <= 0");
  };
  try { tests(); } catch (e) { console.error("Mock tests failed", e); }
}

export default function AppMock() {
  const [tab, setTab] = useState("scan");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
      <div className="min-h-screen bg-white/60 backdrop-blur-sm">
        <TopBar onToggleTheme={() => setDark(!dark)} dark={dark} />
        <NavTabs tab={tab} setTab={setTab} />
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {tab === "scan" && <StaffScan />}
          {tab === "queue" && <StaffQueue />}
          {tab === "announce" && <ParentAnnounce />}
          {tab === "questions" && <ParentQuestions />}
        </div>
        <footer className="px-6 pb-24 sm:pb-10 text-xs text-gray-100">Design mock • Branded for Wake Prep • Mobile-optimized</footer>
      </div>
    </div>
  );
}
