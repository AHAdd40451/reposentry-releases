import {
  Activity, Bell, BellRing, Bot, Building2, Check, Cpu, CreditCard, Gauge, LayoutDashboard, Radar, ScanSearch, ShieldAlert, ShieldCheck,
  Sparkles, Users, Zap,
} from 'lucide-react';

const PILLARS = [
  {
    icon: Cpu,
    tone: 'from-orange-500 to-amber-400',
    title: 'Native Rust engine',
    text: 'A compiled scanner on your machine reads every file of a repo in seconds, before git hands it to npm, your editor or a script. Nothing in the repo runs during the check.',
    stat: '20,000 files',
    statLabel: 'checked per repo',
  },
  {
    icon: Bot,
    tone: 'from-brand-500 to-violet-500',
    title: 'AI security review',
    text: 'Only the suspicious lines go to the AI. It explains the whole attack in plain words, file by file: what runs, when, and what it steals.',
    stat: 'Plain English',
    statLabel: 'not a wall of rule IDs',
  },
  {
    icon: BellRing,
    tone: 'from-rose-500 to-pink-500',
    title: 'Owners hear it instantly',
    text: 'The moment an employee meets malicious code, blocks a bad push or cleans a repo, the company owner gets an alert in the dashboard and in Slack, Teams or Discord.',
    stat: '< 5 seconds',
    statLabel: 'from clone to alert',
  },
  {
    icon: Radar,
    tone: 'from-emerald-500 to-teal-400',
    title: 'Real-time, every clone',
    text: 'Git hooks wake RepoSentry on every clone. The app comes forward with a live check; pulls and pushes are guarded quietly. One click removes what it finds.',
    stat: 'Always on',
    statLabel: 'in the background',
  },
];

function DashboardMock() {
  const nav = [
    { icon: LayoutDashboard, label: 'Overview', on: true },
    { icon: Bell, label: 'Alerts', badge: 2 },
    { icon: Users, label: 'Employees' },
    { icon: Activity, label: 'Activity' },
    { icon: CreditCard, label: 'Billing' },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-x-6 -inset-y-6 rounded-[2rem] bg-gradient-to-b from-brand-600/25 via-violet-600/10 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F1E] shadow-2xl shadow-brand-600/20">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-500">admin.reposentry.coderivals.ltd</span>
        </div>
        <div className="grid min-h-[380px] grid-cols-[170px_1fr] max-md:grid-cols-1">
          <aside className="border-r border-white/5 bg-[#080C19] p-3 max-md:hidden">
            <p className="flex items-center gap-2 px-2 text-sm font-semibold text-white"><ShieldCheck className="h-4 w-4 text-brand-400" />RepoSentry</p>
            <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2"><p className="text-xs font-medium text-white">Acme Inc.</p><p className="text-[10px] text-slate-500">40 computers · Team</p></div>
            <ul className="mt-3 space-y-0.5">
              {nav.map((n) => (
                <li key={n.label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${n.on ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
                  <n.icon className="h-3.5 w-3.5" />{n.label}
                  {n.badge && <span className="ml-auto rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">{n.badge}</span>}
                </li>
              ))}
            </ul>
          </aside>
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500 text-white"><BellRing className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-rose-200">2 new security alerts</p><p className="truncate text-[11px] text-rose-300/80">Sara Khan cloned a repo with a hidden loader. Blocked before it ran.</p></div>
              <span className="rounded-md bg-rose-500 px-2 py-1 text-[10px] font-semibold text-white">Review</span>
            </div>
            <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
              {[
                { icon: Building2, l: 'Computers', v: '38/40' },
                { icon: ShieldCheck, l: 'Protected', v: '100%' },
                { icon: Gauge, l: 'AI checks left', v: '1,712' },
                { icon: ShieldAlert, l: 'Threats, 30d', v: '7', red: true },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
                  <s.icon className={`h-3.5 w-3.5 ${s.red ? 'text-rose-400' : 'text-brand-300'}`} />
                  <p className="mt-1.5 text-base font-semibold text-white">{s.v}</p>
                  <p className="text-[10px] text-slate-500">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1.3fr_1fr] gap-2 max-sm:grid-cols-1">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <p className="text-[11px] font-semibold text-white">Recent alerts</p>
                {[
                  { c: 'bg-rose-500/15 text-rose-300', t: 'Malicious code found', w: 'Sara · take-home-test', a: '2m' },
                  { c: 'bg-emerald-500/15 text-emerald-300', t: 'Cleaned up', w: 'Sara removed 3 items', a: '1m' },
                  { c: 'bg-rose-500/15 text-rose-300', t: 'Push blocked', w: 'Ali · payments-api', a: '3h' },
                ].map((a) => (
                  <div key={a.w} className="mt-2 flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${a.c}`}>{a.t}</span>
                    <span className="min-w-0 flex-1 truncate text-[11px] text-slate-400">{a.w}</span>
                    <span className="text-[10px] text-slate-600">{a.a}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-brand-500/30 bg-gradient-to-b from-brand-600/15 to-transparent p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white"><Sparkles className="h-3.5 w-3.5 text-brand-300" />AI security review</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-300">A fake font file decodes and runs a hidden payload when the folder opens in VS Code, and again on <span className="font-mono">npm start</span>.</p>
                <p className="mt-2 inline-flex rounded bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-300">Safe to run: no</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live check from the desktop app */}
      <div className="absolute -bottom-10 -left-6 hidden w-[270px] animate-float rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl lg:block">
        <p className="flex items-center gap-2 text-[11px] font-medium text-brand-300"><ScanSearch className="h-3.5 w-3.5" />Live check · desktop app</p>
        <p className="mt-1.5 font-mono text-xs text-white">take-home-test</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full animate-shine rounded-full bg-[linear-gradient(90deg,#6366F1,#A78BFA,#6366F1)] bg-[length:200%_100%]" /></div>
        <p className="mt-1.5 text-[11px] text-slate-400">214 files · Rust engine · 1.2s</p>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-rose-300"><ShieldAlert className="h-3.5 w-3.5" />Malicious · owner alerted</p>
      </div>
    </div>
  );
}

/** Right under the hero: what the product is, at a glance. The dashboard, and the four things doing the work. */
export function Platform() {
  return (
    <section id="platform" className="relative scroll-mt-20 pb-28 pt-6">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mx-auto"><Zap className="h-3.5 w-3.5" />How RepoSentry protects you</span>
          <h2 className="h2 mt-5">One engine on every laptop. One dashboard for the owner.</h2>
          <p className="mt-4 text-lg text-slate-400">
            Developers clone as usual. RepoSentry checks each repo the instant it lands, explains anything dangerous, cleans it up, and tells the company owner right away.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl"><DashboardMock /></div>

        <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <li key={p.title} className="glass group flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-white/20">
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${p.tone} text-white shadow-lg`}><p.icon className="h-5 w-5" /></span>
              <h3 className="mt-5 font-semibold text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
              <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs text-slate-500"><span className="block text-base font-semibold text-white">{p.stat}</span>{p.statLabel}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {['Live check on every clone', 'One-click cleanup with backups', 'Push and secret guards', 'Daily safety tips in the app'].map((t) => (
            <p key={t} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-slate-300"><Check className="h-4 w-4 text-emerald-400" />{t}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
