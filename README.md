# vivekg7.github.io

My portfolio and project showcase, live at <https://vivekg7.github.io>.

Built with [Astro](https://astro.build) as a fully static site. Every push to
`main` is built and published by `.github/workflows/deploy.yml`, with Pages
set to deploy from GitHub Actions rather than from a branch.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run format    # prettier, including .astro files
```

Node 26, the version in `.nvmrc`. The deploy workflow reads the same file, so
CI always builds with the version used locally.

## Adding a project

Each project is one Markdown file in `src/content/projects/`. The schema in
`src/content.config.ts` lists every field; the short version:

- `tier: featured` gets a large card on the home page; `tier: more` gets a
  one-line row linking to the repository. `order` sorts within a tier.
- `page: true` gives a featured project its own page at `/projects/<file>/`,
  with the Markdown body as the write-up. Without it the card links to GitHub,
  so a project can be listed before its write-up exists.
- `facts` are short, checkable numbers ("97 KB", "0 permissions"). The first
  one doubles as the card's artwork when there is no `cover`.
- `cover` is a wide image (Play Store feature graphics are 1024 × 500);
  `screenshots` are phone screenshots, shown as a scrolling strip.

Images live in `src/assets/projects/<project>/` and are referenced relative to
the Markdown file. Astro resizes them and converts them to WebP at build time,
so commit the originals.

Write-ups describe what the project is, why it exists and the decisions behind
it, taken from the project's own README and design docs. Keep claims checkable
against the repository: sizes, counts and platforms go stale, so re-check them
when a project ships a new version.

## Stories

`/stories/` lists every film on the
[Kahani ki Potli](https://www.youtube.com/@KahaniKiPotli7) channel, which is
made with talekit. Each film is one JSON file in `src/content/stories/`, with
its cover in `src/assets/stories/`. After a new film goes up:

```sh
npm run stories   # needs yt-dlp
```

For each film on the channel without a file, this drafts one from the video's
title, description and chapters and downloads its thumbnail. It also fills in
the reel once the matching Short is up. Read every new draft before
committing it: the descriptions aren't all laid out alike, so the script reads
them by script (Devanagari or Latin) and prints any field it couldn't find.
Existing files are never redrafted, so fixes made by hand stay. The
collections the filters offer are listed in `src/data/collections.ts`; a film
from a new one needs an entry there first.

The film plays from `youtube-nocookie.com`, and only once the cover is
clicked, so a story page loads no YouTube code until then.

## The old site

Until 2020 this repo held a create-react-app build that registered a service
worker at `/service-worker.js`. `public/service-worker.js` replaces it with
one that clears its caches and unregisters itself, so returning visitors are
not stuck on the cached old page. It can be deleted once old visitors have
had time to come back, a few months after launch.
