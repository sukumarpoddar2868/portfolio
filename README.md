# Sukumar Poddar: Portfolio

Next.js 16 site, deployed on Vercel.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm run lint && pnpm run build
```

## Editing content
All text (hero, experience, projects, skills, links) is in `src/content.ts`.

## Photo
`public/hero.webp` is the processed photo: background removed, warm grade, 1400×1871. To replace it, use a transparent portrait at least 1400 px wide, then update `photo`, `photoWidth` and `photoHeight` in `src/content.ts`.

## Background music
The player pill (top right) plays the 7-track jazz playlist in `public/music/` (Jazz Lounge first). The track list is in `MusicPlayer` in `src/components/client.tsx`.

How it behaves:
- Browsers block autoplay, so it starts on the visitor's first click or key press and fades in to a low volume.
- Space toggles play and pause.
- Next skips to the next track.

The tracks are under the Pixabay Content License, which allows free commercial use with no attribution needed; they are credited in the pill anyway.

## Project images
The covers in `public/projects/` are free Unsplash photos (Unsplash License), 900×600 WebP. Cards show them in grayscale and turn to colour on hover. To use a real screenshot instead, replace the file and keep the same name.

## Deploy
Push to GitHub, import the repo in Vercel, and keep the default settings (framework: Next.js).
# portfolio
