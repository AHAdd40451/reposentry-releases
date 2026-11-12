'use client';
import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight, Check, ExternalLink, Github, Loader2, Search, ShieldCheck } from 'lucide-react';
import { API_URL, SIGNUP } from '@/lib/config';

type Result = {
  user: { login: string; avatar: string; name: string | null };
  scanned: number;
  total: number;
  infected: { repo: string; url: string; pushedAt: string; signs: { rule: string; file: string; line?: number }[] }[];
};

// Plain words for each sign the scanner can find.
const PLAIN: [RegExp, string][] = [
  [/New "init" file/, 'A hidden loader file called "init"'],
  [/npm script runs a hidden file/, '"npm run dev" secretly runs the loader first'],
  [/runs by itself when the folder/, 'VS Code runs it automatically when the folder is opened'],
  [/Script hidden in the \.vscode/, 'A script hidden in the .vscode folder'],
  [/hidden far to the right/, 'Code hidden far off-screen at the end of a normal line'],
  [/repo secrets/, 'A workflow that steals the repo\'s secrets'],
  [/bare IP|exfil/, 'Sends data to an unknown server'],
];
const plain = (rule: string) => PLAIN.find(([re]) => re.test(rule))?.[1] ?? rule;

const STEPS = [
  ['Don\'t run these repos', 'No npm install, npm run dev, or opening them in VS Code until they\'re cleaned.'],
  ['Check your own computer', 'If you ran one, the worm may have your GitHub token. Revoke tokens at github.com/settings/tokens and scan your machine.'],
  ['Clean and lock your repos', 'RepoSentry finds every infected push, undoes it in one click, and alerts you the moment it comes back.'],
];

export function FreeScan() {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  // Shareable link: /scan?u=username runs the check straight away.
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get('u');
    if (u) { setName(u); run(u); }
  }, []);

  async function run(raw: string) {
    const username = raw.trim().replace(/^@/, '').replace(/^https?:\/\/github\.com\//, '').split('/')[0];
    if (!username) return;
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/public/github-scan`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) });
      const body = await res.json();
      if (!res.ok) throw new Error(Array.isArray(body.message) ? body.message[0] : body.message || 'Something went wrong. Try again.');
      setResult(body);
      window.history.replaceState(null, '', `/scan?u=${encodeURIComponent(username)}`);
    } catch (e) {
      setError(res429(e as Error));
    } finally {
      setBusy(false);
    }
  }
  const res429 = (e: Error) => (/429|Too Many/i.test(e.message) ? 'Too many checks from your network. Wait a minute and try again.' : e.message);

  const bad = result?.infected.length ?? 0;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="eyebrow"><ShieldCheck className="h-3.5 w-3.5" />Free · no sign-up</span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Is your GitHub <span className="gradient-text">infected?</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          A worm is spreading through developers&apos; repos. It hides a loader that runs when someone types <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-200">npm run dev</code> or opens the folder in VS Code, then pushes itself into more repos. Check any account in seconds.
        </p>
      </div>

      <form className="glass mx-auto mt-10 flex max-w-xl items-center gap-2 p-2" onSubmit={(e) => { e.preventDefault(); run(name); }}>
        <Github className="ml-3 h-5 w-5 shrink-0 text-slate-500" />
        <input
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-white placeholder:text-slate-500 focus:outline-none"
          placeholder="GitHub username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="GitHub username"
        />
        <button className="btn-primary shrink-0 px-5" disabled={busy || !name.trim()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}{busy ? 'Checking…' : 'Check'}
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-slate-500">Reads public repos only. Nothing is stored and you don&apos;t need to sign in.</p>

      {busy && <p className="mt-10 text-center text-slate-400">Reading up to 40 of the most recently updated repos. This takes 10 to 20 seconds…</p>}
      {error && <p className="mx-auto mt-8 max-w-xl rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-rose-200">{error}</p>}

      {result && (
        <div className="mt-12 space-y-6">
          <div className={`glass flex flex-wrap items-center gap-4 p-6 ${bad ? 'border-rose-500/40 bg-rose-500/[0.07]' : 'border-emerald-500/30 bg-emerald-500/[0.06]'}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.user.avatar} alt="" className="h-14 w-14 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-400">@{result.user.login}{result.user.name ? ` · ${result.user.name}` : ''}</p>
              <p className={`mt-0.5 text-2xl font-semibold ${bad ? 'text-rose-300' : 'text-emerald-300'}`}>
                {bad ? `${bad} infected repo${bad === 1 ? '' : 's'} found` : 'No infection found'}
              </p>
              <p className="mt-0.5 text-sm text-slate-400">Checked {result.scanned} of {result.total} public repos{result.total > result.scanned ? ' (the most recently updated)' : ''}.</p>
            </div>
            {bad > 0 ? <AlertTriangle className="h-10 w-10 text-rose-400" /> : <ShieldCheck className="h-10 w-10 text-emerald-400" />}
          </div>

          {bad > 0 && (
            <>
              <ul className="space-y-3">
                {result.infected.map((r) => (
                  <li key={r.repo} className="glass p-5">
                    <div className="flex items-center gap-3">
                      <p className="min-w-0 flex-1 truncate font-mono font-medium text-white">{r.repo}</p>
                      <a href={r.url} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1 text-sm text-slate-400 hover:text-white">Open <ExternalLink className="h-3.5 w-3.5" /></a>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {[...new Map(r.signs.map((s) => [plain(s.rule), s])).entries()].map(([text, s]) => (
                        <li key={text} className="flex gap-2 text-sm">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                          <span className="text-slate-300">{text}<span className="ml-2 font-mono text-xs text-slate-500">{s.file}{s.line ? `:${s.line}` : ''}</span></span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="glass p-6">
                <p className="text-lg font-semibold text-white">What to do now</p>
                <ol className="mt-4 space-y-4">
                  {STEPS.map(([t, d], i) => (
                    <li key={t} className="flex gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500/20 text-sm font-semibold text-brand-300">{i + 1}</span>
                      <div><p className="font-medium text-white">{t}</p><p className="mt-0.5 text-sm text-slate-400">{d}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          <div className="glass flex flex-wrap items-center gap-5 border-brand-500/30 bg-brand-500/[0.06] p-6">
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-white">{bad ? 'Clean it up and stop it coming back' : 'Keep it that way'}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                {['Alerts within 2 minutes when malware, a force-push or a new collaborator lands on your GitHub', 'Undo a bad push and remove the account that did it, in one click', 'Blocks infected repos on your computer before npm install runs'].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{t}</li>
                ))}
              </ul>
            </div>
            <a href={SIGNUP.individual} className="btn-primary">Start free for 7 days <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      )}
    </div>
  );
}
