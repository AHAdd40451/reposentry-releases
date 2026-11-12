// Edit these in one place.

/** Public GitHub repo whose Releases hold the installers (this repo). */
export const RELEASES_REPO = 'AHAdd40451/reposentry-releases';

/** Company admin dashboard. Update after deploying it. */
export const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://admin.reposentry.coderivals.ltd';

/** Sign-up links: a 7-day free trial, then Stripe billing, all handled in the dashboard. */
export const SIGNUP = {
  individual: `${DASHBOARD_URL}/signup?plan=individual`,
  team: `${DASHBOARD_URL}/signup?plan=team`,
};

/** Where "Contact sales" goes. */
export const CONTACT_EMAIL = 'reposentry@coderivals.ltd';

/** RepoSentry API (the free scanner and the support chat use it). */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.reposentry.coderivals.ltd';
