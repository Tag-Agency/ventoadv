# Vento — Next.js + WordPress (Headless)

This project is wired to consume content from a WordPress site via the REST API.

## Configure WordPress API

Create a `.env.local` in the project root:

```
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
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

## Deploy

- For Vercel deployments, set `NEXT_PUBLIC_WP_API_URL` in the project Settings → Environment Variables.
