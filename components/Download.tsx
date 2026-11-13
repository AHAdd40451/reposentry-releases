'use client';
import { useEffect, useState } from 'react';
import { Apple, Download as DownloadIcon, ExternalLink, Monitor } from 'lucide-react';
import { RELEASES_REPO } from '@/lib/config';

type Asset = { name: string; browser_download_url: string; size: number };
type Release = { tag_name: string; published_at: string; html_url: string; assets: Asset[] };
type OS = 'mac' | 'windows' | 'other';

const RELEASES_PAGE = `https://github.com/${RELEASES_REPO}/releases/latest`;

function detectOS(): OS {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) return 'mac';
  if (/Win/i.test(ua)) return 'windows';
  return 'other';
}

const mb = (b: number) => `${(b / 1_048_576).toFixed(0)} MB`;

export function useLatestRelease() {
  const [release, setRelease] = useState<Release | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    fetch(`https://api.github.com/repos/${RELEASES_REPO}/releases/latest`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setRelease)
      .catch(() => setFailed(true));
  }, []);
  const find = (re: RegExp) => release?.assets.find((a) => re.test(a.name));
  return {
    release,
    failed,
    mac: find(/\.dmg$/i),
    msi: find(/\.msi$/i),
    exe: find(/-setup\.exe$/i),
  };
}

/** Big OS-aware button for the hero. */
export function PrimaryDownload() {
  const [os, setOs] = useState<OS>('other');
  const { exe, msi } = useLatestRelease();
  useEffect(() => setOs(detectOS()), []);

  // macOS builds are paused until signing with Apple is ready: Mac visitors go to the download page.
  const asset = os === 'windows' ? exe ?? msi : undefined;
  const label = os === 'windows' ? 'Download for Windows' : 'Download RepoSentry';
  const Icon = os === 'windows' ? Monitor : DownloadIcon;

  return (
    <a href={asset?.browser_download_url ?? '#download'} className="btn-primary">
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

/** Full download panel with both platforms. */
export function DownloadPanel() {
  const { release, failed, msi, exe } = useLatestRelease();
  const [os, setOs] = useState<OS>('other');
  useEffect(() => setOs(detectOS()), []);

  const cards = [
    {
      id: 'mac' as const,
      icon: Apple,
      title: 'macOS',
      note: 'macOS 11 or later · Apple Silicon and Intel',
      main: null,
      soon: true,
      alt: null,
    },
    {
      id: 'windows' as const,
      icon: Monitor,
      title: 'Windows',
      note: 'Windows 10 or 11 · 64-bit · needs Git installed',
      main: exe && { label: 'Download installer (.exe)', a: exe },
      soon: false,
      alt: msi && { label: '.msi for IT deployment', a: msi },
    },
  ];

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c) => (
          <div key={c.id} className={`glass relative p-7 ${os === c.id ? 'ring-1 ring-brand-400/50' : ''}`}>
            {os === c.id && <span className="absolute right-5 top-5 rounded-full bg-brand-500/15 px-2.5 py-1 text-[11px] font-medium text-brand-300">Your computer</span>}
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.06] text-white"><c.icon className="h-6 w-6" /></span>
            <h3 className="mt-5 text-xl font-semibold text-white">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{c.note}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {c.soon ? (
                <span className="btn-ghost cursor-default">Coming soon</span>
              ) : c.main ? (
                <a href={c.main.a.browser_download_url} className="btn-primary"><DownloadIcon className="h-4 w-4" />{c.main.label}</a>
              ) : (
                <a href={RELEASES_PAGE} className="btn-ghost">{failed ? 'See all releases' : release ? 'Coming soon' : 'Loading…'}</a>
              )}
              {c.main && <span className="text-xs text-slate-500">{mb(c.main.a.size)}</span>}
            </div>
            {c.alt && <a href={c.alt.a.browser_download_url} className="mt-4 inline-block text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline">{c.alt.label}</a>}
          </div>
        ))}
      </div>
      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 text-center text-sm text-slate-500">
        {release ? <>Version {release.tag_name.replace(/^v/, '')} · released {new Date(release.published_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })} ·</> : null}
        <a href={RELEASES_PAGE} className="inline-flex items-center gap-1 hover:text-white">All releases <ExternalLink className="h-3.5 w-3.5" /></a>
      </p>
    </div>
  );
}
