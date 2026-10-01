# SiteGround Node.js Deployment, Legacy on Lark

This app is a **standard Next.js Node.js server** application.

- Build artifact: `.next/` (generated, not committed)
- Process: `npm start` → `next start`
- **Not** a static export (`out/` is not used)
- **Not** Vercel-specific

## Prerequisites

- GitHub repo: https://github.com/herbosexton/LOL-Website.git
- Branch: `main`
- SiteGround plan with **Node.js Projects**
- Existing WordPress site remains untouched until cutover

## One-time SiteGround setup

1. Push this repository to GitHub (`main`).
2. In SiteGround: **Client Area → Websites → Node.js Projects → New Project**
3. Select **Import Git Repository**
4. Connect GitHub if prompted
5. Select repository: `herbosexton/LOL-Website`
6. Select branch: `main`
7. Allow SiteGround to detect the **Next.js** framework preset when available
8. Set Node.js to the latest supported **LTS** (prefer 22 or 24; must be ≥ 20.9)
9. Package manager: **npm**
10. Build command: **`npm run build`**  
    (internally runs `next build --webpack` for reliable Node hosting / `next/font` compatibility)
11. Start / application command: **`npm start`** (or SiteGround’s Next.js equivalent that runs `next start`)
12. **Output directory:** leave empty / default for Node.js apps  
    Do **not** set `out` or `.next` as a static web root. SiteGround should run the Node process, not serve a static folder only.
13. Add environment variables under  
    **Site Tools → Node.js → Deployment Options → Environment Variables**

### Required / recommended env vars

```
NEXT_PUBLIC_SITE_URL=https://your-temporary-or-production-domain
NEXT_PUBLIC_MENU_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
CAREERS_TO_EMAIL=careers@loldispensary.com
```

Never place production secrets in GitHub.

14. Deploy first on SiteGround’s **temporary Node.js project domain**
15. Test the full site (age gate, menu links, contact form, news, mobile nav)
16. Only after approval, assign the production domain to the Node.js project  
    **Do not delete WordPress before approval**

## Auto-deploy workflow

```
Edit in Cursor
→ commit
→ push to GitHub (main)
→ SiteGround detects the push
→ SiteGround rebuilds / redeploys
→ check SiteGround deployment logs if the build fails
```

No duplicate CI deploy pipeline is required for SiteGround’s Git integration.

## Port binding

Do not hardcode ports. Next.js respects `PORT` when provided by SiteGround.

## Contact form on temporary domains

Temporary SiteGround domains may not have domain-based email. Configure SMTP that works independently (transactional provider or a mailbox that allows SMTP auth). If SMTP env vars are missing, the API returns a safe error and logs a server-side configuration message, secrets are never exposed to the browser.

## Rollback / WordPress coexistence

Keep WordPress live on the production domain until the Node site is validated. Cut DNS/domain assignment only after sign-off.
