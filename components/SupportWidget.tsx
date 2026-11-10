'use client';
// Shared by the website and the dashboard (keep both copies identical).
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';

type Msg = { id: string; sender: 'user' | 'staff' | 'system'; body: string; createdAt: string };
type Thread = { id: string; name: string; status: 'OPEN' | 'CLOSED'; staffJoinedAt: string | null; staffName: string | null; messages: Msg[] };

const time = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

/**
 * Floating support chat. Messages reach RepoSentry staff instantly; when someone joins,
 * the customer sees it here (and gets an email if they've left).
 */
export function SupportWidget({ api, storageKey, authToken, signedInAs, dark }: {
  api: string;
  storageKey: string;
  /** Dashboard: the session, so staff see the account. Website: undefined. */
  authToken?: string | null;
  signedInAs?: { name: string; email: string } | null;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(0);
  const [toast, setToast] = useState('');
  const seen = useRef(0);
  const prevThread = useRef<Thread | null>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setToken(localStorage.getItem(storageKey)); } catch { /* private mode */ }
    if (new URLSearchParams(window.location.search).get('support') === 'open') setOpen(true);
  }, [storageKey]);

  const load = useCallback(async () => {
    if (!token) return;
    const r = await fetch(`${api}/support/threads/${token}`).catch(() => null);
    if (!r) return;
    if (r.status === 404) {
      try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
      setToken(null);
      setThread(null);
      return;
    }
    const { thread: t } = (await r.json()) as { thread: Thread };
    const prev = prevThread.current;
    if (prev && t.messages.length > prev.messages.length) {
      const last = t.messages[t.messages.length - 1];
      if (last.sender !== 'user') {
        if (!open) setUnread((u) => u + 1);
        if (last.sender === 'system' && /joined/.test(last.body)) setToast(last.body);
      }
    }
    prevThread.current = t;
    setThread(t);
  }, [api, token, storageKey, open]);

  // Fast while the chat is open, slower in the background (so the badge still lights up).
  useEffect(() => {
    if (!token) return;
    load();
    const id = setInterval(load, open ? 3000 : 15000);
    return () => clearInterval(id);
  }, [token, open, load]);

  useEffect(() => {
    if (open) setUnread(0);
    if (open && thread && thread.messages.length !== seen.current) {
      seen.current = thread.messages.length;
      setTimeout(() => end.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [open, thread]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 6000);
    return () => clearTimeout(id);
  }, [toast]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    setBusy(true);
    setError('');
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) };
      const res = token
        ? await fetch(`${api}/support/threads/${token}/messages`, { method: 'POST', headers, body: JSON.stringify({ body }) })
        : await fetch(`${api}/support/threads`, { method: 'POST', headers, body: JSON.stringify({ name, email, message: body, source: 'website' }) });
      const data = await res.json();
      if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message[0] : data.message ?? 'Couldn’t send');
      if (data.token) {
        try { localStorage.setItem(storageKey, data.token); } catch { /* ignore */ }
        setToken(data.token);
      }
      prevThread.current = data.thread;
      setThread(data.thread);
      setText('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const needsContact = !token && !signedInAs;
  const panel = dark ? 'border-white/10 bg-[#0D1224] text-slate-200' : 'border-slate-200 bg-white text-slate-900';
  const sub = dark ? 'text-slate-400' : 'text-slate-500';
  const field = dark
    ? 'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none'
    : 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none';
  const joined = thread?.staffJoinedAt;

  return (
    <>
      {open && (
        <div role="dialog" aria-label="Support chat" className={`fixed bottom-24 right-4 z-[60] flex h-[min(560px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl ${panel}`}>
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-3.5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15"><ShieldCheck className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">RepoSentry support</p>
              <p className="flex items-center gap-1.5 text-xs text-white/80">
                <span className={`h-1.5 w-1.5 rounded-full ${joined ? 'bg-emerald-300' : 'bg-white/60'}`} />
                {joined ? `${thread?.staffName ?? 'Support'} is here` : 'We usually reply in a few minutes'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-md p-1.5 hover:bg-white/15" aria-label="Close chat"><X className="h-4 w-4" /></button>
          </div>

          {toast && <div className="mx-3 mt-3 rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-medium text-emerald-500" role="status">{toast}</div>}

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {!thread && (
              <div className={`rounded-xl px-3.5 py-3 text-sm ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                <p className="font-medium">Hi{signedInAs ? ` ${signedInAs.name.split(' ')[0]}` : ''}! 👋</p>
                <p className={`mt-1 ${sub}`}>Questions about setup, billing or a repo RepoSentry flagged? Write to us. A real person answers.</p>
              </div>
            )}
            {thread?.messages.map((m) =>
              m.sender === 'system' ? (
                <p key={m.id} className={`text-center text-xs ${sub}`}>{m.body}</p>
              ) : (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.sender === 'user' ? 'rounded-br-md bg-brand-600 text-white' : dark ? 'rounded-bl-md bg-white/10 text-slate-100' : 'rounded-bl-md bg-slate-100 text-slate-900'
                  }`}>
                    <p className="whitespace-pre-wrap break-words">{m.body}</p>
                    <p className={`mt-0.5 text-[10px] ${m.sender === 'user' ? 'text-white/70' : sub}`}>{m.sender === 'staff' ? `${thread.staffName ?? 'Support'} · ` : ''}{time(m.createdAt)}</p>
                  </div>
                </div>
              ),
            )}
            {thread && !joined && <p className={`text-center text-xs ${sub}`}>Message sent. You’ll see it here when someone joins, and we’ll email you too.</p>}
            <div ref={end} />
          </div>

          <form onSubmit={send} className={`space-y-2 border-t px-3 py-3 ${dark ? 'border-white/10' : 'border-slate-200'}`}>
            {needsContact && (
              <div className="grid grid-cols-2 gap-2">
                <input className={field} placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
                <input className={field} placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
              </div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                className={`${field} max-h-28 min-h-[40px] resize-none`}
                rows={1}
                placeholder="Write a message…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement).requestSubmit(); } }}
                aria-label="Message"
              />
              <button className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-600 text-white hover:bg-brand-500 disabled:opacity-50" disabled={busy || !text.trim()} aria-label="Send">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-rose-500" role="alert">{error}</p>}
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-xl shadow-brand-600/30 transition hover:scale-105"
        aria-label={open ? 'Close support chat' : 'Open support chat'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold ring-2 ring-white">{unread}</span>
        )}
      </button>
    </>
  );
}
