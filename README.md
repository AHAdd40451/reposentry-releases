# RepoSentry: website and downloads

This public repo holds:

- **Releases**: the macOS (`.dmg`) and Windows (`.msi`, `-setup.exe`) installers. They're built and published automatically from the private source repo by GitHub Actions. Download the latest from the [Releases page](../../releases/latest).
- **Website**: the landing page and `/download` page (Next.js, static export). The download buttons always point at the latest release.

## Run the website locally

```bash
npm install
npm run dev        # http://localhost:3005
```

## Deploy

Import this repo on [Vercel](https://vercel.com/new). No settings are needed. `npm run build` writes a static site to `out/`, so it also works on Netlify, Cloudflare Pages or any static host.

## Configure

Edit [`lib/config.ts`](lib/config.ts):

- `DASHBOARD_URL` is the company dashboard address.
- `CHECKOUT` holds the Stripe Payment Links for the buy buttons.
- `CONTACT_EMAIL` is where "Contact sales" goes.
