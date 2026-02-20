# Elite Tendency — Cinematic UK Rental Platform

Award-style, animation-driven web experience for UK rental services.

## Stack
- Next.js (App Router)
- Framer Motion
- Supabase JS client

## Implemented
- Custom cinematic cursor system
- Page transitions and scroll-led reveal behavior
- Premium hero section with parallax motion
- Interactive property cards
- High-polish inquiry form micro-interactions
- Single-run Supabase schema file (`supabase/elite_tendency_schema.sql`)

## Run locally
```bash
npm install
npm run dev
```
Open: `http://localhost:3000`

## Production build
```bash
npm run build
npm run start
```

## Deploy
### Vercel
1. Import this GitHub repo
2. Framework preset: Next.js
3. Add env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy

### Netlify
1. New site from Git
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add same env vars

### GitHub Pages
Use static export path if required (or keep Vercel/Netlify for full Next runtime).

## Supabase Setup
1. Open Supabase SQL Editor
2. Paste and run `supabase/elite_tendency_schema.sql`
3. Verify tables/policies in Table Editor
