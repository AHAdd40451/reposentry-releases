// Edit these in one place.

/** Public GitHub repo whose Releases hold the installers (this repo). */
export const RELEASES_REPO = 'AHAdd40451/reposentry-releases';

/** Company admin dashboard. Update after deploying it. */
export const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://admin.reposentry.coderivals.ltd';

/** Sign-up links: a free month, then Stripe billing, all handled in the dashboard. */
export const SIGNUP = {
  individual: `${DASHBOARD_URL}/signup?plan=individual`,
  team: `${DASHBOARD_URL}/signup?plan=team`,
};

/** Where "Contact sales" goes. */
export const CONTACT_EMAIL = 'reposentry@coderivals.ltd';
