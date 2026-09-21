# Cover photos

Drop images here and reference them as `/covers/<filename>`.

**Use square images.** They're cropped to a square with `object-cover`, so
anything off-square gets trimmed from the edges. Around 800×800 is plenty;
1000×1000 if you want it crisp on a big display.

Where to point them:

| What | File | Field |
| --- | --- | --- |
| A project or job cover | `src/content/tracks.ts` | `image: "/covers/waresport.jpg"` |
| An album cover | `src/content/albums.ts` | 8th argument to `album(...)` |
| A playlist cover | `src/content/albums.ts` | `image` on the playlist object |
| Your headshot | `src/content/profile.ts` | `photo: "/covers/abhijay.jpg"` |

Anything without an image falls back to the generated gradient cover, so you
can add them one at a time.

Supported: `.jpg`, `.png`, `.webp`, `.avif`. Prefer `.webp` for size.
