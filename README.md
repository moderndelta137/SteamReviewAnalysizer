# Steam Review Analysizer

SteamScout-style Steam review explorer with:

- app details lookup
- language review breakdown
- purchase-type filtering
- paged review browser
- CSV export
- playtime bucket aggregation

## Cloudflare deployment

This project is now structured for **Cloudflare Workers + static assets**. The frontend and backend deploy together on one Cloudflare app, so you do not need a separate server host.

Core files:

- Worker backend: [src/worker.js](D:\Projects\SteamReviewAnalysizer\src\worker.js)
- Worker config: [wrangler.toml](D:\Projects\SteamReviewAnalysizer\wrangler.toml)
- Frontend assets: [public](D:\Projects\SteamReviewAnalysizer\public)

## Local development

```powershell
npm install
npm run dev
```

That starts `wrangler dev`, which serves both the static site and the `/api/*` proxy routes locally.

## Deploy to Cloudflare

1. Create a Cloudflare account
2. Install Wrangler if you want to deploy from your machine:

```powershell
npm install
```

3. Authenticate:

```powershell
npx wrangler login
```

4. Deploy:

```powershell
npm run deploy
```

Cloudflare will give you a `*.workers.dev` URL. Later you can attach a custom domain if you want.
