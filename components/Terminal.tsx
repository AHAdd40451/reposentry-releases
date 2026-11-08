import { ShieldAlert } from 'lucide-react';

type Line = { t: string; c?: string; d: number };

const LINES: Line[] = [
  { t: '$ git clone github.com/talent-hq/frontend-take-home', c: 'text-white', d: 0.2 },
  { t: 'Cloning into quarantine…', c: 'text-slate-500', d: 0.9 },
  { t: 'RepoSentry ▸ checking 214 files before anything can run', c: 'text-brand-300', d: 1.5 },
  { t: '  ✓ src/  ✓ README.md  ✓ vite.config.ts', c: 'text-emerald-400/90', d: 2.1 },
  { t: '  ✗ package.json  "postinstall": "node scripts/setup.js"', c: 'text-rose-400', d: 2.7 },
  { t: '    ↳ eval(Buffer.from("aW1wb3J0IG9z…", "base64"))', c: 'text-slate-400', d: 3.2 },
  { t: '    ↳ reads ~/.ssh, Chrome “Login Data”, MetaMask vault', c: 'text-slate-400', d: 3.6 },
  { t: '    ↳ sends them to 45.61.xxx.xxx:1224', c: 'text-slate-400', d: 4.0 },
  { t: '  ✗ .vscode/tasks.json  runs on folder open', c: 'text-rose-400', d: 4.5 },
];

export function Terminal() {
  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-500/40 via-white/5 to-transparent" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F1E]/95 shadow-2xl shadow-brand-600/20">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-slate-500">~/projects — zsh</span>
        </div>
        <div className="min-h-[300px] space-y-1.5 overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed sm:pb-28 sm:text-[13px]">
          {LINES.map((l) => (
            <p key={l.t} className={`animate-line whitespace-pre ${l.c ?? ''}`} style={{ animationDelay: `${l.d}s` }}>{l.t}</p>
          ))}
          <p className="animate-line pt-2" style={{ animationDelay: '5.1s' }}>
            <span className="rounded bg-rose-500/15 px-2 py-1 font-semibold text-rose-300 ring-1 ring-rose-500/30">⛔ BLOCKED</span>
            <span className="ml-2 text-white">Malicious. npm install stopped. Nothing ran.</span>
          </p>
        </div>
      </div>

      {/* Native notification */}
      <div className="relative mt-4 w-full animate-pop sm:absolute sm:-bottom-8 sm:-right-8 sm:mt-0 sm:w-[300px]" style={{ animationDelay: '5.6s' }}>
        <div className="animate-float rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500">
              <ShieldAlert className="h-5 w-5 text-white" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white">Dangerous repo blocked</p>
              <p className="mt-0.5 text-xs leading-snug text-slate-400">frontend-take-home tries to steal your SSH keys and crypto wallets.</p>
              <div className="mt-2.5 flex gap-2">
                <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white">View details</span>
                <span className="rounded-md px-2 py-1 text-[11px] text-slate-400">Delete repo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
