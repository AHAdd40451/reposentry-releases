import { CONTACT_EMAIL, DASHBOARD_URL, RELEASES_REPO } from '@/lib/config';
import { Logo } from './Nav';

export function Footer() {
  const cols = [
    { title: 'Product', links: [['How it works', '/#how'], ['Features', '/#features'], ['Pricing', '/#pricing'], ['Download', '/download']] },
    { title: 'Teams', links: [['Company dashboard', DASHBOARD_URL], ['For hiring teams', '/#teams'], ['Contact sales', `mailto:${CONTACT_EMAIL}`]] },
    { title: 'Resources', links: [['Release notes', `https://github.com/${RELEASES_REPO}/releases`], ['FAQ', '/#faq']] },
  ];
  return (
    <footer className="border-t border-white/[0.06] py-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            Protects developer machines from malicious repositories, packages and fake job tests.
          </p>
          <p className="mt-3 text-xs text-slate-500">Built by <a href="https://www.coderivals.ltd" className="font-medium text-slate-300 hover:text-white">Code Rivals</a></p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-white">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => <li key={label}><a href={href} className="text-sm text-slate-500 hover:text-white">{label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-slate-600">
        <span>© {new Date().getFullYear()} RepoSentry. All rights reserved.</span>
        <span>
          A product of <a href="https://www.coderivals.ltd" className="font-medium text-slate-400 hover:text-white">Code Rivals</a>
          {' · '}<a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
        </span>
      </div>
    </footer>
  );
}
