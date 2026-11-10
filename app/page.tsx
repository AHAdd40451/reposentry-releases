import {
  ArrowRight, BellRing, Bot, Briefcase, Check, Cpu, EyeOff, FileWarning, FolderLock, GitPullRequestArrow, KeyRound,
  LifeBuoy, Lock, MessageSquareWarning, Network, PackageX, ScanSearch, ShieldCheck, Sparkles, Users, Zap,
} from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Terminal } from '@/components/Terminal';
import { DownloadPanel, PrimaryDownload } from '@/components/Download';
import { CONTACT_EMAIL, SIGNUP } from '@/lib/config';
import { Platform } from '@/components/Platform';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-hidden">
        <Hero />
        <Platform />
        <Threats />
        <HowItWorks />
        <Features />
        <Privacy />
        <Teams />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative pb-28 pt-32 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
        <div className="min-w-0">
          <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" />For developers who run other people’s code</span>
          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Stop malicious repos <span className="gradient-text">before they run.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Fake job tests and poisoned packages steal SSH keys, cloud credentials and crypto wallets the moment you run
            <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-200">npm install</code>.
            RepoSentry checks every repo you clone and blocks the dangerous ones first.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryDownload />
            <a href="#platform" className="btn-ghost">See how it works <ArrowRight className="h-4 w-4" /></a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            {['macOS and Windows', 'Checks in seconds', 'Your code stays on your machine'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 lg:pl-4"><Terminal /></div>
      </div>
    </section>
  );
}

/* ---------------- Threats ---------------- */

function Threats() {
  const items = [
    { icon: Briefcase, title: 'Fake job interviews', text: 'A “recruiter” sends a take-home project. Running it installs a stealer that empties wallets and grabs every saved password.' },
    { icon: PackageX, title: 'Poisoned packages', text: 'Typosquatted or hijacked npm packages hide a postinstall script that runs the second you install dependencies.' },
    { icon: FileWarning, title: 'Auto-run editor tasks', text: 'A hidden .vscode/tasks.json runs code just by opening the folder in VS Code or Cursor. No install needed.' },
  ];
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-rose-400">The problem</p>
          <h2 className="h2 mt-3">Cloning is safe. Running isn’t.</h2>
          <p className="mt-4 text-lg text-slate-400">Attackers now target developers directly, because one laptop holds the keys to everything.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="glass p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20"><i.icon className="h-5 w-5" /></span>
              <h3 className="mt-5 font-semibold text-white">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

function HowItWorks() {
  const steps = [
    { icon: FolderLock, title: 'Clone into quarantine', text: 'Paste a link, or just git clone as usual. Hooks, submodules and symlinks stay disabled until it’s checked.' },
    { icon: Cpu, title: 'Fast local scan', text: 'A compiled Rust engine looks for install scripts, obfuscation, credential theft and auto-run files in seconds.' },
    { icon: Bot, title: 'AI verdict', text: 'Only the suspicious snippets go to AI, which explains what the code really does and how dangerous it is.' },
    { icon: BellRing, title: 'You decide', text: 'A native notification shows the verdict. Block it, delete it, or allow it once. Nothing runs without you.' },
  ];
  return (
    <section id="how" className="scroll-mt-20 py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-400">How it works</p>
          <h2 className="h2 mt-3">A checkpoint between git clone and disaster</h2>
        </div>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent md:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-night text-brand-300 shadow-lg shadow-brand-600/20">
                <s.icon className="h-5 w-5" />
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white">{i + 1}</span>
              </span>
              <h3 className="mt-5 font-semibold text-white">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-slate-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Features (bento) ---------------- */

function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-400">Features</p>
          <h2 className="h2 mt-3">Every way in, covered</h2>
          <p className="mt-4 text-lg text-slate-400">Protection that runs quietly in the background, from the first clone to the last push.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-6">
          <div className="glass relative overflow-hidden p-7 md:col-span-4">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300"><Zap className="h-5 w-5" /></span>
            <h3 className="mt-5 text-lg font-semibold text-white">Install-script gate</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Most malware fires from <code className="font-mono text-slate-300">preinstall</code> and <code className="font-mono text-slate-300">postinstall</code>. RepoSentry blocks install scripts from running until the repo is cleared.
            </p>
            <div className="mt-6 rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-xs">
              <p className="text-slate-500">$ npm install</p>
              <p className="mt-1 text-amber-300">⏸  paused: 2 packages want to run install scripts</p>
              <p className="mt-1 text-slate-400">   esbuild@0.21.5 <span className="text-emerald-400">trusted</span></p>
              <p className="text-slate-400">   color-utilz@1.0.3 <span className="text-rose-400">new package · obfuscated · blocked</span></p>
            </div>
          </div>
          <Feature className="md:col-span-2" icon={GitPullRequestArrow} title="Push guard" text="A pre-push hook stops hidden, obfuscated or curl | sh code from ever reaching your repos." />
          <Feature className="md:col-span-2" icon={KeyRound} title="Secret leak guard" text="Commits containing API keys, private keys or .env files are blocked before they leave your laptop." />
          <Feature className="md:col-span-2" icon={EyeOff} title="Decoy credentials" text="Fake keys and wallet backups are planted on your machine. If a thief uses them, you hear about it instantly." />
          <Feature className="md:col-span-2" icon={ScanSearch} title="Dependency risk" text="Flags typosquats, brand-new packages, sudden publisher changes and suspicious fresh releases." />
          <Feature className="md:col-span-2" icon={MessageSquareWarning} title="Message check" text="Paste a recruiter or client message to spot the fake-interview scam before you even clone." />
          <Feature className="md:col-span-2" icon={Network} title="Shared threat network" text="When one user finds a malicious repo, it’s blocked for everyone, before it’s even downloaded." />
          <Feature className="md:col-span-2" icon={LifeBuoy} title="“I ran something” recovery" text="Stops processes from the repo, lists new startup items and gives you a key-rotation checklist." />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, text, className = '' }: { icon: typeof Zap; title: string; text: string; className?: string }) {
  return (
    <div className={`glass p-6 transition hover:border-white/15 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-brand-300"><Icon className="h-5 w-5" /></span>
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
    </div>
  );
}

/* ---------------- Privacy ---------------- */

function Privacy() {
  const points = [
    { icon: Cpu, title: 'Scanned on your machine', text: 'The full repo never leaves your computer. Rules run locally in compiled Rust.' },
    { icon: Lock, title: 'Only flagged snippets analysed', text: 'Just the few suspicious lines are sent for an AI verdict, never your whole codebase.' },
    { icon: ShieldCheck, title: 'Nothing silently changed', text: 'RepoSentry never edits code. It blocks, explains and lets you choose.' },
  ];
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="glass grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold text-emerald-400">Privacy first</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Security software you can trust with your code</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title}>
                <p.icon className="h-5 w-5 text-emerald-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Teams ---------------- */

function Teams() {
  const alerts = [
    { who: 'Sara K.', what: 'Malicious code found', repo: 'web3-trading-bot', tone: 'rose', t: '2m' },
    { who: 'Bilal A.', what: 'Push blocked', repo: 'payments-api', tone: 'rose', t: '1h' },
    { who: 'James O.', what: 'Risky code found', repo: 'ui-kit-fork', tone: 'amber', t: '3h' },
  ];
  return (
    <section id="teams" className="scroll-mt-20 py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-brand-400">For teams</p>
          <h2 className="h2 mt-3">See every threat across your whole team</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Onboarding new developers, hiring contractors or sending take-home tests? Give your security lead one dashboard for everyone’s machines.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ['Real-time alerts', 'In the dashboard and in Slack, Teams or Discord the moment someone meets malicious code.'],
              ['Required protection', 'Choose protections that are switched on and locked on every employee’s computer.'],
              ['Coverage at a glance', 'See which computers are fully protected and which need attention.'],
              ['Transparent to employees', 'Admins see check results, never anyone’s code.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20"><Check className="h-3 w-3 text-brand-300" /></span>
                <span><span className="font-medium text-white">{t}.</span> <span className="text-slate-400">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard preview */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-900 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
              <div className="flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-brand-600" />Acme Engineering</div>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600 ring-1 ring-rose-600/20">3 new alerts</span>
            </div>
            <div className="grid grid-cols-3 gap-3 border-b border-slate-200 p-5">
              {[['Employees', '24 / 25'], ['Protected', '96%'], ['Threats, 30d', '7']].map(([l, v]) => (
                <div key={l} className="rounded-xl border border-slate-200 p-3">
                  <p className="text-[11px] text-slate-500">{l}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{v}</p>
                </div>
              ))}
            </div>
            <ul className="divide-y divide-slate-100">
              {alerts.map((a) => (
                <li key={a.repo} className="flex items-center gap-3 px-5 py-3.5">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${a.tone === 'rose' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}><ShieldCheck className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.who} <span className="font-normal text-slate-500">in</span> <span className="font-mono text-xs">{a.repo}</span></p>
                    <p className={`text-xs ${a.tone === 'rose' ? 'text-rose-600' : 'text-amber-600'}`}>{a.what}</p>
                  </div>
                  <span className="text-xs text-slate-400">{a.t}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="relative mt-3 text-center text-xs text-slate-600">Illustrative preview of the company dashboard</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

function Pricing() {
  const plans = [
    {
      name: 'Individual',
      price: '$5',
      per: '/ month',
      note: 'First month free · cancel any time',
      text: 'For developers who clone code from strangers.',
      cta: 'Start free month',
      href: SIGNUP.individual,
      features: ['Up to 2 computers', '100 AI checks a month', 'Live check on every clone', 'One-click cleanup of malicious code', 'Secret and push guards', 'Decoy credentials and recovery mode'],
    },
    {
      name: 'Team',
      price: '$1',
      per: '/ computer / month',
      note: '10 computers = $10 · first month free',
      text: 'For companies onboarding and hiring developers.',
      cta: 'Start for your team',
      href: SIGNUP.team,
      highlight: true,
      features: ['Everything in Individual', '50 AI checks per computer, shared by the team', 'Company dashboard and billing', 'Alerts, including cleanups', 'Slack, Teams and Discord', 'Required protection policies'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      per: '',
      note: '500+ computers',
      text: 'For large teams with security and compliance needs.',
      cta: 'Contact sales',
      href: `mailto:${CONTACT_EMAIL}?subject=RepoSentry%20Enterprise`,
      features: ['Everything in Team', 'Volume pricing', 'Onboarding support', 'Priority threat review', 'Invoice billing'],
    },
  ];
  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-400">Pricing</p>
          <h2 className="h2 mt-3">Cheaper than one stolen key</h2>
          <p className="mt-4 text-lg text-slate-400">Simple plans. Cancel any time.</p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl p-7 ${p.highlight ? 'border border-brand-400/40 bg-gradient-to-b from-brand-600/20 to-white/[0.02] shadow-2xl shadow-brand-600/20' : 'glass'}`}>
              {p.highlight && <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
              <h3 className="text-lg font-semibold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{p.text}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight text-white">{p.price}</span>
                <span className="text-sm text-slate-400">{p.per}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">{p.note}</p>
              <a href={p.href} className={`mt-7 ${p.highlight ? 'btn-primary' : 'btn-ghost'}`}>{p.cta}</a>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2.5 text-slate-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  const qs = [
    ['Does RepoSentry upload my code?', 'No. Repos are scanned on your computer. Only the few lines that look suspicious are sent for an AI verdict, never the whole project.'],
    ['Will it slow down git or npm?', 'Local checks take a few seconds and run in the background. You only see RepoSentry when something looks dangerous.'],
    ['Does it change or delete my code?', 'Never on its own. It blocks and explains. If you choose “Clean up”, it removes only the malicious parts, backs up every file first, and scans again.'],
    ['What happens when AI checks run out?', 'You stay protected. Repos are still checked with local rules and the threat network; only the AI explanation pauses until next month. Teams can add computers any time.'],
    ['What do I need to install?', 'Just the app. On Windows, Git must be installed (git-scm.com). Windows 10/11 already includes everything else.'],
    ['How do I sign in after buying?', 'Create your account (Google or email), start your free month, then download the app and choose “Sign in with browser”. Protection turns on automatically.'],
    ['Can my company see my code?', 'No. On team plans, admins see check results and alerts, never the contents of your repositories.'],
  ];
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-sm font-semibold text-brand-400">FAQ</p>
          <h2 className="h2 mt-3">Questions, answered</h2>
          <p className="mt-4 text-slate-400">Something else? <a className="text-white underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>Email us</a>.</p>
        </div>
        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {qs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                {q}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pr-10 text-sm leading-relaxed text-slate-400">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA / download ---------------- */

function FinalCta() {
  return (
    <section id="download" className="relative scroll-mt-20 py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.25),transparent_70%)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2 sm:text-5xl">Clone anything. <span className="gradient-text">Run nothing bad.</span></h2>
          <p className="mt-5 text-lg text-slate-400">Download RepoSentry and sign in with the account from your purchase email.</p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl"><DownloadPanel /></div>
      </div>
    </section>
  );
}
