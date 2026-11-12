import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FreeScan } from '@/components/FreeScan';

export const metadata: Metadata = {
  title: 'Free GitHub malware check | RepoSentry',
  description: 'Check any GitHub account for the worm that hides in repos: a hidden "init" loader, "node init" npm scripts, VS Code auto-run tasks and code pushed off-screen. Free, no sign-up.',
};

export default function ScanPage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden pb-24 pt-36">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-rose-600/15 blur-[120px]" />
        <div className="container-x relative"><FreeScan /></div>
      </main>
      <Footer />
    </>
  );
}
