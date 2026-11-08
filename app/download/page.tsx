import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { DownloadPanel } from '@/components/Download';

export const metadata: Metadata = { title: 'Download RepoSentry' };

const STEPS = [
  ['Download', 'Pick the installer for your computer below.'],
  ['Install', 'macOS: open the .dmg and drag RepoSentry to Applications. Windows: run the installer.'],
  ['Sign in', 'Use the email and password from your purchase email. Protection turns on automatically.'],
];

export default function DownloadPage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Download RepoSentry</h1>
            <p className="mt-4 text-lg text-slate-400">Free to download. Sign in with your RepoSentry account to turn on protection.</p>
          </div>
          <div className="mx-auto mt-14 max-w-4xl"><DownloadPanel /></div>

          <ol className="mx-auto mt-20 grid max-w-4xl gap-5 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="glass p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-500/20 text-sm font-semibold text-brand-300">{i + 1}</span>
                <h2 className="mt-4 font-semibold text-white">{t}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{d}</p>
              </li>
            ))}
          </ol>

          <div className="glass mx-auto mt-6 max-w-4xl p-6 text-sm leading-relaxed text-slate-400">
            <p className="font-medium text-white">Seeing a security warning?</p>
            <p className="mt-1.5">
              Until signed builds ship: on <span className="text-slate-200">macOS</span>, right-click RepoSentry in Applications and choose Open. On{' '}
              <span className="text-slate-200">Windows</span>, click “More info” then “Run anyway”.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
