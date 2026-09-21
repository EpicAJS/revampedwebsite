# abhijaysalvi.com

Personal site built as a music player. Experience, projects, and research are
albums; each role or build is a track. Two playlists are powered by visitor
submissions: **Ask Me Anything** and **Song Recommendations**.

Live at [abhijaysalvi.com](https://abhijaysalvi.com). Deploys automatically on
every push to `main`.

## Running locally

```bash
npm install
npm run dev
```

The site works without a database — the two submission playlists just render an
empty state and the forms return a friendly "not switched on yet" message.

## Editing content

All content lives in `src/content/` as plain TypeScript. No CMS, no database.

| File | What's in it |
| --- | --- |
| `profile.ts` | Name, bio, education, skills, socials, interests |
| `tracks.ts` | Every job, project, and research role |
| `albums.ts` | How tracks group into albums, plus playlist metadata |

To add a project, append an object to `tracks` in `tracks.ts` with
`kind: "project"`. It automatically appears in the Projects album, in search,
and gets its own `/track/<id>` page. Set `featured: true` to surface it on the
home page.

The résumé PDF served at `/Abhijay_Salvi_Resume.pdf` lives in `public/`.

### Cover photos

Every cover falls back to a generated gradient, so photos are optional and can
be added one at a time. Drop a **square** image in `public/covers/`, then point
at it:

```ts
// src/content/tracks.ts
{
  id: "waresport",
  image: "/covers/waresport.jpg",   // add this line
  ...
}

// src/content/profile.ts
photo: "/covers/abhijay.jpg",       // headshot, used on the artist page

// src/content/albums.ts — 8th argument to album(...)
album("projects", "Projects", ..., ["#7c3f2c", "#2e1510"], "/covers/projects.jpg")
```

Images are served through `next/image`, so they're resized and converted to
modern formats automatically. See `public/covers/README.md` for details.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home — greeting, quick picks, shelves |
| `/album/[id]` | `experience`, `projects`, `research` |
| `/track/[id]` | Detail page for one role or build |
| `/artist` | About me |
| `/search` | Client-side search across everything |
| `/recruiter` | Clean, linkable résumé view — send this on applications |
| `/playlist/ama` | Ask Me Anything |
| `/playlist/recommendations` | Song recommendations |
| `/admin` | Moderation queue (password protected) |

## Enabling submissions

1. **Create the database.** In the Vercel dashboard for this project: Storage →
   Supabase → create a database. The Supabase integration is already installed
   on the account, and Vercel injects the connection variables automatically.
2. **Create the tables.** Open the Supabase SQL editor and run
   [`supabase/schema.sql`](supabase/schema.sql).
3. **Set environment variables** in Vercel (Settings → Environment Variables):

   | Variable | Value |
   | --- | --- |
   | `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Same page, the **service role** key |
   | `ADMIN_PASSWORD` | A long random password for `/admin` |
   | `APP_SECRET` | `openssl rand -hex 32` |

4. **Redeploy.** Submissions go live, and `/admin` becomes usable.

See `.env.example` for the local equivalent.

## Security model

Visitors can write to this site, so the submission path is deliberately narrow.

- **Nothing user-submitted is ever public until approved.** Every submission
  lands as `pending` and only appears after being published from `/admin`.
- **The service role key never reaches the browser.** The Supabase client is
  behind `server-only`, so importing it into a client component fails the build
  rather than leaking the key. No `NEXT_PUBLIC_` variable holds a secret.
- **Row Level Security is on for every table with no policies defined.** The
  anon key can't read or write anything. Only the server, using the service
  role, can touch the data. This is defense in depth — if the public key ever
  leaked, the tables stay sealed.
- **Rate limited per IP**, 5 submissions per hour, enforced in the database. The
  raw IP is never stored: it's HMAC-hashed with `APP_SECRET` first. The check
  fails closed — if it can't verify, the write is rejected.
- **Input is validated with zod** on length and type before it reaches the
  database, with matching `CHECK` constraints in Postgres.
- **Bot submissions hit a honeypot field** and are silently accepted without
  being stored, so scrapers don't learn what tripped them.
- **Admin sessions are HMAC-signed** with an expiry, stored in an `httpOnly`,
  `secure`, `SameSite=Strict` cookie. The password is compared in constant time.
  Every mutation re-verifies the session server-side — the UI hiding a button is
  never the thing keeping you out.
- **User input is never rendered as HTML.** React escapes it; nothing goes
  through `dangerouslySetInnerHTML`.
- **Database errors are never returned to the client**, only generic messages.
- Security headers (`X-Frame-Options`, `nosniff`, HSTS, `Referrer-Policy`) are
  set in `next.config.ts`, and `/admin` is `noindex`.

## Other branches

Earlier design directions are kept on branches: `theme/blockblast-v2`
(puzzle-game theme) and `theme/porsche` (motorsport theme).
