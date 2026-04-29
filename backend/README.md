# Lens & Lore — Backend

Express + TypeScript API server powering lookbooks and Stripe webhooks.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check — lists any missing env keys |
| `GET` | `/api/lookbooks/public` | List public lookbooks (Supabase) |
| `POST` | `/api/lookbooks` | Create a lookbook (Supabase) |
| `POST` | `/api/webhooks/stripe` | Stripe checkout webhook handler |

## Local Development

```bash
cd backend
cp .env.example .env          # fill in your secrets
npm install
npm run dev                   # tsx watch — hot reload on :4000
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No (default 4000) | HTTP port |
| `APP_ORIGIN` | Yes | Frontend URL for CORS (e.g. `https://lens-and-lore.vercel.app`) |
| `SUPABASE_URL` | For DB features | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | For DB features | Supabase service-role key (never expose publicly) |
| `STRIPE_SECRET_KEY` | For payments | Stripe secret key (`sk_live_…` or `sk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe webhook signing secret (`whsec_…`) |
| `SANITY_PROJECT_ID` | Optional | Sanity project ID |
| `SANITY_DATASET` | Optional | Sanity dataset name |

---

## Deploy to Railway

### 1. Push your code

Make sure your latest code is pushed to GitHub.

```bash
git add .
git commit -m "chore: add Railway deployment config"
git push
```

### 2. Create a Railway project

1. Go to **[railway.app](https://railway.app)** → **New Project**
2. Choose **"Deploy from GitHub repo"**
3. Select the `lens-and-lore` repository
4. When prompted for the **Root Directory**, set it to: `backend`
5. Railway will detect the `Dockerfile` automatically

### 3. Set environment variables

In Railway → your service → **Variables**, add:

```
NODE_ENV=production
APP_ORIGIN=https://your-frontend.vercel.app
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

> **CORS**: `APP_ORIGIN` must exactly match your Vercel frontend URL (no trailing slash).

### 4. Get your Railway URL

After deploy, Railway gives you a public URL like:
`https://lens-and-lore-backend-production.up.railway.app`

Verify it's alive:
```
GET https://your-railway-url.up.railway.app/api/health
```

### 5. Update the frontend

In your Vercel project → **Settings → Environment Variables**, add:

```
NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app
```

Then redeploy the frontend.

### 6. Configure Stripe webhook

In the Stripe Dashboard → **Webhooks → Add endpoint**:

- **URL**: `https://your-railway-url.up.railway.app/api/webhooks/stripe`
- **Events**: `checkout.session.completed`, `checkout.session.async_payment_succeeded`

Copy the generated **Signing secret** (`whsec_…`) and add it as `STRIPE_WEBHOOK_SECRET` in Railway.

---

## Build & Start (manual)

```bash
npm run build    # tsc → dist/
npm start        # node dist/server.js
```
