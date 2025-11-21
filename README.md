# Vento — Next.js + WordPress (Headless)

This project is wired to consume content from a WordPress site via the REST API.

## Configure WordPress API

Create a `.env.local` in the project root (or use the provided `.env.example` as a template):

```
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
# Optional: force no-store for all WordPress fetches (useful while debugging cache on Vercel)
NEXT_PUBLIC_NO_STORE=0
```

- Ensure WordPress exposes the REST API and public posts.
- Featured images are fetched via `_embed`.

## Data Layer

- `src/lib/wp.js`
  - `getPosts({ page, perPage, search, category })`
  - `getCategories()`
  - `getPostById(id)`

These helpers use `fetch` with `revalidate: 60` by default.

## Pages

- `src/app/blog/page.jsx` (Server Component): fetches posts + categories from WordPress and renders the UI via `BlogClient`.
- `src/components/BlogClient.jsx` (Client Component): renders filters (search + category buttons) and the post grid.
- `src/app/blog/[id]/page.jsx` (Server Component): renders a single post by WordPress ID.

## Notes

- If `NEXT_PUBLIC_WP_API_URL` is not set, the blog page falls back to a placeholder post.
- Dates are formatted using Italian locale (`it-IT`) to avoid hydration issues.

## Verifica integrazione WordPress

- Esegui `npm run wp:check` per verificare dal terminale la raggiungibilità dell'endpoint configurato (usa `.env.local` o il fallback `https://wp.ventoadv.it/wp-json/wp/v2`).
- Con l'app in esecuzione puoi interrogare `/api/wp-health` per ottenere uno stato JSON con endpoint target, latenza e un post di esempio.

## Deploy on Vercel

1) In Vercel → Project → Settings → Environment Variables, set:
  - `NEXT_PUBLIC_WP_API_URL` = your WP endpoint (e.g. `https://work.tagagency.it/ventoadv/wp-json/wp/v2`)
  - (optional) `NEXT_PUBLIC_NO_STORE` = `1` to bypass cache during debugging

2) Redeploy the project. If vedi ancora la versione cache, puoi:
  - Forzare un nuovo deploy (commit vuoto)
  - Impostare temporaneamente `NEXT_PUBLIC_NO_STORE=1`

### ACF media note
Se un campo ACF immagine restituisce un ID numerico (media ID) e l'endpoint `/wp-json/wp/v2/media/{id}` è protetto (401), imposta il campo ACF con Return Format = `Image URL` (o `Image Array` con proprietà `.url`). Il codice usa direttamente URL/oggetti senza chiamare l'endpoint media.
