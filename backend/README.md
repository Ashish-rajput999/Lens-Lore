# LENS & LORE Backend

TypeScript backend workspace for operational services:

- Stripe webhook intake
- Supabase-backed lookbook and order workflows
- Health/status endpoints for deployment checks
- SQL migrations for the content-commerce schema and RLS

## Run

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and provide the Supabase and Stripe secrets first.
