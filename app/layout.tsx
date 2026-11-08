import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'RepoSentry: Stop malicious repos before they run',
  description:
    'RepoSentry checks every repo you clone for malware before npm install, your editor or a script can run it. Built for developers and the teams that hire them.',
  openGraph: {
    title: 'RepoSentry',
    description: 'Stop malicious repos before they run on your machine.',
    type: 'website',
  },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
