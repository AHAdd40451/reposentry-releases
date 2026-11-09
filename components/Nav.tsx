'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DASHBOARD_URL } from '@/lib/config';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#teams', label: 'For teams' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
];

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="RepoSentry home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon.svg" alt="" className="h-8 w-8" />
      <span className="text-[15px] font-semibold tracking-tight text-white">RepoSentry</span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? 'border-b border-white/[0.06] bg-night/80 backdrop-blur-xl' : ''}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {LINKS.map((l) => <a key={l.href} href={l.href} className="text-sm text-slate-400 transition hover:text-white">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={DASHBOARD_URL} className="hidden px-3 text-sm text-slate-400 hover:text-white sm:block">Sign in</a>
          <a href="/download" className="btn-primary hidden px-4 py-2 sm:inline-flex">Download</a>
          <button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-5 md:hidden" aria-label="Mobile">
          {LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-white/5">{l.label}</a>)}
          <a href="/download" className="btn-primary mt-2">Download</a>
        </nav>
      )}
    </header>
  );
}
